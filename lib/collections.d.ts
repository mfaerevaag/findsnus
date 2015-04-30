interface ShopDAO {
    _id?: string;
    name: string;
    lat: number;
    lng: number;
    price: number;
}

declare var Shops:Mongo.Collection<ShopDAO>;
