'use client'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import authScreenAtom from './atoms/authScreenAtom.js'
import { useRecoilState } from 'recoil'
import { useAuth } from './context/AuthContext.jsx'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom.js'

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false)
 const [username,setUsername]=useState('')
 const [name,setName]=useState('')
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')

  const userInfo={username,password,email,name}
  const [authScreen,setAuthScreen]=useRecoilState(authScreenAtom)
  const { setIsAuthenticated } = useAuth();
  
  const user = useRecoilValue(userAtom);


  

  const handleSignup=async ()=>{
    //take values and pas it to backend
    //need api endpoints
    //need server.js
    console.log("userinfo:",userInfo)
    try {
     const res= await fetch("/api/users/signup",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(userInfo)
      })
      const data= await res.json()
console.log("data recived:",data)
setIsAuthenticated(true);
//this is for posts,to get author, we need it:
localStorage.setItem("user-blog",JSON.stringify(data))

console.log("++++",user)
console.log("++++",user.data.name)


      
    } catch (error) {
      console.log("error in signup client",error)
      
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" onChange={(e)=>setUsername(e.target.value)} required value={username}/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>name</FormLabel>
                  <Input type="text" onChange={(e)=>setName(e.target.value)} required value={name}/>
                </FormControl>
              </Box>
             
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email"  onChange={(e)=>setEmail(e.target.value)} required value={email}/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}  onChange={(e)=>setPassword(e.target.value)} required value={password}/>
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSignup}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}   onClick={()=>setAuthScreen("login")}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}