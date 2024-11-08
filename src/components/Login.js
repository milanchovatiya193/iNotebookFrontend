import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login(props) {
    let history = useNavigate();
    const [credential, setCredential] = useState({email:"", password:""});
    const onChange = (e) => {
        setCredential({...credential, [e.target.name]: e.target.value})
      }
    const host = "https://inotebookbackend-07co.onrender.com";
    const handleSubmit = async (e) =>{
        e.preventDefault();
        let url = `${host}/api/auth/login`
        const response = await fetch(url, {
          method: "POST",
          headers: {'Content-Type': 'application/json'
          },

          body: JSON.stringify({email:credential.email, password:credential.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.token);
            history("/");
            props.showAlert("Successfully Logged In", "success");
        }
        else{
          props.showAlert("Invalid Credentials", "danger");
        }
    }
  return (
    <>
    <div className="container mt-2">
      <h3 className='my-1'>Login</h3>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" 
    id="email" name='email' aria-describedby="emailHelp" 
    value={credential.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" 
    id="password" name='password' value={credential.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
    </>
  )
}
