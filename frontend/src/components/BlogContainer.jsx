import React from 'react'
import { Flex,Container, HStack ,Box,Heading,Image,Text, Divider,VStack} from '@chakra-ui/react'
import { wrap } from 'framer-motion'
import BlogCard from './BlogCard'
import LatestPost from './LatestPost'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {  Input, InputGroup, InputLeftElement, IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
const BlogContainer = () => {
  const [posts,setPosts]=useState([])
  const [query, setQuery] = useState('');
  const [results,setResults]=useState([])
const date=new Date().getFullYear()
 const handleSearch=async()=>{
 try {
  const res=await fetch(`/api/posts/search?title=${query}`,{
    method:'GET',
    headers:{'Content-Type':'ápplication/json'}
  })
  const searchResults=await res.json()
  console.log(searchResults)
  setResults(searchResults)
 
  
 } catch (error) {
console.log(error)
  
 }

 }
 useEffect(() => {
  console.log(results); // Logs the updated results
}, [results]); // Runs this effect when results change
 //-------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!NEXT STEPP
 //render a flex if searchresults exist, else render no result found. in the flex display blogCard component with new searchResults data
 
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

console.log(results)





  return (
    <>
      
    <Box width="50%" px="20px" my="10px" ml="30%">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          placeholder="Search posts, users, or topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          borderRadius="10px"
          bg="white"
          boxShadow="md"
            focusBorderColor="none"
        />
        <IconButton
          icon={<SearchIcon />}
          onClick={handleSearch}
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
<Flex flexBasis="960px" m="30px" bg="" flexDirection={["column", "column", "row"]}>
  <Flex bg="" wrap={"wrap"}>
    {results?.length > 0 ? (
      results.map((result) => (
        <BlogCard 
          key={result.id}
          postId={result.id}
          author={result.author} 
          text={result.text} 
          title={result.title}
          img={result.img} 
          category={result.category}
          postedBy={result.postedBy} 
          updatedAt={result.updatedAt}
        />
      ))
    ) : (
      <p></p>
    )}
  </Flex>
</Flex>

{results?.length === 0 && ( // Show posts only if no results are found
  <Flex flexBasis="960px" m="30px" bg="" flexDirection={["column", "column", "row"]}>
    <Flex bg="" wrap={"wrap"}>
      {posts?.length > 0 ? (
        posts.map((post) => (
          <BlogCard 
            key={post.id}
            postId={post.id}
            author={post.author} 
            text={post.text} 
            title={post.title}
            img={post.img} 
            category={post.category}
            postedBy={post.postedBy} 
            updatedAt={post.updatedAt}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </Flex>
  </Flex>
)}

<Box  bg="gray.300"width={"100%"} height={"100px"} mb={"20px"}>

<p className='footer'> {date} © All Rights Reserved</p>

</Box>

    
    </>
  )
 
}

export default BlogContainer