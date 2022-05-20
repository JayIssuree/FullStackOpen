import { useState } from "react"

const Blog = ({blog, handleLike, handleDelete}) => {

  const [detailsVisible, setDetailsVisble] = useState(false)
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  return(
  <div style={{borderStyle: "solid", borderColor: "black", padding: "10px"}}>
    {blog.title}
    <button onClick={() => setDetailsVisble(true)} style={hideWhenVisible}> view </button>
    <button onClick={() => setDetailsVisble(false)} style={showWhenVisible}> hide </button>
    <div style={showWhenVisible}>
      url: {blog.url}
      <br/>
      likes: {blog.likes} <button onClick={() => handleLike(blog)}> like </button>
      <br/>
      author: {blog.author}
      <br/>
      <button onClick={() => handleDelete(blog.id)}> delete </button>
    </div>
  </div>
  )

}

export default Blog