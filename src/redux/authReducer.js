
const initionState = {
  password: '',
  user: {
    bio: '',
    email: '',
    image: '',
    token: '',
    username: ''
  },
  signUpErrorMessage: '',
  signInErrorMessage: ''
}

const authReducer = (state = initionState, action) => {
    switch (action.type) {


      case'REGISTER':
      return {...state, user: action.payload, signUpErrorMessage: ''}

      case'LOGOUT':
      return{...state, user: {
        bio: '',
        email: '',
        image: '',
        token: '',
        username: ''
      }}

      case'LOGINERROR':
      console.log(action.payload)
      return {...state, signInErrorMessage:  action.payload}

      case'REGISTERERROR':
      console.log(action.payload)
      return {...state, signUpErrorMessage:  action.payload}

      case'UPDATEWINDOW':
      return {...state, user: action.obj}
        default: 
            return state;
    }
}

export default authReducer;