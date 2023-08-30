import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  width: 320px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;
  border-radius: 10px;
`;

const FormTitle = styled.h2`
  margin-bottom: 15px;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 5px;
`;

const PasswordContainer = styled.div`
  position: relative;
`;

const PasswordInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 5px;
`;

const EyeIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${({ showPassword }) => (showPassword ? '#007bff' : '#ccc')};
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  width: 100%;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ToggleLink = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: #007bff;
`;

const Message = styled.p`
  margin-top: 10px;
  color: ${({ error }) => (error ? 'red' : '#333')};
`;

function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        // User is registering
        await axios.post('http://localhost:3000/api/register', { username, password, name, email });
        setMessage('Registration successful. Please log in.');
        setIsRegistering(false); // Switch back to login mode
      } else {
        // User is logging in
        const response = await axios.post('http://localhost:3000/api/login', { username, password });
        const authToken = response.data.token;
        localStorage.setItem('authToken', authToken);
        setMessage(`Welcome, ${username}!`);
        navigate('/shorten');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setMessage('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <FormWrapper>
        <FormTitle>LogIn/SignUp</FormTitle>
        <form onSubmit={handleSubmit}>
            <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordContainer>
            <PasswordInput
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Add the eye icon button */}
            <EyeIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </EyeIcon>
            </PasswordContainer>
            {isRegistering && ( // Render name and email fields only in registration mode
                <>
                    <Input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </>
            )}
            <Button type="submit">{isRegistering ? 'Register' : 'Login'}</Button>
        </form>
      <p>
        {isRegistering
          ? 'Already have an account? '
          : "Don't have an account? "}
        <ToggleLink>
            <span
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
                {isRegistering ? 'Login' : 'Register'}
            </span>
        </ToggleLink>
      </p>
      <Message error>{message}</Message>
      </FormWrapper>
    </div>
  );
}

export default AuthForm;
