import React, {useEffect } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { Spin, Popconfirm} from "antd";
import {useDispatch, useSelector} from 'react-redux';
import classes from './article.module.scss';
import 'antd/dist/antd.css';
import {setArticle, setLoading, setDeletArticle } from '../../redux/actions';


function Article({match}) { 

  const articleSlug = match.params.slug
  const dispatch = useDispatch()
  const history = useHistory()
  const blog = useSelector(state => state.reducer.article)
  const user = useSelector(state => state.authReducer.user)
  const loading = useSelector(state => state.reducer.loading)

  useEffect(() => {
    dispatch(setArticle(articleSlug))
    dispatch(setLoading(true))
  }, [])

  const date = new Date(blog.createdAt);
  const options = { year: 'numeric', month: 'long', day: 'numeric'}
  const  releaseDate = date.toLocaleDateString("en-CA", options)

  function confirm() {
    dispatch(setDeletArticle(articleSlug, history))
  }
  function cancel() {
    console.log(cancel)
  }

  return(
    <div> 
      {loading ? <div className = {classes.spin}><Spin/></div> : 
      <div>
      {!blog.author ? <div className = {classes.spin}><Spin/></div> : 
        <div className = {classes.Blog}>
          <div className = {classes.blog}>
            <p className = {classes.blogTitle}>{blog.title}</p>
            <p className = {classes.favoriteCounte}>
            <img className ={classes.image} src='../../heart.svg' alt="heart"/>
            <span>{blog.favoritesCount}</span>
            </p>
            <div className = {classes.Author}>
               <div className = {classes.blogAuthor}>
                <p className = {classes.blogUserName}>{blog.author.username}</p>
                <p className = {classes.blogCreated}>{releaseDate}</p>
            </div>
            <img className = {classes.articleImg} src={blog.author.image} alt="avatar" />
          </div>
        </div>
        <div className= {classes.blogTagList}>{blog.tagList.map((item) => <p className = {classes.tagList}>{item}</p>)}</div>
        <div className = {classes.container}>
          <p className = {classes.blogDescription}>{blog.description}</p>
          {blog.author.username === user.username ?
            <div className ={classes.btn}>
              <Popconfirm 
                title="Are you sure to delete this article?"
                placement="rightTop"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              ><a href="#" className = {classes.btnDelete}>Delete</a></Popconfirm>
              <NavLink className = {classes.btnEdit} to = {`/articles/${articleSlug}/edit`}>Edit</NavLink>
            </div>  : ''
          }
        </div>
        <p className = {classes.blogBody}>{blog.body}</p>
        </div>}
        </div>
       }
    </div>
  )
}

export default Article;

 

