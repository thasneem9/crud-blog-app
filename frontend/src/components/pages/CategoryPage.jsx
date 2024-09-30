import React from 'react'
import BlogCard from '../BlogCard'
import { useParams } from 'react-router-dom'
import { Text,HStack ,Flex} from '@chakra-ui/react'
import { useEffect,useState } from 'react'
const CategoryPage = () => {
   

    const {categoryName}= useParams();
    const [categoryPosts,setCategoryPosts]=useState([])

    useEffect(()=>{
      const getCategoryPosts=async()=>{
        try {
          const res=  await fetch(`/api/posts/getCategoryPosts/${categoryName}`,{
            method:'GET',
            headers:{"Content-Type":'application/json'},
        
          })
          const data= await res.json()
          console.log(data)
          setCategoryPosts(data)
          console.log(categoryPosts)
        } catch (error) {
          console.error("error in fetching posts",error)
          
        }
      }
    getCategoryPosts()
    
    },[categoryName])

  return (
    <>
    <h1 className='tangerine-regular .tangerine-bold' style={{fontSize:"50px",textAlign:"center", padding:"20px"}} >
    <Text as="span" color="black">Posts    under  </Text>
    <Text as="span" color="pink">  {categoryName}</Text>
  </h1>

   
  {categoryPosts?.posts?.length > 0 ? ( 
  // Show posts only if results are found
  <Flex flexBasis="960px" m="30px" flexDirection={["column", "column", "row"]}>
    <Flex wrap={"wrap"}>
      {categoryPosts.posts.map((post) => (
        <BlogCard 
          key={post.id}
          postId={post.id}
          author={post.author} 
          text={post.text} 
          title={post.title}
          img={post.img} 
          category={post.category}
          postedBy={post.postedBy} 
          updatedAt={post.updatedAt}
        />
      ))}
    </Flex>
  </Flex>
) : (
  // Show 'No posts available' if there are no posts
  <p className='categories' style={{textAlign:"center",fontSize:"30px" , padding:"70px"}}>No posts available under category "{categoryName}"</p>
)}

    
    
    </>
  )
}

export default CategoryPage