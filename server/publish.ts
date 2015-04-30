Meteor.publish('shops', function() {
  return Shops.find();
});
