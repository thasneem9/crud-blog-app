import { Button, Flex, Heading ,HStack,Image,Text} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {useRecoilValue} from 'recoil'
import { useNavigate } from 'react-router-dom';
import userAtom from '../atoms/userAtom.js'
import { useToast } from '@chakra-ui/react';
const PostPage = () => {
  const toast=useToast();
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
const confirmDelete=()=>{
  const isConfirmed=window.confirm("Are you sure you want to delte this post?")
  if(isConfirmed){
    handleDelete()
  }
}
const handleDelete=async()=>{


  
  const res=await fetch(`/api/posts/deletePost/${postId}`,{
    method:'DELETE',
  })
  const data=await res.json()
  if(data){
    toast({
      status:"success",
      title:"Deleted Post"
    })
    window.location.reload()
  
    //taost
    console.log("success")
  }
  if(data.error){
    console.error(error)
  }
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
  console.log("Image URL:", post?.img);
  return (
  <>
  {post ?(
 <Flex bg={"blue.100"}flexDirection={"column"} mr={"70px"}
 ml={"70px"} >
  <HStack>
  <Heading ml={"40%"} p={"10px"}>{post?.title}</Heading>
  <Text ml={"90px"}>{fomattedDate}</Text>

  </HStack>
  {post?.img&&
  
  <Image ml={"46%"} boxSize="400px" src={`http://localhost:5000/${post?.img.replace(/\\/g, '/')}`} alt="Post Image" ></Image>
  }
  <Text fontSize={"30px"} p={"10px"}>{post?.text}</Text>


  </Flex>
  ):(
    <h1>Postis removed/not availble anymore</h1>
  )}
  {/* if postedBy==userId then render thesebuttons */}
 {post?.postedBy===userId && (
  <div>
    <Button onClick={handleEdit}>Edit button</Button>
    <Button onClick={confirmDelete}>Delete button</Button>
  </div>
 )}
  </>

  )
}

export default PostPage