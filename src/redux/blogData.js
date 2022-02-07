
const initionState = {blogList: [], article: [], titleError: '', loading: true, totalPage: 0, like: false}

const blogData = (state = initionState, action) => {
  switch (action.type) {
    
    case'BLOGLIST':
      return {...state, blogList: action.payload.articles, loading: false, totalPage: action.payload.articlesCount}

    case'LOADING':
      return {...state, loading: action.payload} 
      
    case'DESCRIPTION':
      return {...state, article: action.payload.article, loading: false}

    case'ERRORTITLENAME':
    console.log(action.payload)
      return{...state, titleError: action.payload}
      
    case'FAVORITED':
      return {...state, blogList: state.blogList.map(article => {
        if(article.slug === action.payload.slug) {
          return action.payload
        }
        return article;
      }), article: action.payload}  

    case'LIKE': 
      return {...state, like: action.payload}

    case'NEWARTICLE': {
      return {...state, blogList: state.blogList}
    }

    case'DELETEARTICLE':
      return{...state}

    default: 
      return state;   
  }
}

export default blogData;
