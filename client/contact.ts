Template['contact'].helpers({
    'errorEmail': () => {
        if (Session.get('error-email')) {
            return "has-error";
        }
    },
    'errorName': () => {
        if (Session.get('error-name')) {
            return "has-error";
        }
    },
    'errorPosition': () => {
        if (Session.get('error-position')) {
            return "has-error";
        }
    },
    'errorPrice': () => {
        if (Session.get('error-price')) {
            return "has-error";
        }
    },
    'errorSelection': () => {
        if (Session.get('error-selection')) {
            return "has-error";
        }
    },
    'feedback': () => {
        return Session.get('contact-feedback');
    }
});

Template['contact'].events({
    'click .contact-btn': () => {
        var $contact = $('.contact');

        if ($contact.is(':visible')) {
            $contact.hide(300);
        } else {
            $contact.show(300);
        }
    },

    'submit .new-shop': (e) => {
        e.preventDefault();

        var hasErrors = false;

        var email = e.target.email.value.trim()
        var values: _.Dictionary<string> = {
            name: e.target.name.value.trim(),
            position: e.target.position.value.trim(),
            price: parseInt(e.target.price.value.trim()),
            selection: e.target.selection.value.trim()
        };

        // check fields

        _.map(_.extend({}, {email: email}, values), (value, key) => {
            if (value == '') {
                hasErrors = true;
                Session.set('error-' + key, true);
                console.log('error-' + key);
            } else {
                Session.set('error-' + key, false);
            }
        });

        var latlng = values['position'].split(',');

        if (latlng.length != 2) {
            Session.set('contact-feedback', 'Dine koordinater er formateret forkert');
            return false
        }
        else if (hasErrors) {
            Session.set('contact-feedback', 'Du skal fylde det hele ud!');
            return false;
        }

        // go


        var shop = {
            name: values['name'],
            lat: parseFloat(latlng[0].trim()),
            lng: parseFloat(latlng[1].trim()),
            price: parseInt(values['price']),
            selection: values['selection']
        }

        console.log(shop);

        var captcha = grecaptcha.getResponse();

        Meteor.call('submitShop', email, shop, captcha, (error, result) => {
            if (!!error) {
                console.error(error);
                Session.set('contact-feedback', 'Der er sket en fejl :\'-(');

            } else {
                e.target.reset();
                Session.set('contact-feedback', 'Perfekt, tak for det!');
            }
        });

        return false;
    }
});
