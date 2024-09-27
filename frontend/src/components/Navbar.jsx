import React from 'react'
import { Container, Heading, Text ,Flex,Button,HStack,Spacer} from '@chakra-ui/react'
import { CgProfile } from "react-icons/cg";
import { LuPlusSquare } from "react-icons/lu";
import {useNavigate} from'react-router-dom';
import { IoMdHome } from "react-icons/io";
import blog from './blog.svg'


const Navbar = () => {
  const navigate=useNavigate()




  const handleNavigate=()=>{
    navigate('/auth');
    
  }
  const handleBlog=()=>{
    navigate('/me');
    
  }
  const handleProfileEdit=()=>{
    navigate('/editProfile')
  }
const handleHome=()=>{
  navigate('/')
}

  return (
    
    <Flex as="nav"  p="10">
      <Heading>Blog Daily</Heading>
      <Spacer></Spacer>

      <HStack gap='20px'>
       
    
        <img src={blog} alt="Blog" width="70" height="70"  onClick={handleBlog} />
        <Button onClick={handleNavigate}>Login</Button>
        <CgProfile size="30px" onClick={handleProfileEdit}/>
        <IoMdHome  onClick={handleHome} />
        

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