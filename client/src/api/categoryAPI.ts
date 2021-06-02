import { rootURL } from "./userAPI";

// call .get("/categories/:categoryId/products", getProductByCategory);

export async function getProductsByCategoryAPI(category: string) {
  const response = await fetch(rootURL + "categories/" + category + "/products", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
// call .get("/categories/", getCategories);

export async function getCategoriesAPI() {
  const response = await fetch(rootURL + "categories", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
