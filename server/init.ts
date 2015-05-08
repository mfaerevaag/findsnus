declare var CONFIG;

Meteor.startup(() => {

    CONFIG = JSON.parse(Assets.getText('config.json'));

    reCAPTCHA.config({
        privatekey: CONFIG.recaptcha.privatekey
    });

    // Shops.remove({}); // for dev

    // parse hardcoded
    // var shops = JSON.parse(Assets.getText('data.json'));

    // _.each(shops, (shop) => {
    //     Shops.insert({
    //         name: shop['name'],
    //         lat: parseFloat(shop['lat']),
    //         lng: parseFloat(shop['lng']),
    //         price: parseInt(shop['price']),
    //         selection: shop['selection'],
    //         verified: true
    //     });
    // });
});
