import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../redux/auth/authSlice';
import Input from './Input';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(getUser(tokenResponse.access_token));
      navigate('/');
    },
    onError: () => setLoginFailed(true),
  });
  const handleSubmit = () => {

  };
  const handleChange = () => {

  };
  const switchSignup = () => {
    setIsSignup((prevSignup) => !prevSignup);
    setShowPassword(false);
  };
  return (
    <>
      {loginFailed && (
        <span>
          Google Login failed! Please, try again or login using your email.
        </span>
      )}
      <h1>{isSignup ? 'Sign Up' : 'Sign In'}</h1>
      lock icon
      <button type="button" onClick={switchSignup}>
        {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
      <form
        onSubmit={handleSubmit}
      >
        {isSignup && (
          <Input
            name="username"
            placeholder="John Doe"
            handleChange={handleChange}
            type="username"
          />
        )}
        <Input
          name="email"
          placeholder="johndoe@gmail.com"
          handleChange={handleChange}
          type="text"
        />
        <Input
          name="password"
          placeholder="password"
          handleChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          handleShowPassword={handleShowPassword}
        />
        {isSignup && (
          <Input
            name="confirmPassword"
            placeholder="Confirm your password"
            handleChange={handleChange}
            type="password"
          />
        )}
        <button type="submit">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </button>
        <button
          type="button"
          onClick={() => googleLogin()}
        >
          Sign in with Google 🚀
        </button>
      </form>
    </>
  );
};

export default Auth;
