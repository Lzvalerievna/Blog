import React, {useEffect, useState} from 'react';
import { Spin, Pagination} from "antd";
import 'antd/dist/antd.css';
import { useDispatch, useSelector} from 'react-redux';
import classes from './blogList.module.scss';
import Blog from '../Blog/blog';
import {setBlog, setLoading} from '../../redux/actions'

function BlogList({location}){


  const [currentPage, setCurrentPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogData)

  console.log(blog.blogList)
  console.log(location)

    useEffect(()=> {
      dispatch(setBlog(offset))
      dispatch(setLoading(true))
    },[localStorage.getItem('token'), offset])

    const onChange = (page) => {
      const pageOffset = (page - 1) * 4
      setCurrentPage(page)
      setOffset(pageOffset)
    }

    const ticketRender = blog.blogList.map((user) => {
        const {id, ...itemProps} = user;
          return <Blog {...itemProps} key = {id}/>
    })

    return(
        <div className = {classes.blogList}>
            {blog.loading ? <div className = {classes.spin}><Spin/></div> : ticketRender} 
            <div className = {classes.pagination}>
            < Pagination className= {classes.btn}
              defaultCurrent={currentPage}
              current = {currentPage}
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