const BlogForm = (props) => (
    <form onSubmit={props.onSubmit}>
      <p>
        Title:
        <input
          type="text"
          value={props.title}
          onChange={({target}) => props.onTitleChange(target.value)}
        />
      </p>
      <p>
        Author:
        <input
          type="text"
          value={props.author}
          onChange={({target}) => props.onAuthorChange(target.value)}
        />
      </p>
      <p>
        Url:
        <input
          type="text"
          value={props.url}
          onChange={({target}) => props.onUrlChange(target.value)}
        />
      </p>
      <button type="submit">create</button>
    </form>  
  )

export default BlogForm