const LoginForm = (props) => (
    <form onSubmit={props.onSubmit}>
      <div>
        username
          <input
          id="username"
          type="text"
          value={props.username}
          name="Username"
          onChange={({target}) => props.onUsernameChange(target.value)}
        />
      </div>
      <div>
        password
          <input
          id="password"
          type="password"
          value={props.password}
          name="Password"
          onChange={({target}) => props.onPasswordChange(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>      
  )

  export default LoginForm