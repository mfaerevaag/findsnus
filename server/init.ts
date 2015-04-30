Meteor.startup(() => {
    reCAPTCHA.config({
        privatekey: '6LeGLQYTAAAAAEvhDupt4zs9yRWANqv4ZP3fnpQ_'
    });

    Shops.remove({});

    var shops = JSON.parse(Assets.getText('data.json'));

    _.each(shops, (shop) => {
        Shops.insert({
            name: shop['name'],
            lat: parseFloat(shop['lat']),
            lng: parseFloat(shop['lng']),
            price: parseInt(shop['price']),
            selection: shop['selection'],
            verified: true
        });
    });
});
