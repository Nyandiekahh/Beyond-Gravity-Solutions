import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Trophy, Handshake, Calendar, Clock } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

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

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  background: linear-gradient(to right, #00ffc8, #00a2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const Description = styled(motion.p)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  perspective: 1000px;
`;

const StatCard = styled(motion.div)`
  position: relative;
  height: 300px;
  transform-style: preserve-3d;
  transition: transform 0.8s;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &.front {
    text-align: center;
    background: rgba(255, 255, 255, 0.05);
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 24px;
      padding: 2px;
      background: linear-gradient(45deg, #00ffc8, #00a2ff);
      -webkit-mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  }

  &.back {
    transform: rotateY(180deg);
    background: rgba(255, 255, 255, 0.08);
  }

  &:hover {
    box-shadow: 0 0 30px rgba(0, 255, 200, 0.2);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: #00ffc8;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

const StatNumber = styled.div`
  font-size: 3.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #00ffc8, #00a2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  position: relative;
`;

const CircularProgress = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${props => `conic-gradient(
    from 0deg,
    #00ffc8 ${props.progress}%,
    transparent ${props.progress}%
  )`};
  opacity: 0.2;
`;

const StatLabel = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const SubStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

const ChartContainer = styled.div`
  height: 50px;
  margin-top: 1rem;
`;

const BackContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BackTitle = styled.h4`
  color: #00ffc8;
  margin-bottom: 1rem;
`;

const BackDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const LearnMoreButton = styled.button`
  background: transparent;
  border: 1px solid #00ffc8;
  color: #00ffc8;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 200, 0.1);
  }
`;

// Stats Data
const stats = [
  {
    icon: <Trophy />,
    number: '100',
    label: 'Projects Completed',
    symbol: '+',
    progress: 85,
    subStats: {
      growth: '+25% YoY',
      average: '95% Success Rate'
    },
    chartData: Array.from({ length: 12 }, (_, i) => ({
      value: 50 + Math.random() * 50
    })),
    backContent: {
      title: 'Project Success Stories',
      description: 'Our projects have consistently exceeded client expectations, with a 95% success rate across various industries.',
      timeline: [
        { year: '2022', achievement: '45 Projects' },
        { year: '2023', achievement: '55 Projects' },
        { year: '2024', achievement: '100+ Projects' }
      ]
    }
  },
  {
    icon: <Handshake />,
    number: '50',
    label: 'Happy Clients',
    symbol: '+',
    progress: 92,
    subStats: {
      growth: '+30% YoY',
      average: '98% Satisfaction'
    },
    chartData: Array.from({ length: 12 }, (_, i) => ({
      value: 60 + Math.random() * 40
    })),
    backContent: {
      title: 'Client Satisfaction',
      description: 'We maintain a 98% client satisfaction rate through dedicated support and exceptional service delivery.',
      timeline: [
        { year: '2022', achievement: '20 Clients' },
        { year: '2023', achievement: '35 Clients' },
        { year: '2024', achievement: '50+ Clients' }
      ]
    }
  },
  {
    icon: <Calendar />,
    number: '5',
    label: 'Years Experience',
    symbol: '+',
    progress: 75,
    subStats: {
      growth: '10+ Industries',
      average: '8+ Technologies'
    },
    chartData: Array.from({ length: 12 }, (_, i) => ({
      value: 40 + Math.random() * 60
    })),
    backContent: {
      title: 'Industry Experience',
      description: 'Five years of delivering innovative solutions across multiple industries and technologies.',
      timeline: [
        { year: '2019', achievement: 'Founded' },
        { year: '2021', achievement: 'Major Expansion' },
        { year: '2024', achievement: 'Industry Leader' }
      ]
    }
  },
  {
    icon: <Clock />,
    number: '24/7',
    label: 'Support',
    symbol: '',
    progress: 100,
    subStats: {
      growth: '<2hr Response',
      average: '99.9% Uptime'
    },
    chartData: Array.from({ length: 12 }, (_, i) => ({
      value: 90 + Math.random() * 10
    })),
    backContent: {
      title: 'Support Excellence',
      description: 'Round-the-clock support with guaranteed response times and high availability.',
      timeline: [
        { year: 'Response', achievement: '<2 Hours' },
        { year: 'Uptime', achievement: '99.9%' },
        { year: 'Satisfaction', achievement: '100%' }
      ]
    }
  }
];

const NumberAnimation = ({ value, symbol }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      const duration = 2000;
      const steps = 60;
      let current = 0;
      const finalValue = value === '24/7' ? '24/7' : parseInt(value);
      
      if (value === '24/7') {
        setCount(value);
        return;
      }

      const stepValue = parseInt(value) / steps;
      
      const timer = setInterval(() => {
        current += stepValue;
        if (current >= finalValue) {
          setCount(finalValue);
          clearInterval(timer);
          setHasAnimated(true);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value, hasAnimated]);

  return (
    <span>
      {count}{symbol}
    </span>
  );
};

const Stats = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
        <SectionHeader>
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Achievements
          </Title>
          <Description
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Delivering excellence through innovation and dedication. Our numbers speak for themselves.
          </Description>
        </SectionHeader>

        <StatsGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              variants={itemVariants}
              isFlipped={flippedCards[index]}
              onClick={() => toggleCard(index)}
            >
              <CardSide className="front">
                <StatIcon>{stat.icon}</StatIcon>
                <StatNumber>
                  <CircularProgress progress={stat.progress} />
                  <NumberAnimation value={stat.number} symbol={stat.symbol} />
                </StatNumber>
                <StatLabel>{stat.label}</StatLabel>
                <SubStats>
                  <span>{stat.subStats.growth}</span>
                  <span>{stat.subStats.average}</span>
                </SubStats>
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stat.chartData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#00ffc8"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardSide>

              <CardSide className="back">
                <BackContent>
                  <div>
                    <BackTitle>{stat.backContent.title}</BackTitle>
                    <BackDescription>{stat.backContent.description}</BackDescription>
                  </div>
                  <div>
                    {stat.backContent.timeline.map((item, i) => (
                      <TimelineItem key={i}>
                        <span>{item.year}</span>
                        <span>{item.achievement}</span>
                      </TimelineItem>
                    ))}
                  </div>
                  <LearnMoreButton>Learn More</LearnMoreButton>
                </BackContent>
              </CardSide>
            </StatCard>
          ))}
        </StatsGrid>
      </Container>
    </StatsSection>
  );
};

export default Stats;