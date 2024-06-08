import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { FaLock } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, signin, signup } from '../redux/auth/authSlice';
import AuthForm from '../components/auth/AuthForm';
import SignUpSwitcher from '../components/auth/SignUpSwitcher';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmedPassword: '',
};

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticating, error } = useSelector((state) => state.auth);
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(getUser(tokenResponse.access_token));
      navigate('/');
    },
    onError: (err) => setMessage(err),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup({ formData, navigate }));
    } else {
      dispatch(signin({ formData, navigate }));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (isSignup && formData.confirmedPassword === formData.password) {
      setDisabled(false);
    } else if (isSignup) {
      setDisabled(true);
    }
  }, [isSignup, formData]);
  const switchSignup = () => {
    setIsSignup((prevSignup) => !prevSignup);
    setShowPassword(false);
  };
  return (
    <Card className="auth text-white text-center border-success m-auto" data-bs-theme="dark">
      {(isAuthenticating && 'Loading...') || error || message}
      <Card.Header><h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2></Card.Header>
      <Card.Body className="p-4">
        <FaLock size={30} className="text-danger" />
        <AuthForm
          handleSubmit={handleSubmit}
          isSignup={isSignup}
          disabled={disabled}
          handleChange={handleChange}
          googleLogin={googleLogin}
          showPassword={showPassword}
          handleShowPassword={() => setShowPassword((prev) => !prev)}
        />
      </Card.Body>
      <SignUpSwitcher isSignup={isSignup} switchSignup={switchSignup} />
    </Card>
  );
};

export default AuthPage;
