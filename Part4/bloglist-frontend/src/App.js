import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
  }
}

const handleLogout = () => {
  setUser(null)
  window.localStorage.clear()
}

const handleTitleChange = (value) => {
  setTitle(value)
}

const handleAuthorChange = (value) => {
  setAuthor(value)
}

const handleUrlChange = (value) => {
  setUrl(value)
}

const handleBlogSubmit = async(event) => {
  event.preventDefault()
  const newBlog = {
    title: title,
    author: author,
    url: url
  }
  const blogResponse = await blogService.create(newBlog)
  setBlogs(blogs.concat(blogResponse))
  setTitle("")
  setAuthor("")
  setUrl("")
}

const handleLike = (blog) => {
  blog.likes++
  blog.user = null
  blogService.update(blog.id, blog)
  setBlogs(blogs.map(mBlog => mBlog.id === blog.id ? blog : mBlog))
}

const handleDelete = (blogid) => {
  blogService.remove(blogid)
  setBlogs(blogs.filter(blog => blog.id !== blogid))
}

const displayBlogs = () => {
  if(user !== null){
    return(
      <div>
        <h2>blogs</h2>
        <p> {user.name} logged in <button onClick={handleLogout}>logout</button>  </p>
          {blogs.map(blog =>
            <Blog 
              key={blog.id} blog={blog} 
              handleLike={(blog) => handleLike(blog)}
              handleDelete={(blogid) => handleDelete(blogid)}
            />
          )}
        <BlogForm 
          title={title}
          onTitleChange={(value) => handleTitleChange(value)}
          author={author}
          onAuthorChange={(value) => handleAuthorChange(value)}
          url={url}
          onUrlChange={(value) => handleUrlChange(value)}
          onSubmit={handleBlogSubmit}
        />
      </div>
    )
  }
}

  return (
    <div>
      {user === null && 
      <LoginForm 
        onSubmit={handleLogin} 
        username={username} 
        onUsernameChange={(username) => setUsername(username)}
        password={password}
        onPasswordChange={(password) => setPassword(password)}
      />}
      {displayBlogs()}
    </div>
  )
}

export default App
