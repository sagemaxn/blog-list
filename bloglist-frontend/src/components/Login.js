const Login = (props) => {
   const {handleLogin, setUsername, username, setPassword, password} = props
    return (
        <div>
            <form onSubmit={handleLogin}>
            <input value={username}  onChange={({target})=>setUsername(target.value)}></input>
            <input value={password}  onChange={({target})=>setPassword(target.value)}></input>
            <button>Login</button>
            </form>
        </div>
    )
}

export default Login
