import { Flex, Heading, HStack, Image, Text, IconButton, VStack, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import userAtom from '../atoms/userAtom';
import { useToast } from '@chakra-ui/react';

const PostPage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const userId = user.userId;
  const [post, setPost] = useState(null);
  const { postId } = useParams();

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

  return (
    <>
      {post ? (
        <Flex flexDirection="column" maxW="800px" mx="auto" py="20px" px="10px" bg="white" boxShadow="md" borderRadius="8px">
          <HStack justifyContent="space-between">
            <Heading as="h1" flex="1" fontSize="2xl" textAlign="center" noOfLines={2}>
              {post?.title}
            </Heading>

            <HStack spacing="12px">
              {/* Edit and Delete Icons */}
              {post?.postedBy === userId && (
                <>
                  <IconButton
                    icon={<EditIcon />}
                    onClick={handleEdit}
                    variant="outline"
                    colorScheme="blue"
                    aria-label="Edit post"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    onClick={confirmDelete}
                    variant="outline"
                    colorScheme="red"
                    aria-label="Delete post"
                  />
                </>
              )}
              <Text>{fomattedDate}</Text>
            </HStack>
          </HStack>

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

          {/* Post Text */}
          <Text fontSize="18px" mt="20px" textAlign="justify" lineHeight="1.6">
            {post?.text}
          </Text>
        </Flex>
      ) : (
        <Box textAlign="center" mt="40px">
          <Text fontSize="xl">This post has been removed or is no longer available.</Text>
        </Box>
      )}
    </>
  );
};

export default PostPage;
