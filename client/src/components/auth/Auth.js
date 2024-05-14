import React, { useState } from 'react';
import Input from './Input';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
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
      </form>
    </>
  );
};

export default Auth;
