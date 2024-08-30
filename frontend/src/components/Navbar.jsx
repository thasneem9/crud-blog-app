import React from 'react'
import { Container, Heading, Text ,Flex,Button,HStack,Spacer} from '@chakra-ui/react'
import { CgProfile } from "react-icons/cg";
import { LuPlusSquare } from "react-icons/lu";
const Navbar = () => {
  return (
    <Flex as="nav"  p="10">
      <Heading>Blog Daily</Heading>
      <Spacer></Spacer>

      <HStack gap='20px'>
        <Button>BD</Button>
        <Text>blogdaily@gmail.com</Text>
        <CgProfile size="30px" />
        <LuPlusSquare size="30px"  />
        

      </HStack>


    </Flex>
    
  )
}

export default Navbar
























/* <Flex p="10">
  
    <Heading  > Mojo Tasks</Heading>
    <Spacer/>

    <HStack spacing="20px">
    <Button colorScheme='purple'>Logout</Button>
    <Text >mojo@gmail.com</Text>
    </HStack>


  </Flex> */