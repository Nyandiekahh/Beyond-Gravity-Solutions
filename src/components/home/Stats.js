// src/components/home/Stats.js
import React from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatsSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(180deg, #0a0a0f 0%, #1a1f35 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 30%, rgba(0, 255, 200, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(0, 162, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;

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
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const StatNumber = styled(motion.h3)`
  font-size: 3.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #00ffc8, #00a2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  position: relative;
`;

const StatLabel = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
`;

const NumberAnimation = ({ value }) => {
  const [count, setCount] = React.useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2000;
      const increment = (end / duration) * 16.67;

      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16.67);

      return () => clearInterval(timer);
    }
  }, [value, inView]);

  return <span ref={ref}>{count}</span>;
};

const stats = [
  { number: '100', label: 'Projects Completed', symbol: '+' },
  { number: '50', label: 'Happy Clients', symbol: '+' },
  { number: '5', label: 'Years Experience', symbol: '+' },
  { number: '24/7', label: 'Support', symbol: '' }
];

const Stats = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <StatsSection>
      <Container>
        <StatsGrid
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                transition: { duration: 0.3 }
              }}
            >
              <StatNumber>
                <NumberAnimation value={stat.number} />
                {stat.symbol}
              </StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </Container>
    </StatsSection>
  );
};

export default Stats;