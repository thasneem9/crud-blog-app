import React from 'react'
import { Container, Heading, Text ,Flex,Button,HStack,Spacer, Divider} from '@chakra-ui/react'
import { CgProfile } from "react-icons/cg";
import { LuPlusSquare } from "react-icons/lu";
import {useNavigate} from'react-router-dom';
import { IoMdHome } from "react-icons/io";
import blog from './blog.svg'
import './style.css'
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { GiHamburgerMenu } from "react-icons/gi";
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
    <>
    
    < Flex as="nav"  mt={"10px"} alignItems={"center"} ml={"40%"}>
       <h1 className='tangerine-regular .tangerine-bold' >
      <Text as="span" color="pink">B</Text>
      <Text as="span" color="black">log</Text>
      <Text as="span" color="pink"> D</Text>
      <Text as="span" color="black">aily</Text>
    </h1>
  
    </Flex>
    <hr borderColor={"black"} borderWidth={"0.5px"} ></hr>


    <HStack gap={"400px"}>
    <Flex mt="10px" ml={"35%"}  gap="50px" mb={"10px"}>
  <Text fontSize={"x-large"} className='categories' color="pink">Technology</Text>
  <Text  fontSize={"x-large"}  className='categories' color="black">Science</Text>
  <Text fontSize={"x-large"}  className='categories' color="black">Psychology</Text>
</Flex>

<Menu>
      <MenuButton as={GiHamburgerMenu }  size="30px"  icon={<HamburgerIcon />} ml={"40%"} color={"pink"} bg=""/>
      <MenuList ml={"1200px"} mt={"200px"}>
        <MenuItem className='categories'  onClick={handleHome}>Home</MenuItem>
        <MenuItem className='categories'>Categories</MenuItem>
        <MenuItem className='categories'>Your Posts</MenuItem>
        <MenuItem className='categories' onClick={handleNavigate} >Login/Signup</MenuItem>
        <MenuItem className='categories' onClick={handleProfileEdit}>Profile</MenuItem>
        <MenuItem  className='categories' onClick={handleBlog}>Your Posts</MenuItem>
      </MenuList>
    </Menu>
    </HStack>
<hr ></hr>


      {/* <Spacer></Spacer>

      <HStack gap='20px'>
       
    
        <img src={blog} alt="Blog" width="70" height="70"   onClick={handleBlog}/>
        <Button onClick={handleNavigate}>Login</Button>
        <CgProfile size="30px" onClick={handleProfileEdit}/>
        <IoMdHome size="30px"  onClick={handleHome} />
        

      </HStack>
 */}

    </>
    
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