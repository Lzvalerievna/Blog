
const initionState = {blogList: [], article: [], titleError: '', loading: true, totalPage: 0, currentPage: 0, offset: 0, like: false}

const reducer = (state = initionState, action) => {
    switch (action.type) {

      case'BLOGLIST':
      return {...state, blogList: action.payload.articles, loading: false, totalPage: action.payload.articlesCount}

      case'CURRENTPAGE':
      return {...state, currentPage: action.currentPage, offset: action.pageOffset}

      case'LOADING':
      return {...state, loading: action.payload} 
      
      case'DESCRIPTION':
      return {...state, article: action.payload.article, loading: false}

      case'ERRORTITLENAME':
      return{...state, titleError: action.payload}
      
      case'FAVORITED':
      return {...state, blogList: state.blogList.map(article => {
        console.log(article.slug)
        console.log(action.payload.slug)
        if(article.slug === action.payload.slug) {
            return action.payload
        }
        return article;
      }),
      article: action.payload
    }  

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

export default reducer;
