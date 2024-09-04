'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'

import { useRecoilState } from 'recoil'
import {  useState } from 'react'
import authScreenAtom from './atoms/authScreenAtom.js'
import { useAuth } from './context/AuthContext.jsx'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom.js'

export default function LoginCard() {

  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const userInfo={username,password}
  const [authScreen,setAuthScreen]=useRecoilState(authScreenAtom)
  const { setIsAuthenticated } = useAuth();

  const user = useRecoilValue(userAtom);

  const handleSubmit=async ()=>{

try {
  console.log("TYPED USERNAME:",userInfo.username)
  const res=await fetch('/api/users/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(userInfo)
})
const data= await res.json()
  if(data.isMatch){
    console.log("DATA",data)
  
  
    setIsAuthenticated(true);
    localStorage.setItem("user-blog",JSON.stringify(data))


  

  
  }else{
    console.log("Sorry incorect credentials",data)
   
    
  }
    
} catch (error) {
  console.error(error)

  
}
   
    
  }
 
 
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>username</FormLabel>
              <Input type="email" onChange={(e)=>setUsername(e.target.value)} value={username}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e)=>{setPassword(e.target.value)}}value={password} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}>
                Sign in
              </Button>

            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don't have an account? <Link color={'blue.400'}
                onClick={()=>setAuthScreen("signup")}>
                  Signup</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}