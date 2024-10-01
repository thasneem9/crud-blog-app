import { Heading ,Flex,Text,Button} from '@chakra-ui/react'
import React from 'react'
import BlogCard from './BlogCard'
import {useNavigate} from'react-router-dom';
import { useEffect,useState } from 'react';
const Me = () => {
    const navigate=useNavigate()




    const handleCreate=()=>{
      navigate('/create');
      
    }
    const [posts,setPosts]=useState([])
useEffect(()=>{
  const getMyPosts=async()=>{
    try {
      const res=await fetch('/api/posts/getMyPosts',{
        method:'GET',
        headers:{"Content-Type":"application/json"}

      })
      const data=await res.json()
      console.log("myposts:",data.posts)
      setPosts(data.posts)
      
    } catch (error) {
      console.error(error)
      
    }
  }
  getMyPosts()
},[])

  
  return (
    <>
   <Flex flexDirection={"column"} >
    <h1 ml="40%" className='categories'style={{fontSize:"40px", textAlign:"center",padding:"20px"}}  >
My Posts
    </h1>

    
    <Flex flexDirection={"row"}  wrap={"wrap"}>
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
   ):(<p className='categories' style={{fontSize:"30px", textAlign:"center",padding:"20px"}} >Create some posts to display..</p>)}
    </Flex>
   

    </Flex>

    <Button  ml="80%" mb="20px" onClick={handleCreate}>Create Post</Button>

    </>
  )
}

export default Me