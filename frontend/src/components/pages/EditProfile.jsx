'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useState } from 'react'

export default  function EditProfile() {
const [name,setName]=useState('')
const [bio,setBio]=useState('')
const [username,setUsername]=useState('')

const newData={name,bio,username}
    //getEXISITING USERDETAILS to display as initial value

    //sendNewdetails
    console.log(newData)
   const handleSubmit=async()=>{
    try {
        res=await fetch('/api/users/editProfile',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(newData)
        })
        const data=await res.json()
       console.log(data,"editedInfo")
        
    } catch (error) {
        console.error("error in editing profile",error)
        
    }
   }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            onChange={(e)=>setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="bio" isRequired>
          <FormLabel>Bio</FormLabel>
          <Input
            placeholder="Templatebio"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            onChange={(e)=>setBio(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            onChange={(e)=>setBio(e.target.value)}
          />
        </FormControl>
       
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}>
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            onClick={handleSubmit}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}