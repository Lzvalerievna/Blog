import React, { useRef, useState, useEffect } from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { useForm } from "react-hook-form";
import classes from './formSignUp.module.scss';
import {setSignUp, setPassword}  from '../../redux/actions';

function FormSignUp() {
    
    const dispatch = useDispatch()
    const signUp = useSelector(state => state.authReducer)

    const { register, handleSubmit, formState: { errors }, watch, trigger} = useForm({
        defaultValues: {
            checkbox: false
          }
    });
    
    const password = useRef()
    password.current = watch("password");
    
    const onSubmit = data => {
            console.log(data)
            dispatch(setSignUp(data.username, data.email, data.password))
            dispatch(setPassword(data.password))
    }

    return(
       <div className = {classes.container}>   
               <div className = {classes.blogContainer}>
                    <h1 className = {classes.blogContainerName}>Create new account</h1>
                    { localStorage.getItem('token') ? <h1 className = {classes.signup}> signup successful completed</h1> :  ''}
                    {signUp.signUpErrorMessage ? <p className = {classes.errorMes}>{signUp.signUpErrorMessage}</p> : ''}
                    <form className = {classes.blogContainerForm} onSubmit={handleSubmit(onSubmit)}>
                        <div className = {classes.formContainer}>
                            <label htmlFor = "username" className = {classes.formLabel}>Username</label>
                            <input className = {classes.formInput} id = "username" placeholder="Username" 
                                {...register('username', { required: "Username is required",
                                    minLength: {value: 3, message: "Username must be at least 3 characters"},
                                    maxLength: {value: 20, message: "Username must be at most 20 characters"}
                                })} onKeyUp = {() => { trigger("username")}}/>
                                {errors.username && (<p className = {classes.danger}>{errors.username.message}</p>)}
                        </div>
                        <div className = {classes.formContainer}>
                            <label htmlFor = "email" className = {classes.formLabel}>Email address</label>
                            <input className = {classes.formInput} id = "email" placeholder="Email address"
                                {...register('email', {required: "Email is Required", 
                                    pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address'}})}
                                    onKeyUp = {() => { trigger("email")}}/>
                                {errors.email && (<p className = {classes.danger}>{errors.email.message}</p>)}
                        </div>
                        <div className = {classes.formContainer}>
                            <label htmlFor = "password" className = {classes.formLabel}>Password</label>
                            <input className = {classes.formInput} id = "password" placeholder="Password" type = "password"
                                {...register('password', {required: "Password is Required", 
                                    minLength: {value: 6, message: "Your password needs to be at least 6 characters"},
                                    maxLength: {value: 40, message: "Password must be at most 40 characters"}
                                })} onKeyUp = {() => { trigger("password")}}/>
                                {errors.password && (<p className = {classes.danger}>{errors.password.message}</p>)}
                        </div>
                        <div className = {classes.formContainer}>
                            <label htmlFor = "password_repeat" className = {classes.formLabel}>Repeat Password</label>
                            <input className = {classes.formInput} id = "password_repeat" placeholder="Password" 
                                type = "password"
                                {...register('password_repeat', {required: "Passwords must match",
                                    validate: (value) => value === password.current })} />
                                {errors.password_repeat && errors.password_repeat.type === "validate" && 
                            <p className = {classes.password}>The passwords do not match</p>}
                        </div>
                        <div className= {classes.checkboxLabel} >
                            <input  type="checkbox"  id="checkbox" className = {classes.checkbox} inputRef ={register}
                                {...register('checkbox', {required: 'You mast agree to terms'})}/>
                            <label  htmlFor = "checkbox" className = {classes.checkboxText}>I agree to the processing of my personal information</label>
                        </div>
                        {errors.checkbox && (<p className = {classes.dangerCheck}>{errors.checkbox.message}</p>)}
                        <button className={classes.formButton} type="submit">Create</button>  
                    </form>
                    <div className = {classes.formContainerP}>
                        <p className = {classes.formP}>Alreade have an account?<NavLink  className = {classes.navSignIn} to = {'/sign-in'}> Sign in.</NavLink></p>
                    </div>
                </div>
        </div>
    )
}
 

export default FormSignUp;
