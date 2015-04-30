interface ShopDAO {
    _id?: string;
    name: string;
    lat: number;
    lng: number;
    price: number;
    submitted_by?: string;
    verified: boolean;
}

declare var Shops:Mongo.Collection<ShopDAO>;
