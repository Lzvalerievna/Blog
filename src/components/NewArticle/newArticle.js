import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, useFieldArray} from "react-hook-form";
import classes from './newArticle.module.scss';
import {setCreateArticle, setUpdateArticle, setDeletArticle} from '../../redux/actions';


function NewArticle({location}) {

    const history = useHistory()
    const dispatch = useDispatch()
    const newArticle = useSelector(state => state.reducer)
    const aaa = JSON.parse(localStorage.getItem('article'))

    console.log(aaa)

    let obj;

    if(location.pathname !== '/new-article') {
        obj = {
            title: aaa.title,
            description: aaa.description,
            text: aaa.body,
            tagList: aaa.tagList
        }
    }
    if(location.pathname === '/new-article') {
        obj = { tagList: []}
    }
        

    const {register, handleSubmit, formState: { errors }, control} = useForm({defaultValues: obj})
    const { fields, append, remove} = useFieldArray({
        control,
        name: 'tagList',
      });
    
    const onSubmit = (data) => {
        const arrTagList = data.tagList.reduce((newArr, item) => {
            newArr.push(item.tag);
            return newArr;
        }, []);
    
        if(location.pathname === '/new-article') {
            dispatch(setCreateArticle(data.title, data.description, data.text, arrTagList, history))
        }
        if(location.pathname !== '/new-article') {
            dispatch(setUpdateArticle(data.title, data.description, data.text, arrTagList, aaa.slug, history))
        }
    }
    return(
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
                                                    defaultValue={obj.tagList[index]}
                                                />
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
    )
}

export default NewArticle;