import React from 'react'
import { Flex,Container, HStack ,Box,Heading,Image,Text, Divider} from '@chakra-ui/react'
import { wrap } from 'framer-motion'
import BlogCard from './BlogCard'
import LatestPost from './LatestPost'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Input, InputGroup, InputLeftElement, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
const BlogContainer = () => {
  const [posts,setPosts]=useState([])

  const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
  
    const handleSearch = () => {
    // Trigger the parent function to handle search
    };
  }
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
    <>
    <Box width="50%" px="20px" my="10px" ml="30%">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search posts, users, or topics..."
          value={""}
          onChange={(e) => setQuery(e.target.value)}
          borderRadius="10px"
          bg="white"
          boxShadow="md"
            focusBorderColor="none"
        />
        <IconButton
          icon={<SearchIcon />}
          onClick={""}
          aria-label="Search"
          ml="5px"
          color="pink"
          borderRadius="full"
        />
      </InputGroup>
    </Box>
    <Flex w="100%" justify="space-between" align="center">
  <Text className='categories-recent' ml="90">Recent posts</Text>
  <Divider flex="1" ml={10} mr={10} />
</Flex>


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
    
    </>
  )
 
}

export default BlogContainer