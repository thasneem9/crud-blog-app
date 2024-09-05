import React from 'react'
import { Flex, HStack ,Box, Avatar,Text} from '@chakra-ui/react'


const BlogCard = () => {

  
  return (
          <>
    
            <Box bg="gray.100" m="20px" width={"300px"} height={"300px"}  borderRadius="15px">
              <Flex flexDirection={"column"}>
              <HStack>
                <Avatar ml={"4px"} mt={"4px"}></Avatar>
              <Flex flexDirection={"column"}>
                <Text fontSize={"20px"}>Title</Text>
                
               <Flex flexDirection={"row"}>
               <Text>Author</Text>

               <Text  mr={"0px"} ml={"50px"}>dd-mm-yy</Text>
               </Flex>

              </Flex>
              </HStack>

              <Text p={"10px"}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus quis perspiciatis sed fuga natus excepturi deserunt totam temporibus, aliquam accusantium!
              </Text>
              </Flex>

            </Box>
 
            </>  
      
  )
}

export default BlogCard