import React, { useState } from 'react';
import styled from 'styled-components';
import axiosInstance from '../AxiosInstance'

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  max-width: 500px;
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

const ShortenedUrl = styled.p`
  margin-top: 20px;
  font-size: 14px;
  text-align: center;

  span {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }

  a {
    color: #007bff;
    text-decoration: none;
    word-wrap: break-word;
  }
`;


function ShortenForm() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/shorten', { originalUrl });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  return (
    <FormWrapper> {/* Use the styled FormWrapper component */}
      <FormTitle>Shorten URL</FormTitle> {/* Use the styled FormTitle component */}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter URL to shorten"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <Button type="submit">Shorten</Button> {/* Use the styled Button component */}
      </form>
      {shortUrl && (
        <ShortenedUrl> {/* Use the styled ShortenedUrl component */}
          <span>Shortened URL:</span> 
          <a href={`https://url-shortener-vuxr.onrender.com/api/${shortUrl}`} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </ShortenedUrl>
      )}
    </FormWrapper>
  );
}

export default ShortenForm;
