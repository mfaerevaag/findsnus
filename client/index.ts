declare var gmap: google.maps.Map;

Template['map'].rendered = function() {
    GAnalytics.pageview();
    this.subscribe('shops');

    gmap = new google.maps.Map($('#map-canvas')[0]);

    var openInfoWindow = null;

    this.autorun(function() {

        var bounds = new google.maps.LatLngBounds();

        Shops.find().forEach((shop) => {

            var marker = new google.maps.Marker({
                title: shop.name,
                position: new google.maps.LatLng(shop.lat, shop.lng),
                map: gmap
            });

            bounds.extend(marker.getPosition());

            var infowindow = new google.maps.InfoWindow({
                content: Blaze.toHTMLWithData(Template['info'], {
                    name: shop.name,
                    price: shop.price,
                    selection: shop.selection
                })
            });


            google.maps.event.addListener(marker, 'click', function() {
                if (openInfoWindow)
                    openInfoWindow.close();

                infowindow.open(gmap, marker);

                openInfoWindow = infowindow;
            });
        });

        gmap.fitBounds(bounds);
    });
};
