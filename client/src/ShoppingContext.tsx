import React, { ReactElement, useEffect, useState } from "react";
import { Category, getCategoriesAPI, Product, User } from "./apiHelper";

export type ShopContextType = {
    isLoggedIn: boolean;
    updateLoggedIn: (loggedIn: boolean) => void;
    user: User;
    updateCurrentUser: (user : User) => void;
    categories: Category[];
    annonymousBasket: Product[];
    updateAnnoymousBasket: (basket : Product[]) => void;
}

type ContextPropType = {
    children: ReactElement
}

// create context, but there is no default value - set it to undefined.
export const ShopContext = React.createContext<ShopContextType | undefined>(undefined);

export const ShopContextProvider = (props : ContextPropType) => {
    const [categories, setCategoriesState] = useState<Category[]>([]);
    const [user, updateUserState] = useState<User>({customerName: "", email: "", password: "", basket: []})
    const [annonymousBasket, updateAnnoymousBasketState] = useState<Product[]>([])
    const [isLoggedIn, updateLoggedInState] = useState<boolean>(false)

    useEffect( () => {
        getCategoriesAPI()
        .then((data)=> {
        setCategoriesState(data);
        }).catch((e) => {
            console.log(e.message);
        })
    }, []);

    useEffect(()=> {
        console.log(user, "User context updated")
    }, [user])

    const updateCurrentUser = (newUser : User) => {
        console.log(newUser);
        updateUserState(() => newUser);
        console.log(user)
    }

    const updateAnnoymousBasket = (basket : Product[]) => {
        updateAnnoymousBasketState(basket);
    }
    const updateLoggedIn = (loggedIn : boolean) => {
        updateLoggedInState(loggedIn);
    }

    return (
        <ShopContext.Provider value= {{isLoggedIn, updateLoggedIn, user, updateCurrentUser, 
            categories, annonymousBasket, updateAnnoymousBasket}}>
                {props.children}
        </ShopContext.Provider>
    )

}

