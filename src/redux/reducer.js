
const initionState = {blogList: [], article: [], titleError: '', loading: true, totalPage: 0, currentPage: 0, offset: 0}

const reducer = (state = initionState, action) => {
    switch (action.type) {

      case'BLOGLIST':
      console.log(action.payload.articlesCount)
      return {...state, blogList: action.payload.articles, loading: false, totalPage: action.payload.articlesCount}

      case'CURRENTPAGE':
      return {...state, currentPage: action.currentPage, offset: action.pageOffset}

      case'LOADING':
      return {...state, loading: action.payload} 
      
      case'DESCRIPTION':
      console.log(action.payload.article)
      return {...state, article: action.payload.article, loading: false}

      case'ERRORTITLENAME':
      return{...state, titleError: action.payload}
      
      case'FAVORITED':
      console.log(action.payload)
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
