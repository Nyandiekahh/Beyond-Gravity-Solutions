// src/components/home/Hero.js
import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1f35 100%);
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
`;

const CenterLight = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vh;
  height: 100vh;
  background: radial-gradient(
    circle,
    rgba(0, 255, 200, 0.15) 0%,
    rgba(0, 162, 255, 0.1) 30%,
    transparent 70%
  );
  pointer-events: none;
  opacity: 0.7;
  animation: pulse 8s ease-in-out infinite;

  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.7;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.5;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.7;
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vh;
    height: 50vh;
    background: radial-gradient(
      circle,
      rgba(0, 255, 200, 0.1) 0%,
      transparent 70%
    );
    animation: innerPulse 6s ease-in-out infinite;
  }

  @keyframes innerPulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.5);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Content = styled.div`
  max-width: 800px;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 5rem);
  line-height: 1.1;
  margin-bottom: 2rem;
  
  span {
    display: block;
    background: linear-gradient(to right, #00ffc8, #00a2ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: 1.6;
`;

const ExploreButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 30px;
  background: linear-gradient(45deg, #00ffc8, #00a2ff);
  color: #0a0a0f;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
  font-weight: 500;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px);
  }
`;

const ParticlesCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const FloatingImage = styled(motion.img)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 500px;
  height: auto;
  pointer-events: none;
  opacity: 0.8;
`;

const Hero = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / 50;
      const moveY = (clientY - centerY) / 50;
      setMousePosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 200, ${this.opacity})`;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <HeroSection>
      <ParticlesCanvas ref={canvasRef} />
      <CenterLight />
      <Container>
        <Content>
          <MainTitle
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Beyond Limits,{' '}
            <span>Into the Future</span>
          </MainTitle>
          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            At Beyond Gravity Solutions, we're not just developers – we're digital
            innovators pushing the boundaries of what's possible. Our team of
            passionate technologists combines cutting-edge expertise with creative
            vision to deliver solutions that transcend expectations.
          </Description>
          <ExploreButton
            onClick={() => navigate('/projects')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore our universe
          </ExploreButton>
        </Content>
      </Container>
    </HeroSection>
  );
};

export default Hero;