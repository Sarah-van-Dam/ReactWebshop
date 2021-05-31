import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { checkLoginAPI, registerUserAPI } from '../apiHelper';


const LoginStyle = styled.div`
@media all and (min-width: 480px) {
    .Login {
      padding: 60px 0;
    }
  
    .Login form {
      margin: 0 auto;
      max-width: 420px;
    }
  }
`;

 type FormErrors = {
   userName?: string;
   email?: string;
   password?: string;
   confirmedPassword?: string;
 }

export const Register = () => {
   const history = useHistory();
   const [userName, setUserName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmedPassword, setConfirmdPassword] = useState("");
   const [errors, setErrors] = useState<FormErrors>({});
   const [validation, setValidation] = useState(true);
   const [didRegister, updateDidRegister] = useState(false);
 
   function validateForm() {
     return email.length > 0 && password.length > 0;
   }
 
   useEffect(()=> {
    if(didRegister) {
      // console.log(shopContext?.user)
      // console.log(shopContext?.categories)
      history.push('/home');
    }
  }, [didRegister])

   function handleSubmit(event : React.FormEvent) {
      event.preventDefault();
      // Check that user isn't in the system
      registerUserAPI(userName, email, password)
      .then(response => {
        if(response.ok)
        {
          updateDidRegister(true);
          setValidation(true);
        } else {
        updateDidRegister(false);
        setValidation(false);
        return false;
      }
    }).catch((e) => {
      updateDidRegister(false);
      setValidation(false);
      return false;
    })
   }

   const handleInputUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
       setUserName(e.target.value);
       setErrors((prev) =>({ ...prev, ...validateUserName(value) }))
   }

   const validateUserName = (value: string) : FormErrors => {
      if(value.length < 2) {
        return {userName: "The user name must be more that 2 characters"};
      }
      return {userName: undefined};
  }  

   const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
       const value = e.target.value;
       setEmail(e.target.value);
       setErrors((prev) =>({ ...prev, ...validateEmail(value) }))
   }
 
   const validateEmail = (value: string) : FormErrors => {
       const regEmail : RegExp = /^[a-zA-z]+@[a-z]+.[a-z]+$/;
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

   const handleInputConfirmedPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setConfirmdPassword(e.target.value);
      setErrors((prev) =>({ ...prev, ...validateConfirmedPassword(value) }))
   }

   const validateConfirmedPassword = (value: string) : FormErrors =>{
      if (value.length < 4) {
        return {confirmedPassword: "The confirmed password must be longer than 4"};
      } 
      if (password !== value) {
         return {confirmedPassword : "The confirmed password is not the same as the password"}
      }
      return {confirmedPassword: undefined};
    }   

 return (
   <LoginStyle>
   <Container className="justify-content-center">
       <div className="Login text-left" >
           <Form onSubmit={handleSubmit} >
           <h1>Register</h1>
           <p>
               Please enter your name, email, and password to register for a Pibu care account.
           </p>  <hr></hr>
           <Form.Group className="lg" controlId="name">
               <Form.Label >Name</Form.Label>
               <Form.Control
               autoFocus
               type="text"
               value={userName}
               onChange={handleInputUserName}
               />
               {errors.userName ? <span style={{color: "red"}}>{errors.userName}</span> : null}
           </Form.Group>
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
           <Form.Group className="lg" controlId="confirmedPassword">
               <Form.Label>Confirm password</Form.Label>
               <Form.Control
               type="password"
               value={confirmedPassword}
               onChange={handleInputConfirmedPassword}
               />
               {errors.confirmedPassword ? <span style={{color: "red"}}>{errors.confirmedPassword}</span> : null}
           </Form.Group>
           { !validation && <p style={{color:"red"}}>The information you gave was already in the database</p>}
           <Button block size="lg" type="submit" disabled={!validateForm()}>
               Login
           </Button>
           <Button block size="lg" className="btn-secondary" type="cancel" onClick={ () => history.goBack()}>
               Cancel
           </Button>
           </Form>
       </div>
   </Container>
   </LoginStyle>
 );
};

