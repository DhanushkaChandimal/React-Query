import AddPostForm from './AddPostForm'
import './App.css'
import UserPosts from './components/UserPosts'
import Posts from './Post'

function App() {

  return (
    <>
      <Posts/>
      <AddPostForm/>
      <UserPosts userId={1}/>
    </>
  )
}

export default App
