Meteor.startup(function () {
    Shops.remove({});

    var shops = JSON.parse(Assets.getText('data.json'));

    _.each(shops, (shop) => {
        Shops.insert({
            name: shop['name'],
            lat: shop['lat'],
            lng: shop['lng']
        });
    });
});
