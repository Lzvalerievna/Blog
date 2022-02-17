import React, { useEffect,useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Spin, Popconfirm} from "antd";
import {useDispatch, useSelector} from 'react-redux';
import classes from './article.module.scss';
import 'antd/dist/antd.css';
import { setLoading, setDeletArticle } from '../../redux/actions';
import SwapiService from '../../Api/service';
import createDate from '../../utilites';

const swapiService = new SwapiService()


function Article({match}) { 

  const [article, setArticle] = useState()
  const articleSlug = match.params.slug
  const dispatch = useDispatch()
  const history = useHistory()
  const like = useSelector(state => state.blogData.like)
  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.blogData.loading)


  useEffect(() => {
    swapiService.getArticle(articleSlug)
    .then(data => {
      setArticle(data.article)
      dispatch(setLoading(false))
    })
  }, [])

  function confirm() {
    dispatch(setDeletArticle(articleSlug, history))
  }

  let dateArticle;
  if(article) {
    dateArticle = createDate(article.createdAt)
  }

  return(
    <div> 
      {loading ? <div className = {classes.spin}><Spin/></div> : 
        <div>
          {article ? 
            <div className = {classes.Blog}>
                <div className = {classes.blog}>
                  <p className = {classes.blogTitle}>{article.title}</p>
                  <p className = {classes.favoriteCounte}>
                    {!article.favorited ? <img className ={classes.image} src='../../heart.svg' alt="heart"/> : 
                      <img className ={classes.image} src='../../heartRed.svg' alt="heart"/>}
                      <span>{article.favoritesCount}</span>
                  </p>
                  <div className = {classes.Author}>
                    <div className = {classes.blogAuthor}>
                      <p className = {classes.blogUserName}>{article.author.username}</p>
                      <p className = {classes.blogCreated}>{dateArticle}</p>
                    </div>
                    <img className = {classes.articleImg} src={article.author.image} alt="avatar" />
                  </div>
                </div>
                <div className= {classes.blogTagList}>{article.tagList.map((item) => <p className = {classes.tagList}>{item}</p>)}</div>
                <div className = {classes.container}>
                  <p className = {classes.blogDescription}>{article.description}</p>
                  {article.author.username === user.username ?
                    <div className ={classes.btn}>
                      <Popconfirm 
                        title="Are you sure to delete this article?"
                        placement="rightTop"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                      ><a href="#" className = {classes.btnDelete}>Delete</a></Popconfirm>
                      <NavLink className = {classes.btnEdit} to = {`/articles/${articleSlug}/edit`} >Edit</NavLink>
                    </div>  : ''}
                </div>
                <p className = {classes.blogBody}>{article.body}</p>
            </div> : <div className = {classes.spin}><Spin/></div>}
        </div>}
    </div>
  )
}

export default Article;

 

