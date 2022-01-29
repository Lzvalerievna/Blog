import React, {useEffect} from 'react';
import { Spin, Pagination} from "antd";
import 'antd/dist/antd.css';
import { useDispatch, useSelector} from 'react-redux';
import classes from './blogList.module.scss';
import Blog from '../Blog/blog';
import {setBlog, setLoading, setCurrentPage} from '../../redux/actions'

function BlogList(){

  const dispatch = useDispatch()
  const blog = useSelector(state => state.reducer)

    useEffect(()=> {
      dispatch(setBlog(blog.offset))
      dispatch(setLoading(true))
    },[localStorage.getItem('token'), blog.offset])

    const onChange = (page) => {
      const pageOffset = (page - 1) * 4
      dispatch(setCurrentPage(page, pageOffset))
    }

    const ticketRender = blog.blogList.map((user,index) => {
        const {id, ...itemProps} = user;
          return <Blog {...itemProps} key = {index}/>
    })

    return(
        <div className = {classes.blogList}>
            {blog.loading ? <div className = {classes.spin}><Spin/></div> : ticketRender} 
            <div className = {classes.pagination}>
            < Pagination className= {classes.btn}
              defaultCurrent={1}
              onChange = {onChange}
              total={blog.totalPage}
              defaultPageSize = {4}
              hideOnSinglePage = {true}
            />
            </div>
        </div>
    )
}
 
 export default BlogList;