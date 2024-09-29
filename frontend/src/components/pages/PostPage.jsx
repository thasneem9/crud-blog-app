import { Flex, Heading, HStack, Image, Text, IconButton, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import userAtom from '../atoms/userAtom';
import { useToast } from '@chakra-ui/react';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaHeart } from 'react-icons/fa';
import { FaRegComment } from "react-icons/fa6";
import '../style.css'
const PostPage = () => {
  const date=new Date().getFullYear()
  const toast = useToast();
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const userId = user.userId;
  const [post, setPost] = useState(null);
  const { postId } = useParams();




const [liked,setLiked]=useState(false)
const [postData,setPostData]=useState(false)
  // Handle post editing
  const handleEdit = () => {
    navigate(`/editPost/${postId}`);
  };

  // Confirm and delete post
  const confirmDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (isConfirmed) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`/api/posts/deletePost/${postId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data) {
      toast({
        status: 'success',
        title: 'Deleted Post',
      });
      navigate('/'); // Redirect to home or another page after deletion
    } else if (data.error) {
      console.error('Error:', data.error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/getPost/${postId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (data) {
          setPost(data.post);
        
          setPostData(data)
          console.log(data)
          if(data.likeExists){
            setLiked(true)

          }else{
            setLiked(false)
          }
        }
      } catch (error) {
        console.error('Error fetching post details', error);
      }
    };

    getPost();
  }, [postId]);

  const fomattedDate = new Date(post?.createdAt).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleLike=async()=>{
   try {
  
    const res=await fetch(`/api/posts/like/${postId}`,{
      method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({userId})
    })
    const data = await res.json()
    console.log(data)
    if (data.alreadyLiked) {
      setLiked(true);  // Post has been liked
    } else {
      setLiked(false); // Post has been unliked
    }

   } catch (error) {
    console.log(error)
    
   }
  }


  useEffect(() => {
    if (postData && postData.likeExists !== undefined) {
      setLiked(postData.likeExists);
    }
  }, [postData]);
console.log(postData)
  // Fetch like status on component mount


  return (
    <>
      {post ? (
        <Flex flexDirection="column" maxW="800px" mx="auto" py="20px" px="10px" bg="white" boxShadow="md" borderRadius="8px">
            {/* Post Image */}
            {post?.img && (
            <Image
              src={`http://localhost:5000/${post?.img.replace(/\\/g, '/')}`}
              alt="Post Image"
              boxSize="100%"
              objectFit="contain"
              maxH="500px"
              mt="20px"
              borderRadius="8px"
              border="1px solid #E2E8F0"
            />
          )}
          <HStack justifyContent="space-between">
            <h1 className=" tangerine-regular-title-post" flex="1" fontSize="2xl" textAlign="center" noOfLines={1}>
              {post?.title}
            </h1>

            <HStack spacing="12px">
              {/* Edit and Delete Icons */}
              {post?.postedBy === userId && (
                <>
                 <CiEdit onClick={handleEdit} size={30}/>
                 <RiDeleteBin6Line onClick={confirmDelete} size={20}/>
                </>
              )}
              <Text>{fomattedDate}</Text>
            </HStack>
          </HStack>

        

          {/* Post Text */}
          <Text fontSize="18px" mt="20px" textAlign="justify" lineHeight="1.6" className='categories'>
            {post?.text}
          </Text>
        </Flex>
      ) : (
        <Box textAlign="center" mt="40px">
          <Text fontSize="xl">This post has been removed or is no longer available.</Text>
        </Box>
      )}

<Flex bg={''} ml="24%" flexDirection={"row"} gap="40px"  mt="10px">
<Flex flexDirection={'column'}>
    <svg
                    aria-label='Like'
                   
                     color={liked ? "rgb(237, 73, 86)" : ""} 
                     fill={liked ? "rgb(237, 73, 86)" : "transparent"} 
                    height='30'
                    role='img'
                    viewBox='0 0 24 22'
                    width='30'
                    onClick={handleLike}
                >
                    <path
                        d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
                        stroke='currentColor'
                        strokeWidth='2'
                    ></path>
    </svg> 
    <Text>{postData.likeCount} like</Text>
    </Flex>
    <FaRegComment size="30" />
</Flex>
      <Box  bg="gray.300"width={"100%"} height={"100px"} mb={"5px"} mt="60px">

      <p className='footer'> {date} © All Rights Reserved</p>
      
      </Box>
    </>
  );
};

export default PostPage;
