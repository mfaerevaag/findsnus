declare var gmap: google.maps.Map;

Template['map'].rendered = function() {
    GAnalytics.pageview();
    this.subscribe('shops');

    gmap = new google.maps.Map($('#map-canvas')[0], {
        center: new google.maps.LatLng(55.6778724, 12.5623695),
        zoom: 14
    });

    var openInfoWindow = null;

    this.autorun(function() {

        Shops.find().forEach((shop) => {

            var marker = new google.maps.Marker({
                title: shop.name,
                position: new google.maps.LatLng(shop.lat, shop.lng),
            });

            marker.setMap(gmap);

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
    });
};
