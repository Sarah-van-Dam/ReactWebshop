import { Product } from "../Product";

export type User  = {
    customerName: string;
    email: string;
    password: string;
    basket: Product[];
}