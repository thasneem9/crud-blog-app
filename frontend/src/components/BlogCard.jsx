import React from 'react'
import { Flex, HStack ,Box, Avatar,Text, Heading} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'
import {Routes,Route} from 'react-router-dom'

const BlogCard = ({author,text,title,updatedAt,postId}) => {

 console.log(postId)
 
const navigate=useNavigate()

const handleView=(postId)=>{
  navigate(`/post/${postId}`)
}

  const formattedDate = new Date(updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
   /*  hour: '2-digit',
    minute: '2-digit', */
  });
   
  
  return (
          <>
    
            <Box bg="gray.100" m="20px" width={"300px"} height={"300px"}  borderRadius="15px" onClick={()=>{handleView(postId)}} >
              <Flex flexDirection={"column"}>
              <HStack>
                <Avatar ml={"4px"} mt={"4px"}></Avatar>
              
                <Text fontSize={"20px"}>{author}</Text>
                <Text  mr={"2px"} ml={"50px"}>{formattedDate}</Text>
              </HStack>
              <Heading ml={"10px"}>{title}</Heading>
              <Text p={"10px"} >
                {text}
              </Text>
              </Flex>

            </Box>
 
            </>  
      
  )
}

export default BlogCard