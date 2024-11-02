// src/components/home/Services.js
import React from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ServicesSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1f35 100%);
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(0, 255, 200, 0.15) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 6rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  background: linear-gradient(to right, #00ffc8, #00a2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled(motion.p)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  padding: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      800px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.06),
      transparent 40%
    );
    opacity: 0;
    transition: opacity 0.5s;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const ServiceHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const ServiceIcon = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: ${props => props.gradient};
  display: grid;
  place-items: center;
  font-size: 1.8rem;
  margin-right: 1rem;
  position: relative;
  overflow: hidden;
`;

const ServiceTitle = styled(motion.h3)`
  font-size: 1.8rem;
  background: ${props => props.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ServicesList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceItem = styled(motion.li)`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
  
  &::before {
    content: '◆';
    color: ${props => props.color};
    margin-right: 0.8rem;
    font-size: 0.8rem;
  }
`;

const services = [
  {
    title: 'Web Development',
    gradient: 'linear-gradient(135deg, #00ffc8 0%, #00a2ff 100%)',
    color: '#00ffc8',
    icon: '🌐',
    features: [
      'Next.js & React Applications',
      'Progressive Web Apps',
      'Cloud Architecture',
      'Performance Optimization'
    ]
  },
  {
    title: 'Mobile Development',
    gradient: 'linear-gradient(135deg, #00a2ff 0%, #0066ff 100%)',
    color: '#00a2ff',
    icon: '📱',
    features: [
      'React Native',
      'Native iOS/Android',
      'Real-time Features',
      'Offline Capability'
    ]
  },
  {
    title: 'UI/UX Design',
    gradient: 'linear-gradient(135deg, #7000ff 0%, #c800ff 100%)',
    color: '#7000ff',
    icon: '🎨',
    features: [
      'User Research',
      'Interactive Prototypes',
      'Motion Design',
      'Design Systems'
    ]
  },
  {
    title: 'AI Integration',
    gradient: 'linear-gradient(135deg, #ff0099 0%, #ff4d4d 100%)',
    color: '#ff0099',
    icon: '🤖',
    features: [
      'Machine Learning',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics'
    ]
  }
];

const Services = () => {
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

  // Mouse move effect for cards
  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
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
      y: 30
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
    <ServicesSection>
      <Container>
        <HeaderSection>
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Services
          </Title>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Pushing the boundaries of digital innovation with cutting-edge solutions
          </Subtitle>
        </HeaderSection>

        <ServicesGrid
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            >
              <ServiceHeader>
                <ServiceIcon 
                  gradient={service.gradient}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  {service.icon}
                </ServiceIcon>
                <ServiceTitle gradient={service.gradient}>
                  {service.title}
                </ServiceTitle>
              </ServiceHeader>
              <ServicesList>
                {service.features.map((feature, idx) => (
                  <ServiceItem
                    key={idx}
                    color={service.color}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + idx * 0.1 }}
                  >
                    {feature}
                  </ServiceItem>
                ))}
              </ServicesList>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Container>
    </ServicesSection>
  );
};

export default Services;