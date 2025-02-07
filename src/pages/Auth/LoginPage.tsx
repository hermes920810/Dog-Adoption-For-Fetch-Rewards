import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { login } from '../../services';
import { AppDispatch } from '../../store';
import { loginSuccess } from '../../slices/authSlice';
import {
  AppContainer,
  FormContainer,
  LoginForm,
  SocialContainer,
  SocialLink,
  FormInput,
  FormLink,
  LoginButton,
  OverlayContainer,
  OverlaySection,
  OverlayPanel
} from "../../common";

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(name, email);
      dispatch(loginSuccess({ name, email }));
      navigate('/search');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box className="auth-layout">
      <h2>Sign in</h2>
      <AppContainer>
        <FormContainer>
          <LoginForm onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <SocialContainer>
              <SocialLink href="#">
                <i className="fab fa-facebook-f" />
              </SocialLink>
              <SocialLink href="#">
                <i className="fab fa-google-plus-g" />
              </SocialLink>
              <SocialLink href="#">
                <i className="fab fa-linkedin-in" />
              </SocialLink>
            </SocialContainer>
            <Box>or use your account</Box>
            <FormInput
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            <FormLink href="#">Forgot your password?</FormLink>
            <LoginButton>Sign In</LoginButton>
          </LoginForm>
        </FormContainer>
        <OverlayContainer>
          <OverlaySection>
            <OverlayPanel>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
            </OverlayPanel>
          </OverlaySection>
        </OverlayContainer>
      </AppContainer>
    </Box>
  )
};

export default LoginPage;
