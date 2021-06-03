import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { checkLoginAPI, getUserAPI } from "../../api/userAPI";
import { ShopContext } from '../../context/ShoppingContext';
import { User } from "../../api/types/User";
import { FormStyle } from "../../styles/styles";
  
  type FormErrors = {
    email?: string;
    password?: string;
  }

export function Login() {
    const history = useHistory();

    const  shopContext = useContext(ShopContext)
    // check conext
    if (!shopContext)
    throw(new Error("ShopContext is undefined!"))
   
    // deconstruct context
    const { isLoggedIn, updateCurrentUser, updateLoggedIn } = shopContext

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [validation, setValidation] = useState(true);

  
    function validateForm() {
      return email.length > 0 && password.length > 0;
    }
  
    useEffect(()=> {
      if(isLoggedIn) {
        history.push('/home');
      }
    }, [isLoggedIn])

    function handleSubmit(event : React.FormEvent) {
      event.preventDefault();
        checkLoginAPI(email, password)
            .then(response => {
              if(response.ok){
                  getUserAPI(email).then ((newUser : User) => {
                    updateCurrentUser(newUser)
                    updateLoggedIn(true)
                    setValidation(true);
                  })
              } else {
                setValidation(false);
                return false;
              }
            }).catch((e) => {
              setValidation(false);
              return false;
            })
    }

    const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(e.target.value);
        setErrors((prev) =>({ ...prev, ...validateEmail(value) }))
    }
  
    const validateEmail = (value: string) : FormErrors => {
        const regEmail : RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regEmail.test(value)) {
          return {email: "Not a valid email"};
        }
        return {email: undefined};
    }  

    const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(e.target.value);
        setErrors((prev) =>({ ...prev, ...validatePassword(value) }))
      }

    const validatePassword = (value: string) : FormErrors =>{
        if (value.length < 4) {
          return {password: "The password must be longer than 4"};
        } 
        return {password: undefined};
      }

    return (
        <FormStyle>
        <Container className="justify-content-center">
            <div className="Login text-left" >
                <Form onSubmit={handleSubmit} >
                <h1>Log in</h1>
                <p>
                    Please enter your email and password to log in to your Pibu care account.
                </p>  <hr></hr>
                <Form.Group className="lg" controlId="email">
                    <Form.Label >Email</Form.Label>
                    <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={handleInputEmail}
                    />
                    {errors.email ? <span style={{color: "red"}}>{errors.email}</span> : null}
                </Form.Group>
                <Form.Group className="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    value={password}
                    onChange={handleInputPassword}
                    />
                    {errors.password ? <span style={{color: "red"}}>{errors.password}</span> : null}
                </Form.Group>
                { !validation && <p style={{color:"red"}}>Your login credentials could not be verified, please try again.</p>}
                <Button block size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmit}>
                    Login
                </Button>
                <Button block size="lg" className="btn-secondary" type="cancel" onClick={ () => history.push("/")}>
                    Cancel
                </Button>
                </Form>
            </div>
        </Container>
        </FormStyle>
    );
  }

