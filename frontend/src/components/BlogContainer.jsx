import React from 'react'
import { Flex,Container, HStack ,Box,Heading} from '@chakra-ui/react'
import { wrap } from 'framer-motion'
import BlogCard from './BlogCard'
import LatestPost from './LatestPost'


const BlogContainer = () => {
  return (
    <Flex flexBasis="960px" m="30px" bg="pink.100"   flexDirection={["column", "column", "row"]}  >
     
       
       
     <Flex  bg="blue.100" flexBasis="1200px" wrap={"wrap"}>
     <BlogCard/>
     <BlogCard/>
     <BlogCard/>
     <BlogCard/>
     <BlogCard/>
     <BlogCard/>
     </Flex>
       
   
        <Flex bg="yellow.100" flexBasis={"400px"} ml="50px"  flexDirection={"column"}>
        <Heading ml="60px">Popular posts</Heading>
       
           <LatestPost/>
           <LatestPost/>

           
        </Flex>
        
    </Flex>
  
  )
}

export default BlogContainer