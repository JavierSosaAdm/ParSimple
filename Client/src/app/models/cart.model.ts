export interface Cart {
    id_Cart:            string;
    products:           [JSON] | null;
    product_quantity:   number;
    total_price:        number;
}

// trabajar con las carts a partir de este modelo 