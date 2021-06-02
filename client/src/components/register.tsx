import React, { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { registerUserAPI } from '../apiHelper';


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
    userFirstName?: string;
    userFamilyName?: string;
    email?: string;
    password?: string;
    confirmedPassword?: string;
 }

export const Register = () => {
   const history = useHistory();
   const [userFirstName, setUserFirstName] = useState("");
   const [userFamilyName, setUserFamilyName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmedPassword, setConfirmdPassword] = useState("");
   const [errors, setErrors] = useState<FormErrors>({});
   const [validation, setValidation] = useState(true);
   const [didRegister, updateDidRegister] = useState(false);
 
   function validateForm() {
    const regEmail : RegExp = /^[a-zA-z]+@[a-z]+.[a-z]+$/;
     return userFirstName.length > 2 
            && userFamilyName.length > 2
            && regEmail.test(email) 
            && password.length > 4
            && confirmedPassword.length > 4 ;
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
      registerUserAPI(userFirstName+ " " + userFamilyName, email, password)
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

   const handleInputUserFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setUserFirstName(e.target.value);
      setErrors((prev) =>({ ...prev, ...validateUserFirstName(value) }))
   }

   const validateUserFirstName = (value: string) : FormErrors => {
    const regName : RegExp = /^[\D]+$/;
    if(value.length < 2) {
      return {userFirstName: "The user's first name must be more that 2 characters"};
    } else if(!regName.test(value)) {
      return {userFirstName: "The user's first name can only contain characters"};
    }
    return {userFirstName: undefined};
    }  

   const handleInputUserFamilyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserFamilyName(e.target.value);
    setErrors((prev) =>({ ...prev, ...validateUserFamilyName(value) }))
    }

   const validateUserFamilyName = (value: string) : FormErrors => {
    const regName : RegExp = /^[\D]+$/;
      if(value.length < 2) {
        return {userFamilyName: "The user's family name must be more that 2 characters"};
      } else if(!regName.test(value)) {
        return {userFamilyName: "The user's family name can only contain characters"};
      }
      return {userFamilyName: undefined};
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
           <Form.Group className="lg" controlId="firstName">
               <Form.Label >First name</Form.Label>
               <Form.Control
               autoFocus
               type="text"
               value={userFirstName}
               onChange={handleInputUserFirstName}
               />
               {errors.userFirstName ? <span style={{color: "red"}}>{errors.userFirstName}</span> : null}
           </Form.Group>
           <Form.Group className="lg" controlId="familyName">
               <Form.Label >Family name</Form.Label>
               <Form.Control
               autoFocus
               type="text"
               value={userFamilyName}
               onChange={handleInputUserFamilyName}
               />
               {errors.userFamilyName ? <span style={{color: "red"}}>{errors.userFamilyName}</span> : null}
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

