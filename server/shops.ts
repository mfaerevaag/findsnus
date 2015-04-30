var validateEmail = (email) => {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

Meteor.methods({
    'submitShop': function (email: string, shop: ShopDAO, captcha: string) {
        console.log(email);
        console.log(shop);
        console.log(captcha);

        if (!validateEmail(email)) {
            throw new Meteor.Error('invalid email address');
        }

        var verifyCaptcha = reCAPTCHA.verifyCaptcha(captcha, this.connection.clientAddress);

        if (!verifyCaptcha.success) {
            throw new Meteor.Error('reCAPTCHA Failed: ' + verifyCaptcha.error);
        }

        return Shops.insert(_.extend(shop, { submitted_by: email, validated: false }));
    }
});
