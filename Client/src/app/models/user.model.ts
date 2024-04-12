export interface User {
    uid:          string;
    name:         string;
    lastName:     string;
    address:      string;
    email:        string;
    password:     string;
    phone:        string;
    image:        string;
    is_Admin:     boolean;
    is_Delete:    null;
    isBlocked:    boolean;
    payment_code: null;
    id_product:   null;
    Cart:         null;
    Requests:     any[];
    Products:     any[];
    Payments:     any[];
}
