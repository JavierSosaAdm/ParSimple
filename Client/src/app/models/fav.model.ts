import { Product } from "./product.model";
export interface Fav {
    id_Cart:            string;
    uid:                string;
    products:           Product[];
}