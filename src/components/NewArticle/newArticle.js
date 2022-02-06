import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from "antd";
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import { useForm, useFieldArray} from "react-hook-form";
import classes from './newArticle.module.scss';
import { setCreateArticle, setUpdateArticle, setLoading } from '../../redux/actions';
import SwapiService from '../../Api/service';

const swapiService = new SwapiService()


function NewArticle({location, match}) {
    
    const [article, setArticle] = useState()
    const dispatch = useDispatch()
    const history = useHistory()
    const articleSlug = match.params.slug
    const newArticle = (state => state.blogData)
    const loading = useSelector(state => state.blogData.loading)
    let obj;

    useEffect(() => {
        dispatch(setLoading(true))
        swapiService.getArticle(articleSlug)
        .then(data => setArticle(data.article))
    }, [])
    
    if(location.pathname !== '/new-article') {
        if(article) {
            obj = {
                title: article.title,
                description: article.description,
                text: article.body,
                tagList: article.tagList
            }
            dispatch(setLoading(false))
        }
    }

    if(location.pathname === '/new-article') {
        obj = ({ tagList: []})
        dispatch(setLoading(false))
    }
    
    const {register, handleSubmit, formState: { errors }, control, reset} = useForm({defaultValues: useMemo(() => {
        return obj;
    }, [obj])})

    const { fields, append, remove} = useFieldArray({
        control,
        name: 'tagList',
    })

    useEffect(() => {
        reset(obj);
    }, [article]);

    const onSubmit = (data) => {
        const arrTagList = data.tagList.reduce((newArr, item) => {
            if(item.tag.trim().length > 0) {
                newArr.push(item.tag)
            }          
            return newArr;
        }, []);
        if(location.pathname === '/new-article') {
            dispatch(setCreateArticle(data.title, data.description, data.text, arrTagList, history))
        }
        if(location.pathname !== '/new-article') {
            dispatch(setUpdateArticle(data.title, data.description, data.text, arrTagList, articleSlug, history))
        }
    }

    return(
        <div> 
            {loading ? <div className = {classes.spin}><Spin/></div> : 
                <div className = {classes.newArticle}>   
                    {location.pathname === '/new-article' ? <h1 className = {classes.title}>Create new article</h1> :
                        <h1 className = {classes.title}>Edit article</h1>}
                            {newArticle.titleError ? <p className = {classes.errorMes}>{newArticle.titleError}</p> : ''}
                                <form className = {classes.blogContainerForm} onSubmit={handleSubmit(onSubmit)}>
                                    <div className = {classes.formContainer}>
                                        <label className = {classes.formLabel}>Title
                                            <input className = {classes.formInput} placeholder="Title"
                                                {...register('title', {required: "Title is required"})}/>
                                                {errors.title?.type === 'required' && (<p className = {classes.danger}>{errors.title.message}</p>)}
                                        </label>
                                    </div>
                                    <div className = {classes.formContainer}>
                                        <label htmlFor = "description" className = {classes.formLabel}>Short description
                                            <input className = {classes.formInput} placeholder="Short description"
                                                {...register('description', {required: "Title is required"})}/>
                                                {errors.description?.type === 'required' && (<p className = {classes.danger}>{errors.description.message}</p>)}
                                        </label>
                                    </div>
                                    <div className = {classes.formContainer}>
                                        <label htmlFor = "text" className = {classes.formLabel}>text
                                            <textarea className = {classes.formInputText} placeholder="Text"
                                                {...register('text', {required: "Title is required"})}/>
                                                {errors.text?.type === 'required' && (<p className = {classes.danger}>{errors.text.message}</p>)}
                                        </label>
                                    </div>
                                    <div>  
                                        <div className = {classes.formContainerTag} >
                                            <label htmlFor = "tags" className = {classes.formLabel}>
                                                Tags
                                                <div className = {classes.tagGroup} >  
                                                    {fields.map((item, index) => (
                                                        <div key = {item.id} className = {classes.tagGroupName}>
                                                            <input className = {classes.formTag} 
                                                                {...register(`tagList.${index}.tag`)} 
                                                                name ={`tagList[${index}].tag`}  
                                                                placeholder="Tag"
                                                                defaultValue={obj.tagList[index]}/>
                                                            <button type = "button" className={classes.btnDelete} onClick= {() => remove(index)}>Delete</button>       
                                                        </div>
                                                    ))}
                                                        <div>
                                                            <button type = "button" className={classes.btnAdd} onClick = {() => append({})}>Add tag</button>   
                                                        </div>  
                                                </div>
                                          </label>
                                        </div>   
                                    </div>
                                    <button className={classes.btnSend} type="submit">Send</button>  
                                </form>
                </div>
            }
        </div>
      )

}

export default NewArticle;
