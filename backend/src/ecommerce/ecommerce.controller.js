import * as model from "./ecommerce.model.js";

export async function postLoginUser(req, res) {
  try {
    let loginInfo = req.body
    let result = await model.loginUser(loginInfo);
    if (result)
      res.status(200).json({
        status: "OK",
      })
    else
    res.status(400).json({
      error: { message: error.message },
    });
    //res.end();
  } catch (error) {
    res.status(400).json({
      error: { message: error.message },
    });
  }
}

export async function postCreateUser(req, res) {
  try {
    let userInfo = req.body;
    await model.addUser(userInfo);
    res.status(201).json({
      status: "CREATED"
    })
  } catch (error) {
    res.status(400).json({
      error: { message: error.message },
    });
  }
}

export async function getUser(req, res) {
  try {
    let email = req.params.email;
    let user = await model.getUserByID(email);
    res.json(user);
  } catch (error) {
    res.status(404).json({
      error: { message: error.message },
    });
  }
}

// export async function postBasket(req, res) { // should be post
//   try {
//     let newBasket = req.body;
//     let email = req.params.email;
//     await model.updateBasketOfUser(email,newBasket);
//     res.status(200).json({
//       status: "OK",
//     });
//   } catch (error) {
//     res.status(400).json({
//       error: { message: error.message },
//     });
//   }
// }

export async function putItemInBasket(req, res) { 
  try {
    let item = req.body;
    console.log(item)
    let email = req.params.email;
    await model.putItemInBasket(email,item);
    res.status(200).json({
      status: "OK",
    });
  } catch (error) {
    res.status(400).json({
      error: { message: error.message },
    });
  }
}

export async function deleteItemFromBasket(req, res) { 
  try {
    let item = req.body;
    let email = req.params.email;
    await model.deleteItemFromBasket(email,item);
    res.status(200).json({
      status: "OK",
    });
  } catch (error) {
    res.status(400).json({
      error: { message: error.message },
    });
  }
}

export async function getBasket(req, res) {
  try {
    let email = req.params.email;
    let user = await model.getUserByID(email);
    //er ikke sikker på om man får basket på følgende måde:
    res.json(user.basket);
  } catch (error) {
    res.status(404).json({
      error: { message: error.message },
    });
  }
}


export async function getProducts(req, res) {
  try {
    let products = await model.getProducts();
    //console.log(products)
    res.json(products);
  } catch (error) {
    res.status(404).json({
      error: { message: error.message },
    });
  }
}

export async function postFilteredProducts(req, res) {
  try {
    let categories = req.body;
    let products = await model.postFilteredProducts(categories);
    //console.log(products)
    res.json(products);
  } catch (error) {
    res.status(404).json({
      error: { message: error.message },
    });
  }
}

export async function getProductById(req, res) {
  try {
    let id = req.params.tags;
    let product = await model.getProductByID(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      error: { message: error.message },
    });
  }
}

export async function getProductByCategory(req, res) {
  try {
    let id = req.params.categoryId;
    let products = await model.getProductByCategory(id);
    res.json(products);
  } catch (error) {
    res.status(404).json({
      error: { message: error.message },
    });
  }
}

export async function getCategories(req, res) {
  try {
    let categories = await model.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(404).json({
      error: { message: error.message },
    });
  }
}

export async function getCategoryById(req, res) {
  try {
    let id = req.params.categoryId;
    let category = await model.getCategoryByID(id);
    res.json(category);
  } catch (error) {
    res.status(404).json({
      error: { message: error.message },
    });
  }
}
