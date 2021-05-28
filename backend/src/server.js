import express  from 'express';
import * as  cors from "cors"
import {ecommerceRouter} from './ecommerce/ecommerce.route.js';
const app = express();
const PORT = 5000;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

// paths handled by ecommerceRouter
app.use(ecommerceRouter)

app.get("/client/pages", (req, res) => res.sendFile("index.html", {root: __dirname }));
app.get("/", (req, res) => res.send("Server is ready"));


// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, function (err) {
  if (err) console.log("Error in server setup");
   console.log("Server listening on Port", PORT);
});
