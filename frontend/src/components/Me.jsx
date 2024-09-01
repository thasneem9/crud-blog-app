import { Heading ,Flex,Text,Button} from '@chakra-ui/react'
import React from 'react'
import BlogCard from './BlogCard'
import {useNavigate} from'react-router-dom';
const Me = () => {
    const navigate=useNavigate()




    const handleCreate=()=>{
      navigate('/create');
      
    }
  
  return (
    <>
   <Flex flexDirection={"column"} >
    <Heading ml="40%">
My Posts
    </Heading>

    
    <Flex flexDirection={"row"}  wrap={"wrap"}>
    <BlogCard/>
    <BlogCard/>
    <BlogCard/>
    <BlogCard/>
    </Flex>
   

    </Flex>

    <Button  ml="80%" mb="20px" onClick={handleCreate}>Create Post</Button>

    </>
  )
}

export default Me