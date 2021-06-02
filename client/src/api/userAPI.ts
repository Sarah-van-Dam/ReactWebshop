import { Product } from "./Product";

// Root URL
export const rootURL = "http://localhost:5000/"

// call post("/login/", postLoginUser);
export async function checkLoginAPI(email: string, password: string) { 
    const response = await fetch(rootURL+"login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email:email, password: password})
      });
      return response;
}

// call .post("/users", postCreateUser);
export async function registerUserAPI(name: string, email: string, password: string) { 
  const response = await fetch(rootURL+"users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({customerName: name, email:email, password: password, basket: []})
    });
    return response;
}



// Call .get("/users/:email", getUser);
export async function getUserAPI(email: string) {
    const response = await fetch(rootURL+"users/"+email, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


// Call .get("/users/:email/basket", getBasket); 
export async function getBasketAPI(email: string) {
  const response = await fetch(rootURL+"users/"+email+"/basket", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}



// call .delete("/users/:email/basket", deleteItemFromBasket);
export async function removeFromBasketAPI(product: Product, userEmail: string) { 
  const response = await fetch(rootURL+"users/"+ userEmail + "/basket", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product)
    });
    return response;
}


// call .put("/users/:email/basket", putItemInBasket);
export async function addToBasketAPI(product: Product, userEmail: string) { 
  const response = await fetch(rootURL+"users/"+ userEmail + "/basket", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product)
    });
    return response;
}




