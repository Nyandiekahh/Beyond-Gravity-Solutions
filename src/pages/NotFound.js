// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const Title = styled(motion.h1)`
  font-size: 8rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Message = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--text-light);
`;

const HomeButton = styled(motion(Link))`
  padding: 1rem 2rem;
  background: var(--secondary-color);
  color: var(--background-dark);
  text-decoration: none;
  border-radius: 30px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px rgba(0, 255, 198, 0.3);
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        404
      </Title>
      <Message
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Oops! Looks like you've ventured too far into space.
      </Message>
      <HomeButton
        to="/"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Return Home
      </HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound;