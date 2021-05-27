
export type User  = {
    customerName: string;
    email: string;
    password: string;
    basket: Product[];
}

export type Product = {
    name: string;
    price: string;
    tags: string;
    description: string;
    img: string;
}

export type Category = {
    Id: string;
    types: string[];
}

// Root URL
const rootURL = "http://localhost:5000/"

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
      body: JSON.stringify({name: name, email:email, password: password, basket: []})
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
export async function removeFromBasketAPI(itemTags: string, userEmail: string) { 
  const response = await fetch(rootURL+"users/"+ userEmail + "/basket", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({item : itemTags})
    });
    return response;
}


// call .put("/users/:email/basket", putItemInBasket);
export async function addToBasketAPI(itemTags: string, userEmail: string) { 
  const response = await fetch(rootURL+"users/"+ userEmail + "/basket", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({item : itemTags})
    });
    return response;
}



// call .get("/products/", getProducts);
//export const getProducts = () => {}
export async function getProductsAPI() {
    const response = await fetch(rootURL+"products", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },

    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

// .post("/products", postFilteredProducts());
export async function postFilteredProductsAPI(categories: Category[]) { 
  const response = await fetch(rootURL+"products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({categories : categories})
    });
    return response;
}

// call .get("/products/:tags", getProductById);
export async function getProductWithIdAPI(tags: string) {
  const response = await fetch(rootURL+"products/"+tags, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// call .get("/categories/:categoryId/products", getProductByCategory);
export async function getProductsByCategoryAPI(category: string) {
  const response = await fetch(rootURL+"categories/" + category + "/products", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// call .get("/categories/", getCategories);
export async function getCategoriesAPI() {
    const response = await fetch(rootURL+"categories", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
  
      });
      return response.json(); // parses JSON response into native JavaScript objects
  }

// .get("/categories/:categoryId/subcategories", getCategoryById); For getting subcategories 