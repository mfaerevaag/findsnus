Shops = new Mongo.Collection<ShopDAO>("shops");

Shops.allow({
  insert: (userId, doc) => { return false },
  update: (userId, doc) => { return false },
  remove: (userId, doc) => { return false },
});
