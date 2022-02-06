import React, {useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classes from './App.module.scss';
import Header from '../Header/header';
import BlogList from '../BlogList/blogList'
import FormSignUp from '../FormSignUp/formSignUp'
import FormSignIn from '../FormSignIn/formSignIn';
import EditProfile from '../EditProfile/editProfile';
import NewArticle from '../NewArticle/newArticle';
import Article from '../Article/article';
import PrivateRoute from '../PrivateRoute/privateRoute';
import {setUserLocalstorege} from '../../redux/actions'




function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        const localStorageRef = localStorage.getItem('token')
        if(localStorageRef) {
          dispatch(setUserLocalstorege(JSON.parse(localStorageRef)))
        }
    },[])

    return(
        <BrowserRouter >
            <div className = {classes.App}>
               <Header/>
               <Switch>
                    <Route path="/" exact component={BlogList}/>
                    <Route path="/articles" exact component={BlogList}/>
                    <Route path="/articles/:slug" exact component={Article} />
                    <Route path="/sign-up" component={FormSignUp}/>
                    <Route path="/sign-in" component={FormSignIn}/>
                    <PrivateRoute path="/profile" component={EditProfile} />
                    <PrivateRoute path="/new-article" component={NewArticle} />
                    <PrivateRoute path="/articles/:slug/edit" component={NewArticle} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}


export default App;