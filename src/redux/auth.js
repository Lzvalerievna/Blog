
const initionState = {
  user: {bio: '', email: '', image: '', token: '', username: ''},
  signUpErrorMessage: '', signInErrorMessage: '', editError: ''
}

const auth = (state = initionState, action) => {
  switch (action.type) {
   
    case'REGISTER':
      return {...state, user: action.payload, signUpErrorMessage: ''}

    case'LOGOUT':
      return{...state, user: {bio: '', email: '', image: '', token: '', username: ''}}

    case'LOGINERROR':
      return {...state, signInErrorMessage:  action.payload}

    case'REGISTERERROR':
      return {...state, signUpErrorMessage:  action.payload}

    case'UPDATEWINDOW':
      return {...state, user: action.obj}

    case'EDITERROR':
      return {...state, editError: action.payload}
        
    default: 
      return state;
  }
}

export default auth;