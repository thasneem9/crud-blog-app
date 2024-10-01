import React from 'react'
import { Container, Heading, Text ,Flex,Button,HStack,Spacer, Divider, Box} from '@chakra-ui/react'
import { CgProfile } from "react-icons/cg";
import { LuPlusSquare } from "react-icons/lu";
import {useNavigate} from'react-router-dom';
import { IoMdHome } from "react-icons/io";
import blog from './blog.svg'
import './style.css'
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineArrowDropDown } from "react-icons/md";


const Navbar = () => {
  const navigate=useNavigate()

  const [categories, setCategories] = useState([]);


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

const handleCategoryNavigate=(categoryName)=>{
  navigate(`/category/${categoryName}`)
}


 const fetchCategories=async()=>{
  const res=await fetch('/api/posts/fetchCategories',{
    method:'GET',
    headers:{'Content-Type':'application/json'}
  })
  const data= await res.json()
  console.log(data)
  if (data.categories) {
    setCategories(data.categories.filter(cat => cat.category)); // Filter out any null or empty categories
  }


} ;


//whenvr user adds a category, it shud appear in the other hamburger dropdown.
//1. user addds posts withcategory.
//click on category>fetch post wherecategory:category (pas to body the category selected)
//3 default, extra will be added under dropdown.
//onClicking tech, go to category/tech, category/science, category/dogs, HENCE category/:name, name needs to be the what user clicked clicked.
//prevsily, user clicks randompost, from blogcard, blogcard has own postid 

//-------------------plan:
//here eachcat has own name, so if click x, name i sx.. so render names of category first. in a loop, like u renderd all posts.>>>1) fetchCategory!!
//2 render each category as a list in hambruyger
//3>>onclick navigate to the :name and render catpage, 4>>display all posts in that categroy

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


    <HStack gap={"60px"}>
  <Flex mt="10px" ml={"30%"} gap="50px" mb={"10px"} _focus={{ outline: "none" }}>
    <Text 
      fontSize={"x-large"} 
      className='categories' 
      color="pink" 
      onClick={() => handleCategoryNavigate("Technology")} 
      _focus={{ outline: "none" }} 
      tabIndex={-1} 
      userSelect="none"   // Prevent text selection and blinking cursor
    >
      Technology
    </Text>
    <Text 
      fontSize={"x-large"} 
      className='categories' 
      color="black" 
      onClick={() => handleCategoryNavigate("Science")} 
      _focus={{ outline: "none" }} 
      tabIndex={-1} 
      userSelect="none"   // Prevent text selection and blinking cursor
    >
      Science
    </Text>
    <Text 
      fontSize={"x-large"} 
      className='categories' 
      color="black" 
      onClick={() => handleCategoryNavigate("Psychology")} 
      _focus={{ outline: "none" }} 
      tabIndex={-1} 
      userSelect="none"   // Prevent text selection and blinking cursor
    >
      Psychology
    </Text>
  <Menu>
          <MenuButton as={Text} fontSize={"x-large"} color="black" onClick={fetchCategories}   _focus={{ outline: "none" }} className='categories'  _focus={{ outline: "none" }} 
      tabIndex={-1} 
      userSelect="none" >
            More
           
          </MenuButton>
          <MenuList placement="bottom-start"> {/* Ensures the menu is directly under the button */}
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <MenuItem key={index} onClick={() => handleCategoryNavigate(cat.category)}>
                  {cat.category}
                </MenuItem>
              ))
            ) : (
              <MenuItem>No categories available.</MenuItem>
            )}
          </MenuList>
       </Menu>
  
</Flex>


<Menu>
      <MenuButton as={GiHamburgerMenu }  size="30px"  icon={<HamburgerIcon />} mr={"30%"} color={"pink"} bg=""/>
      <MenuList ml={"1100px"} mt={"200px"}>
        <MenuItem className='categories'  onClick={handleHome}>Home</MenuItem>
        <MenuItem className='categories'>Categories</MenuItem>
        <MenuItem className='categories' onClick={handleNavigate} >Login/Signup</MenuItem>
        <MenuItem className='categories' onClick={handleProfileEdit}>Profile</MenuItem>
        <MenuItem  className='categories' onClick={handleBlog}>Your Posts</MenuItem>
        <MenuItem  className='categories' onClick={handleBlog}>Liked posts</MenuItem>
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