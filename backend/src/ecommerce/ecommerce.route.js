import express from 'express'
import {getBasket, getCategories, getCategoryById, getProductById, getProductByCategory, getProducts, postFilteredProducts, getUser, postCreateUser, postLoginUser, putItemInBasket, deleteItemFromBasket} from './ecommerce.controller.js'
//var {getBasket, getCategories, getCategoryById, getProductById, getProducts, getUser, postCreateUser, postLoginUser, updateBasket }  = require('./ecommerce.controller');
import cors from "cors"


export const ecommerceRouter = express.Router();
ecommerceRouter.use(cors())

// middleware specific to this route
ecommerceRouter.use(express.json())


// route handlers
ecommerceRouter.post("/users", postCreateUser);

ecommerceRouter.get("/users/:email", getUser);

//ecommerceRouter.post("/users/:email/basket", postBasket);

ecommerceRouter.put("/users/:email/basket", putItemInBasket);

ecommerceRouter.delete("/users/:email/basket", deleteItemFromBasket);

ecommerceRouter.get("/users/:email/basket", getBasket);

ecommerceRouter.post("/login/", postLoginUser);

ecommerceRouter.get("/products/", getProducts);

ecommerceRouter.post("/products/", postFilteredProducts);

ecommerceRouter.get("/products/:tags", getProductById);

ecommerceRouter.get("/categories/:categoryId/products", getProductByCategory);

ecommerceRouter.get("/categories/", getCategories);

ecommerceRouter.get("/categories/:categoryId", getCategoryById);


