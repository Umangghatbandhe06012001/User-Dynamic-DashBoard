import React, { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { validateLogin } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginStyle from '../style/LoginPage.module.css';


import { login} from '../redux/slices/authenticationslice';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  




  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      await dispatch(validateLogin({ email, password })).unwrap();
      toast.success('Login successful!');
      dispatch(login());
      navigate('/users'); 
      
    } catch (err: any) {
      setError(err.message || 'Login failed');
      toast.error(err.message || 'Login failed');
    }
  }

  return (
    <div id={LoginStyle.LoginContainer}>
      <div style={{width:'100%',textAlign:'center'}}><h3 id={LoginStyle.WebSiteHeading}>Welcome To Dynamic Dashboard Application</h3></div>
      <div id={LoginStyle.LoginPageWrapper}>
      <h2 id={LoginStyle.LoginHeading}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={LoginStyle.LoginSections}>
          <label className={LoginStyle.LoginLabel}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            className={LoginStyle.InpLogin}
          />
        </div>
        <div className={LoginStyle.LoginSections}>
          <label className={LoginStyle.LoginLabel}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            className={LoginStyle.InpLogin}
          />

          
        </div>
        <div style={{height:'.9rem',width:'100%'}}>{error && <p style={{ padding:'0rem 1.8rem',color: 'red' ,textAlign:'left'}}>{error}</p>}</div>
        <div className={LoginStyle.LoginBtnWrapper}><button type="submit" className={LoginStyle.LoginBtn}>Login</button></div>

      </form>
      <ToastContainer />
    </div>
    </div>
    
  );
};

export default LoginPage;
