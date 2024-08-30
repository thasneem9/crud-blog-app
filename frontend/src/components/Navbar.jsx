import React from 'react'
import { Container, Heading, Text ,Flex,Button,HStack,Spacer} from '@chakra-ui/react'
import { CgProfile } from "react-icons/cg";
import { LuPlusSquare } from "react-icons/lu";
import {useNavigate} from'react-router-dom';




const Navbar = () => {
  const navigate=useNavigate()




  const handleNavigate=()=>{
    navigate('/auth');
    
  }


  return (
    
    <Flex as="nav"  p="10">
      <Heading>Blog Daily</Heading>
      <Spacer></Spacer>

      <HStack gap='20px'>
        <Button>BD</Button>
        <Text>blogdaily@gmail.com</Text>
        <CgProfile size="30px" />
        <Button onClick={handleNavigate}>Login</Button>
        

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