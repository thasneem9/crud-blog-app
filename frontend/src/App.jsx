import Navbar from './components/Navbar'
import BlogContainer from './components/BlogContainer'
import {Routes,Route} from 'react-router-dom'
import AuthPage from './components/pages/AuthPage.jsx'
import { useAuth } from './components/context/AuthContext.jsx'
import Me from './components/Me.jsx'
import MyEditor from './components/MyEditor.jsx'
import PostPage from './components/pages/PostPage.jsx'
function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
    
    <Navbar></Navbar>
   

    <Routes>
    <Route path='/' element={ isAuthenticated?<BlogContainer/>:<AuthPage/>}/>

    <Route path='/auth' element={<AuthPage/>}/>
    <Route path='/me' element={<Me/>}/>
    <Route path='/create' element={<MyEditor/>}/>
    <Route path='/post/:postId' element={<PostPage />}/>
    </Routes>

    </>

   
    
  )
}

export default App
