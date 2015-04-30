Meteor.methods({
    'submitShop': function (email, values, captcha) {
        console.log(email);
        console.log(values);
        console.log(captcha);

        var verifyCaptcha = reCAPTCHA.verifyCaptcha(captcha, this.connection.clientAddress);

        if (!verifyCaptcha.success) {
            throw new Meteor.Error('reCAPTCHA Failed: ' + verifyCaptcha.error);
        }
    }
});
