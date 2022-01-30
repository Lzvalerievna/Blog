import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useForm } from "react-hook-form";
import classes from './editeProfile.module.scss';
import {setEditProf} from '../../redux/actions';

function EditProfile() {
    
    const history = useHistory()
    const dispatch = useDispatch()
    const newPassword = useSelector(state => state.authReducer.password)
    const objLocalUser = JSON.parse(localStorage.getItem('token'))

    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        defaultValues: {
            username: objLocalUser.username,
            email: objLocalUser.email,
            password: newPassword,
            image: objLocalUser.image
          }
    });

    const onSubmit = data => {
        dispatch(setEditProf(data.username, data.email, data.image, data.password, history))
    }

    return(
       <div className = {classes.container}>   
               <div className = {classes.blogContainer}>
                    <h1 className = {classes.blogContainerName}>Edit Profile</h1>
                    <form className = {classes.blogContainerForm} onSubmit={handleSubmit(onSubmit)}>
                        <div className = {classes.formContainer}>
                            <label htmlFor = "username" className = {classes.formLabel}>Username</label>
                            <input className = {classes.formInput} id = "username" placeholder="Username" 
                                {...register('username', { required: "Username is required",
                                    minLength: {value: 3, message: "Username must be at least 3 characters"},
                                    maxLength: {value: 20, message: "Username must be at most 20 characters"}
                                })} onChange = {() => { trigger("username")}}/>
                                {errors.username && (<p className = {classes.danger}>{errors.username.message}</p>)}
                        </div>
                        <div className = {classes.formContainer}>
                            <label htmlFor = "email" className = {classes.formLabel}>Email address</label>
                            <input className = {classes.formInput} id = "email" placeholder="Email address"
                                {...register('email', {required: "Email is Required", 
                                    pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address'}})}
                                    onChange = {() => { trigger("email")}}/>
                                {errors.email && (<p className = {classes.danger}>{errors.email.message}</p>)}
                        </div>
                        <div className = {classes.formContainer}>
                            <label htmlFor = "password" className = {classes.formLabel}>New password</label>
                            <input className = {classes.formInput} id = "password" placeholder="New password"
                                {...register('password', {
                                    minLength: {value: 6, message: "Your password needs to be at least 6 characters"},
                                    maxLength: {value: 40, message: "Password must be at most 40 characters"}
                                })} onKeyUp = {() => { trigger("password")}}/>
                        </div>
                        <div className = {classes.formContainer}>
                            <label htmlFor = "image" className = {classes.formLabel}>Avatar image (url)</label>
                            <input className = {classes.formInput} id = "image" placeholder="Avatar image"/>
                        </div>
                        <button className={classes.formButton} type="submit">Save</button>  
                    </form>
                </div>
        </div>
    )
}

export default EditProfile;