import React from 'react'
import { Flex, HStack ,Box, Avatar,Text} from '@chakra-ui/react'


const BlogCard = ({author,text,title,updatedAt}) => {

  
  return (
          <>
    
            <Box bg="gray.100" m="20px" width={"300px"} height={"300px"}  borderRadius="15px">
              <Flex flexDirection={"column"}>
              <HStack>
                <Avatar ml={"4px"} mt={"4px"}></Avatar>
              <Flex flexDirection={"column"}>
                <Text fontSize={"20px"}>{title}</Text>
                
               <Flex flexDirection={"row"}>
               <Text>{author}</Text>

               <Text  mr={"0px"} ml={"50px"}>{updatedAt}</Text>
               </Flex>

              </Flex>
              </HStack>

              <Text p={"10px"}>
                {text}
              </Text>
              </Flex>

            </Box>
 
            </>  
      
  )
}

export default BlogCard