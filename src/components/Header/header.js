import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import classes from './header.module.scss';
import {setLogOut} from '../../redux/actions';


function Header() {

  const history = useHistory()
  const dispatch =useDispatch()
  const auth = useSelector(state => state.auth)
  
  const onLogout = () => {
    dispatch(setLogOut(history))
  }

  return (
    <div className = {classes.headerBackground}>  
    <div className = {classes.header}>
      <p>
        <NavLink  className = {classes.headerText} to = {'/articles'} activeClassName={classes.headerName}>Realworld Blog</NavLink>
      </p>
      <div className = {classes.headerNav}>
        {localStorage.getItem('token')  ? (
          <div className = {classes.authContaner}> 
            <NavLink className = {classes.newArticle} to = {'new-article'} 
                activeClassName={classes.createArticle} exact>Create article
            </NavLink>
            <p>
              <NavLink className = {classes.authUserName} to = {'/profile'} 
                activeClassName={classes.activeUsername} exact>{auth.user.username}
              </NavLink>
              </p>
              <img className = {classes.authImg} src={auth.user.image ? 
                `${auth.user.image}` : "https://api.realworld.io/images/smiley-cyrus.jpeg"}  alt="avatar" />
              <button className = {classes.logOut} onClick = {onLogout}>Log Out</button>
          </div>
        ) : (
          <>
            <li>
              <NavLink className = {classes.navSignIn}  to = {'/sign-in'} 
                activeClassName={classes.activeSignin} exact>Sign in</NavLink>
            </li>
            <li>
              <NavLink className = {classes.navSignUp} to = {'/sign-up'}
                activeClassName={classes.activeSignUp} exact>Sign up</NavLink>
            </li>
          </>
        )}
      </div>
    </div>
    </div>
  )
}

export default Header;
