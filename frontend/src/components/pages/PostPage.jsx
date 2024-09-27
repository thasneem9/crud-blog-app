import { Button, Flex, Heading ,HStack,Text} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {useRecoilValue} from 'recoil'
import { useNavigate } from 'react-router-dom';
import userAtom from '../atoms/userAtom.js'
const PostPage = () => {
  const navigate=useNavigate()
  const user=useRecoilValue(userAtom)
  const userId=(user.userId)
  console.log(user.userId)
  const[post,setPost]=useState('')

  
  const {postId}=useParams()
  console.log("postID---",postId)

const handleEdit=()=>{
  navigate(`/editPost/${postId}`)
}

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
  console.log(post?.text)

  const fomattedDate= new Date(post?.createdAt).toLocaleDateString('en-us',{
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
  {/* if postedBy==userId then render thesebuttons */}
 {post?.postedBy===userId && (
  <div>
    <Button onClick={handleEdit}>Edit button</Button>
    <Button>Delete button</Button>
  </div>
 )}
  </>

  )
}

export default PostPage