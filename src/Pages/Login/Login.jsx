import React from "react";
import { Input, Button } from "../../components/component.js";

const Login = () => {
  const [emain, setEmain] = useState("")
  const [pass, setPass] = useState("")

  const loginHandler = () => {
    e.preventDefault();
            console.log(name, email, pass);
    
            axios.post('http://localhost:3000/api/register', {
                name: name,
                email: email,
                password: pass,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
  }
  return (
    <>
      <div className='loginForm flex items-center justify-center h-screen'>
        <div className='registerForm flex flex-col items-center gap-4'>
          <form className='bg-zinc-50 px-4 py-4 flex flex-col gap-6'>
            <Input label='Email' type='email' placeholder='Enter your email'  />
            <Input
              label='Password'
              type='password'
              placeholder='Enter your password'
            />
            <Button type='submit'>Login</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
