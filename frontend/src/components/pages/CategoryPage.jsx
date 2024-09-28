import React from 'react'
import BlogCard from '../BlogCard'
const CategoryPage = () => {
    /* fetch selected categoried posts */
  return (
    <>
    <h1>posts under selected category:</h1>
    {/*  pass fetched props to blogcard*/}
    <BlogCard/>

    
    
    </>
  )
}

export default CategoryPage