import SwapiService from "../Api/service";

const swapiService = new SwapiService()

export const setBlogList = (payload) => ({type: 'BLOGLIST', payload})
export const setLoading = (payload) => ({type: 'LOADING', payload})
export const setSignUpAction = (payload) => ({type: 'REGISTER', payload})
export const setSignUpError = (payload) => ({type: 'REGISTERERROR', payload})
export const setSignInError = (payload) => ({type: 'LOGINERROR', payload})
export const setEditError = (payload) => ({type: 'EDITERROR', payload})
export const logOutAction = () => ({type: 'LOGOUT'})
export const setUserLocalstorege = (obj) => ({type: 'UPDATEWINDOW', obj})
export const setArticleDescriotion = (payload) => ({type: 'DESCRIPTION', payload})
export const setFavorited = (payload) => ({type: 'FAVORITED', payload})
export const setTitleError = (payload) => ({type: 'ERRORTITLENAME', payload})
export const setNewArticle = (payload) => ({type: 'NEWARTICLE', payload})
export const setPassword = (payload) => ({type: 'PASSWORD', payload})

export const saveTokenInLocalStorage = (tokenUser) => {
  localStorage.setItem('token', JSON.stringify(tokenUser))
}

export const setBlog = (offset) => dispatch => {
    swapiService.getBlogList(offset)
    .then(res => {
      dispatch(setBlogList(res))
    })
}


export const setSignUp = (username, email, password) => dispatch => {

  swapiService.getSignUp(username, email, password)
  .then(res => {
    if(res.user) {
      saveTokenInLocalStorage(res.user)
      dispatch(setSignUpAction(res.user))  
    }
    if(res.errors.email) {
      dispatch(setSignUpError('Email already been taken'))
    }
    if(res.errors.username) {
      dispatch(setSignUpError('Username already been taken'))
    }
  })
  .catch((error) => console.log(error))
}


export const setSignIn = (email, password, history) => dispatch => {
  swapiService.getSignIn(email, password)
  .then(res => {
    if(res.user) {
      saveTokenInLocalStorage(res.user)
      dispatch(setSignUpAction(res.user))  
      history.replace('/articles')
    }
    if(res.errors) {
      dispatch(setSignInError('Email or Password is invalid'))
    }
  })
  .catch((error) => console.log(error))
}


export const setLogOut = (history) => dispatch => {
  localStorage.removeItem('token');
  dispatch(logOutAction())
  history.replace('/articles')
}

export const setEditProf = (email, username,image, password, history) => dispatch => {

  swapiService.userUpdate(username, email, image, password)
  .then(res => {
    console.log(res.user)
    if(res.user) {
      saveTokenInLocalStorage(res.user)
      dispatch(setSignUpAction(res.user)) 
      dispatch(setEditError(''))
      history.replace('/articles')
    }
  })
  .catch((error) => {
    console.log(error.message)
    dispatch(setEditError('Username is not unique'))
  })
}

export const setFavorite = (slug) => dispatch => {
  swapiService.postFavorite(slug)
  .then(res => {
    dispatch(setFavorited(res.article))
  })
}

export const setDeleteFavorite = (slug) => dispatch => {
  swapiService.deleteFavorite(slug)
  .then(res => {
    dispatch(setFavorited(res.article))
  })
}

export const setCreateArticle = (title, description, text, tagList, history) => dispatch => {
  swapiService.getNewCreate(title, description, text, tagList)
  .then(res => {
    console.log(res.article)
    if(res.article) {
      dispatch(setNewArticle(res.article)) 
      dispatch(setTitleError(''))
      history.replace('/articles')
    }
    if(res.errors) {
      dispatch(setTitleError('Title must be unique'))
    }      
  })
}

export const setUpdateArticle = (title, description, text, tagList, slug, history) => dispatch => {
  swapiService.updateArticle(title, description, text, tagList, slug) 
  .then(res => {
      dispatch(setNewArticle(res.article)) 
      dispatch(setTitleError(''))
      history.replace('/articles')
  })
}

export const setDeletArticle = (slug,history) => dispatch => {
  swapiService.deleteArticle(slug)
  dispatch({type: 'DELETEARTICLE'})
  history.replace('/articles')
}



