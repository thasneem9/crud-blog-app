import { Flex, Heading ,HStack,Text} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';



const PostPage = () => {
  const[post,setPost]=useState('')
  const {postId}=useParams()
  console.log("postID---",postId)

  useEffect(()=>{
    const getPost=async()=>{
      try {
        const res= await fetch(`/api/posts/getPost/${postId}`,{
          method:'GET',
          headers: { 'Content-Type': 'application/json' }, 
        })

        const data=await res.json()
        console.log(data)
        if(data){
          setPost(data.post)
        }
      
        
      } catch (error) {
        console.error('errorinfetching post details',error)
        
      }
    }

    getPost()
  },[])
  console.log(post.text)

  const fomattedDate= new Date(post.createdAt).toLocaleDateString('en-us',{
    'year':'numeric',
    'month':'long',
    'day':'numeric',

  })

  return (
  <>
 <Flex bg={"blue.100"}flexDirection={"column"} >
  <HStack>
  <Heading ml={"40%"} p={"10px"}>{post?.title}</Heading>
  <Text ml={"90px"}>{fomattedDate}</Text>

  </HStack>

  <Text  p={"10px"}>{post?.text}</Text>


  </Flex>
  </>

  )
}

export default PostPage