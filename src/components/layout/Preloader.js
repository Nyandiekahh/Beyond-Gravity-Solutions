// components/layout/Preloader.js
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(90deg); }
  50% { transform: translateY(0) rotate(180deg); }
  75% { transform: translateY(20px) rotate(270deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
`;

const PreloaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--background-dark);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LogoContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const LogoShape = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border: 3px solid var(--secondary-color);
  animation: ${float} 2s ease-in-out infinite;

  &:nth-of-type(1) {
    top: 0;
    left: 0;
    animation-delay: 0s;
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  }

  &:nth-of-type(2) {
    top: 0;
    right: 0;
    animation-delay: 0.5s;
    border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
  }

  &:nth-of-type(3) {
    bottom: 0;
    left: 0;
    animation-delay: 1s;
    border-radius: 30% 70% 70% 30% / 70% 70% 30% 30%;
  }

  &:nth-of-type(4) {
    bottom: 0;
    right: 0;
    animation-delay: 1.5s;
    border-radius: 70% 30% 30% 70% / 30% 30% 70% 70%;
  }
`;

const CompanyName = styled.div`
  position: absolute;
  width: 200px;
  text-align: center;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  color: var(--secondary-color);
  font-size: 18px;
  letter-spacing: 2px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Preloader = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <PreloaderContainer>
      <LogoContainer>
        <LogoShape />
        <LogoShape />
        <LogoShape />
        <LogoShape />
        <CompanyName>BOLD AND BRILLIANT</CompanyName>
      </LogoContainer>
    </PreloaderContainer>
  );
};

export default Preloader;
