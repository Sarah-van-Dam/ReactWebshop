import React, { ReactElement, useEffect, useState } from "react";
import { getCategoriesAPI } from "../api/apiHelper";
import { Category } from "../api/Category";
import { Product } from "../api/Product";
import { User } from "../api/types/User";

export type ShopContextType = {
    isLoggedIn: boolean;
    updateLoggedIn: (loggedIn: boolean) => void;
    user: User;
    updateCurrentUser: (user : User) => void;
    categories: Category[];
    annonymousBasket: Product[];
    updateAnnoymousBasket: (basket : Product[]) => void;
    filterCategories: Category[];
    setFilterCategories: (categories: Category[]) => void;
    isFilterSet: () => boolean;
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
    const [filterCategories, setFilterCategories] = useState<Category[]>([{Id: "skintype", types:[]}, {Id: "producttype", types:[]}, {Id: "brand", types:[]} ]);

    useEffect( () => {
        getCategoriesAPI()
        .then((data)=> {
        setCategoriesState(data);
        }).catch((e) => {
            console.log(e.message);
        })
    }, []);

    // useEffect(()=> {
    //     console.log(user, "User context updated")
    // }, [user])

    const updateCurrentUser = (newUser : User) => {
        ///console.log(newUser);
        updateUserState(() => newUser);
        //console.log(user)
    }

    const updateAnnoymousBasket = (basket : Product[]) => {
        updateAnnoymousBasketState(basket);
    }
    const updateLoggedIn = (loggedIn : boolean) => {
        updateLoggedInState(loggedIn);
    }

    const isFilterSet = () => {
        return filterCategories.some((item, idx) => item.types.length > 0);
    }

    return (
        <ShopContext.Provider value= {{isLoggedIn, updateLoggedIn, user, updateCurrentUser, 
            categories, annonymousBasket, updateAnnoymousBasket, filterCategories, setFilterCategories, isFilterSet}}>
                {props.children}
        </ShopContext.Provider>
    )

}

