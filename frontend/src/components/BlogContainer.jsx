import React from 'react'
import { Flex,Container, HStack ,Box,Heading,Image} from '@chakra-ui/react'
import { wrap } from 'framer-motion'
import BlogCard from './BlogCard'
import LatestPost from './LatestPost'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogContainer = () => {
  const [posts,setPosts]=useState([])



useEffect(()=>{
  const getFeed=async()=>{
    try {
      const res=  await fetch('/api/posts/getFeed',{
        method:'GET',
        headers:{"Content-Type":'application/json'},
    
      })
      const data= await res.json()
      console.log(data)
      setPosts(data)
      
    } catch (error) {
      console.error("error in fetching posts",error)
      
    }
  }
getFeed()

},[])





  return (
    <Flex flexBasis="960px" m="30px" bg=""   flexDirection={["column", "column", "row"]}  >

       
       
     <Flex  bg=""  wrap={"wrap"}>
   
     {posts?.length>0?(
      posts.map((post)=>(
      <BlogCard 
      key={post.id}
      postId={post.id}
       author={post.author} 
       text={post.text} 
       title={post.title}
       img={post.img} 
       postedBy={post.postedBy} 
       updatedAt={post.updatedAt}
    

    
       />
       
       ))
       ):(
       <p>No posts awvilble</p>
       )}
     </Flex>
     
        
    </Flex>
  
  )
}

export default BlogContainer