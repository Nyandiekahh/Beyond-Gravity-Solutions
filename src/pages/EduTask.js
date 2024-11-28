import React from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Base Section Styling
const EduTaskSection = styled.section`
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

// Header Components
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

// Partnership Announcement Section
const PartnershipSection = styled(motion.div)`
  margin: 4rem auto;
  padding: 3rem;
  background: linear-gradient(
    135deg,
    rgba(0, 255, 200, 0.1) 0%,
    rgba(0, 162, 255, 0.1) 100%
  );
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(0, 255, 200, 0.2);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(0, 255, 200, 0.1) 50%,
      transparent 100%
    );
    animation: shine 3s infinite linear;
  }

  @keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const PartnershipLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 2rem 0;

  .company {
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    font-weight: bold;
    color: #00ffc8;
  }

  .plus {
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.5);
  }
`;

const PartnershipDetails = styled.div`
  max-width: 800px;
  margin: 0 auto;
  
  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
    line-height: 1.8;
  }

  .highlight {
    color: #00ffc8;
    font-weight: 500;
  }
`;

// Service Grid Components
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

// Benefits Section
const FeatureGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const FeatureIcon = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${props => props.gradient};
  display: grid;
  place-items: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
`;

// Pricing Section
const PricingGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
`;

const PriceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  position: relative;
  overflow: hidden;

  ${props => props.popular && `
    border: 1px solid #00ffc8;
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: 1rem;
      right: -2rem;
      background: #00ffc8;
      color: #0a0a0f;
      padding: 0.5rem 3rem;
      transform: rotate(45deg);
      font-size: 0.8rem;
      font-weight: bold;
    }
  `}
`;

const Price = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #00ffc8;
  margin: 1rem 0;
`;

// FAQ Section
const FAQSection = styled(motion.div)`
  margin-top: 4rem;
`;

const FAQItem = styled(motion.div)`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;

  h4 {
    color: #00ffc8;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
  }
`;

// CTA Section
const CTASection = styled(motion.div)`
  margin-top: 4rem;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #00ffc8 0%, #00a2ff 100%);
  border-radius: 12px;
  color: #0a0a0f;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

// Data
const services = [
  {
    title: 'Academic Assignments',
    gradient: 'linear-gradient(135deg, #00ffc8 0%, #00a2ff 100%)',
    color: '#00ffc8',
    icon: '📝',
    features: [
      'Research Papers & Essays',
      'Case Studies & Analysis',
      'Literature Reviews',
      'Lab Reports & Scientific Papers',
      'Presentations & Slideshows',
      'Term Papers & Thesis Writing'
    ]
  },
  {
    title: 'Complex Projects',
    gradient: 'linear-gradient(135deg, #00a2ff 0%, #0066ff 100%)',
    color: '#00a2ff',
    icon: '📊',
    features: [
      'Engineering Projects',
      'Research Methodologies',
      'Data Analysis & Statistics',
      'Project Management',
      'Technical Documentation',
      'Implementation Support'
    ]
  },
  {
    title: 'CAD & Technical Drawing',
    gradient: 'linear-gradient(135deg, #7000ff 0%, #c800ff 100%)',
    color: '#7000ff',
    icon: '✏️',
    features: [
      'AutoCAD Designs',
      '3D Modeling & Prototypes',
      'Technical Drawings',
      'Engineering Diagrams',
      'Architectural Plans',
      'Product Design Sketches'
    ]
  },
  {
    title: 'Professional Reports',
    gradient: 'linear-gradient(135deg, #ff0099 0%, #ff4d4d 100%)',
    color: '#ff0099',
    icon: '📚',
    features: [
      'Technical Reports',
      'Business Analysis',
      'Research Documentation',
      'Field Study Reports',
      'Progress Reports',
      'Executive Summaries'
    ]
  }
];

const benefits = [
  {
    icon: '👨‍🏫',
    title: 'Expert Team',
    description: 'Access to qualified professionals across various academic fields'
  },
  {
    icon: '⚡',
    title: 'Quick Turnaround',
    description: 'Fast delivery without compromising on quality'
  },
  {
    icon: '🔒',
    title: 'Confidential',
    description: 'Your personal information and projects are kept secure'
  },
  {
    icon: '💡',
    title: 'Original Work',
    description: 'Plagiarism-free content with proper citations'
  },
  {
    icon: '📱',
    title: '24/7 Support',
    description: 'Round-the-clock assistance via WhatsApp'
  },
  {
    icon: '💰',
    title: 'Competitive Pricing',
    description: 'Affordable rates with student-friendly packages'
  }
];

const pricingPlans = [
  {
    name: 'Basic',
    price: 'From KSH 500',
    features: [
      'Simple Assignments',
      'Basic Research',
      'Standard Delivery',
      '1 Revision Round'
    ]
  },
  {
    name: 'Professional',
    price: 'From KSH 1,000',
    popular: true,
    features: [
      'Complex Projects',
      'Detailed Research',
      'Priority Delivery',
      'Multiple Revisions',
      'Direct Expert Contact'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Large-Scale Projects',
      'Comprehensive Research',
      'Expedited Delivery',
      'Unlimited Revisions',
      'Dedicated Project Manager'
    ]
  }
];

const faqItems = [
  {
    question: 'How does the process work?',
    answer: 'Start by contacting us via WhatsApp with your project details. We\'ll assess the requirements, provide a quote, and assign the best expert for your needs. You\'ll receive regular updates throughout the process.'
  },
  {
    question: 'What are your delivery timeframes?',
    answer: 'Delivery times vary based on project complexity. Simple assignments typically take 24-48 hours, while complex projects may require 3-7 days. We also offer expedited services for urgent requirements.'
  },
  {
    question: 'Do you guarantee original work?',
    answer: 'Yes, all work is original and custom-written for each client. We use plagiarism detection tools to ensure uniqueness and provide proper academic citations.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept various payment methods including M-Pesa, bank transfers, and major credit cards. Payment terms are flexible with installment options for larger projects.'
  }
];

const EduTask = () => {
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
    <EduTaskSection>
      <Container>
        {/* Header Section */}
        <HeaderSection>
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Edu Task Masters
          </Title>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional Academic Assistance for Excellence in Education
          </Subtitle>
        </HeaderSection>

        {/* Partnership Announcement */}
        <PartnershipSection
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Title style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Strategic Partnership Announcement
          </Title>
          <PartnershipLogo>
            <div className="company">Beyond Gravity Solutions</div>
            <div className="plus">+</div>
            <div className="company">Edu Task Masters</div>
          </PartnershipLogo>
          <PartnershipDetails>
            <p>
              We are excited to announce that <span className="highlight">Beyond Gravity Solutions</span> and 
              <span className="highlight"> Edu Task Masters</span> have entered into a strategic partnership 
              to revolutionize academic support services in Kenya and beyond.
            </p>
            <p>
              This collaboration combines Beyond Gravity Solutions' technical expertise and innovative digital 
              solutions with Edu Task Masters' comprehensive academic support services, creating a powerful 
              synergy that will benefit students and professionals alike.
            </p>
            <p>
              <span className="highlight">Key Partnership Benefits:</span>
              <br />
              • Enhanced digital platform for seamless project delivery
              <br />
              • Integrated technical and academic support services
              <br />
              • Advanced project management and tracking systems
              <br />
              • Expanded resource pool of subject matter experts
            </p>
          </PartnershipDetails>
          <CTAButton 
            href="#services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Services
          </CTAButton>
        </PartnershipSection>

        {/* Services Grid */}
        <ServicesGrid
          id="services"
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

        {/* Benefits Section */}
        <HeaderSection style={{ marginTop: '6rem' }}>
          <Title>Why Choose Us?</Title>
        </HeaderSection>
        <FeatureGrid>
          {benefits.map((benefit, index) => (
            <FeatureCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <FeatureIcon gradient="linear-gradient(135deg, #00ffc8 0%, #00a2ff 100%)">
                {benefit.icon}
              </FeatureIcon>
              <h3 style={{ color: '#00ffc8', marginBottom: '1rem' }}>{benefit.title}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>{benefit.description}</p>
            </FeatureCard>
          ))}
        </FeatureGrid>

        {/* Pricing Section */}
        <HeaderSection style={{ marginTop: '6rem' }}>
          <Title>Simple Pricing</Title>
          <Subtitle>Transparent pricing with no hidden costs</Subtitle>
        </HeaderSection>
        <PricingGrid>
          {pricingPlans.map((plan, index) => (
            <PriceCard
              key={index}
              popular={plan.popular}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <h3 style={{ color: '#00ffc8', fontSize: '1.5rem' }}>{plan.name}</h3>
              <Price>{plan.price}</Price>
              <ServicesList>
                {plan.features.map((feature, idx) => (
                  <ServiceItem
                    key={idx}
                    color="#00ffc8"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + idx * 0.1 }}
                  >
                    {feature}
                  </ServiceItem>
                ))}
              </ServicesList>
              <CTAButton 
                href="https://wa.link/gdzu66"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </CTAButton>
            </PriceCard>
          ))}
        </PricingGrid>

        {/* FAQ Section */}
        <FAQSection>
          <HeaderSection>
            <Title>Frequently Asked Questions</Title>
          </HeaderSection>
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4>{item.question}</h4>
              <p>{item.answer}</p>
            </FAQItem>
          ))}
        </FAQSection>

        {/* Final CTA Section */}
        {/* Final CTA Section */}
<CTASection
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
>
  <ServiceTitle gradient="linear-gradient(to right, #00ffc8, #00a2ff)">
    Ready to Excel in Your Academic Journey?
  </ServiceTitle>
  <Subtitle>
    Contact us now and let's transform your academic challenges into success stories.
    Experience the power of Beyond Gravity Solutions and Edu Task Masters working together for your success.
  </Subtitle>
  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
    <CTAButton 
      href="https://wa.link/gdzu66"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Contact Us on WhatsApp
    </CTAButton>
    
    <CTAButton 
      href="/edutask/portal"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Sign In / Register
    </CTAButton>
  </div>
</CTASection>
      </Container>
    </EduTaskSection>
  );
};

export default EduTask;