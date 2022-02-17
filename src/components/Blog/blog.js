import React from 'react';
import { Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import classes from './blog.module.scss';
import {setFavorite, setDeleteFavorite} from '../../redux/actions';
import createDate from '../../utilites';


function Blog({title, author, createdAt, description, tagList, slug, favoritesCount, favorited}) {
    
    const dateArticle = createDate(createdAt)
    const dispatch = useDispatch()

    const onLike = () => {
        if(localStorage.getItem('token')) return !favorited ? dispatch(setFavorite(slug)) : dispatch(setDeleteFavorite(slug)) 
    }

    return(
        <div className = {classes.navArticle}>
           <div className = {classes.Blog}>
                <div className = {classes.blog}>
                    <Link className = {classes.blogTitle} to = {`/articles/${slug}`} >{title}</Link>
                    <button className = {classes.btnFavorie} onClick={() => onLike()}>
                        {favorited ? <img className ={classes.image} src='../../heartRed.svg' alt="heart"/> : 
                            <img className ={classes.image} src='../../heart.svg' alt="heart"/>}
                    </button> 
                    <p className = {classes.favoriteCounte}>{favoritesCount}</p>
                    <div className = {classes.Author}>
                        <div className = {classes.blogAuthor}>
                            <p className = {classes.blogUserName}>{author.username}</p>
                            <p className = {classes.blogCreated}>{dateArticle}</p>
                        </div>
                        <img className = {classes.blogImg} src={author.image} alt="avatar" />
                    </div>
                </div>
                <div className={classes.blogTagList}>{tagList.map((item) => <p  className = {classes.tagList} key = {item}>{item}</p>)}</div>
                <p className = {classes.blogBody}>{description}</p>
           </div>
        </div>
    )
}

export default Blog;
