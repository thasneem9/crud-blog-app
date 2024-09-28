import React from 'react'
import { Flex, HStack, Box, Text, Heading, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ author, text, title, updatedAt, postId, img }) => {

  const navigate = useNavigate()

  const handleView = (postId) => {
    navigate(`/post/${postId}`)
  }

  const formattedDate = new Date(updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Function to truncate text at the last space before MAX_LENGTH
  const MAX_LENGTH = 200;
  const truncateText = (text) => {
    if (text.length <= MAX_LENGTH) return text;

    const trimmedText = text.substring(0, MAX_LENGTH);
    const lastSpaceIndex = trimmedText.lastIndexOf(' ');

    return lastSpaceIndex > 0 ? trimmedText.substring(0, lastSpaceIndex) + '..[Read More]' : trimmedText + '...';
  };

  return (
    <>
      <Box
        bg="white"
        m="20px"
        ml={{ base: "20px", md: "50px" }}  // Responsive margin
        p="20px"
        width={{ base: "100%", md: "350px" }}  // Responsive width
        borderRadius="15px"
        onClick={() => handleView(postId)}
        boxShadow="lg"
        _hover={{ transform: 'scale(1.05)', transition: '0.3s ease' }}
        cursor="pointer"
       /*  backgroundColor={"pink.100"} based on category */
       
      >
        {/* Conditionally Render the Image */}
        {img && (
          <Box overflow="hidden" borderRadius="10px" mb="10px">
            <Image
              src={`http://localhost:5000/${img.replace(/\\/g, '/')}`}
              alt="Post Image"
              borderRadius="10px"
              width="100%"   // Full width of the container
              height="150px" // Adjust height for rectangle shape
              objectFit="cover"
              transition="transform 0.4s ease" // Smooth transition for zoom effect
              _hover={{ transform: 'scale(1.2)' }} // Zoom effect on hover
           
              />
          </Box>
        )}

        <Flex flexDirection={"column"} justifyContent="space-between">
          <HStack justifyContent="space-between" mb="10px">
            <Text className='categories' fontWeight={"bold"} fontSize={"16px"} color="gray.700">{author}</Text>
            <Text className='categories' fontSize={"14px"} color="gray.500">{formattedDate}</Text>
          </HStack>
          <h1 className='categories-bold' size="md" color="blue.700" mb="10px">{title}</h1>
          <Text className='categories' color="gray.600" lineHeight="1.6">
            {truncateText(text)}
          </Text>
        </Flex>
      </Box>
    </>
  )
}

export default BlogCard

