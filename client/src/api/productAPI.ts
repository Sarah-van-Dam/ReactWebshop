import { Category } from "./Category";
import { rootURL } from "./userAPI";

// call .get("/products/", getProducts);
//export const getProducts = () => {}



export async function getProductsAPI() {
  const response = await fetch(rootURL + "products", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
// .post("/products", postFilteredProducts());

export async function postFilteredProductsAPI(categories: Category[]) {
  const response = await fetch(rootURL + "products", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ categories: categories })
  });
  return response.json();
}
// call .get("/products/:tags", getProductById);

export async function getProductWithIdAPI(tags: string) {
  const response = await fetch(rootURL + "products/" + tags, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
