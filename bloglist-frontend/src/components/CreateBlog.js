const CreateBlog = ({url,}) => {
    //const {handleLogin, setUsername, username, setPassword, password} = props
     return (
         <div>
             <form onSubmit={handleLogin}>
             <input value={password}  onChange={({target})=>setPassword(target.value)}></input>
             <button></button>
             </form>
         </div>
     )
 }
 
 export default CreateBlog