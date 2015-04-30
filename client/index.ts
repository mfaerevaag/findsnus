Template['map'].rendered = function() {
    this.subscribe('shops');

    var map = new google.maps.Map($('#map-canvas')[0], {
        center: new google.maps.LatLng(55.6778724, 12.5623695),
        zoom: 14
    });

    this.autorun(function() {
        Shops.find().forEach((shop) => {

            var marker = new google.maps.Marker({
                title: shop.name,
                position: new google.maps.LatLng(shop.lat, shop.lng),
            });

            marker.setMap(map);

            var infowindow = new google.maps.InfoWindow({
                content: Blaze.toHTMLWithData(Template['info'], {
                    name: shop.name,
                    price: shop.price,
                    selection: shop.selection
                })
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });
        });
    });
};
