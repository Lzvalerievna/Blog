import React, {useEffect} from 'react';
import { useDispatch} from 'react-redux';
import { Link} from 'react-router-dom';
import classes from './blog.module.scss';
import {setFavorite, setDeleteFavorite} from '../../redux/actions';


function Blog({title, author, createdAt, description, tagList, slug, favoritesCount, favorited}) {

    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric'}
    const  releaseDate = date.toLocaleDateString("en-CA", options)
    const dispatch = useDispatch()

    const bbb = () => {
        if(localStorage.getItem('token')) return !favorited ? dispatch(setFavorite(slug)) : dispatch(setDeleteFavorite(slug)) 
    }

    return(
        <div className = {classes.navArticle} >
           <div className = {classes.Blog}>
                <div className = {classes.blog}>
                    <Link className = {classes.blogTitle} to = {`/articles/${slug}`} >{title}</Link>
                    <button className = {classes.btnFavorie} onClick={() => bbb()}>
                        {favorited ? <img className ={classes.image} src='../../heartRed.svg' alt="heart"/> : <img className ={classes.image} src='../../heart.svg' alt="heart"/>}
                    </button> 
                    <p className = {classes.favoriteCounte}>{favoritesCount}</p>
                    <div className = {classes.Author}>
                        <div className = {classes.blogAuthor}>
                            <p className = {classes.blogUserName}>{author.username}</p>
                            <p className = {classes.blogCreated}>{releaseDate}</p>
                        </div>
                        <img className = {classes.blogImg} src={author.image} alt="avatar" />
                    </div>
                </div>
                <div className={classes.blogTagList}>{tagList.map((item) => <p  className = {classes.tagList}>{item}</p>)}</div>
                <p className = {classes.blogBody}>{description}</p>
           </div>
        </div>
    )
}

export default Blog;
