import React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import classes from './formSignIn.module.scss';
import {setSignIn} from '../../redux/actions';

function FormSignIn() {

    const { register, handleSubmit, formState: { errors },trigger} = useForm({defaultValues: {
        email: '',
        password: ''
    }})
    const dispatch = useDispatch()
    const signIn = useSelector(state => state.auth)
    const history = useHistory()

    const onSubmit = data => {
        dispatch(setSignIn(data.email, data.password, history))
    }

    return(
        <div className = {classes.container}>  
        
        <div className = {classes.blogContainer}>
            <h1 className = {classes.blogContainerName}>Sign in</h1>
            {localStorage.getItem('token') ? <h1 className = {classes.signin}> signin successful completed</h1> :  ''}
            {signIn.signInErrorMessage ? <p className = {classes.errorMes}>{signIn.signInErrorMessage}</p> : ''}
            <form className = {classes.blogContainerForm} onSubmit = {handleSubmit(onSubmit)}>
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
                <button className={classes.formButton} type="submit">Login</button>
            </form>  
            <div className = {classes.formContainerP}>
                <p className = {classes.formP}>Don&apos;t have an account? <NavLink className = {classes.navSignUp} to = {'/sign-up'}>Sign up.</NavLink></p>
            </div>
        </div>
        </div>
    )
}

export default FormSignIn;
