// src/pages/Projects.js
import React from 'react';
import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Keeping your existing styled components exactly as they are
const ProjectsSection = styled.section`
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

const Header = styled.div`
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
  margin-bottom: 2rem;
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
  padding: 0.5rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  color: ${props => props.active ? '#00ffc8' : 'rgba(255, 255, 255, 0.7)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  padding: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;

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

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background: ${props => props.gradient};
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%);
  }
`;

const ProjectContent = styled.div`
  padding: 2rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const TechTag = styled(motion.span)`
  padding: 0.3rem 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 0.8rem;
  color: #00ffc8;
`;

// Updated projects array with your real projects
const projects = [
  {
    id: 1,
    title: 'P2P Lending Platform',
    description: 'A sophisticated peer-to-peer lending platform enabling secure financial transactions between lenders and borrowers. Features include loan management, automated matching, and secure payment processing.',
    gradient: 'linear-gradient(135deg, #00ffc8 0%, #00a2ff 100%)',
    category: 'FinTech',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express']
  },
  {
    id: 2,
    title: 'SACCO Management System',
    description: 'Comprehensive SACCO management solution with features for member management, loan processing, savings tracking, and dividend calculations.',
    gradient: 'linear-gradient(135deg, #7000ff 0%, #c800ff 100%)',
    category: 'FinTech',
    techStack: ['React', 'MySQL', 'Node.js', 'Redux']
  },
  {
    id: 3,
    title: 'Hospital Management System',
    description: 'Integrated healthcare management system for patient records, appointments, inventory, and hospital operations management.',
    gradient: 'linear-gradient(135deg, #ff0099 0%, #ff4d4d 100%)',
    category: 'Healthcare',
    techStack: ['Vue.js', 'Laravel', 'MySQL', 'Redis']
  },
  {
    id: 4,
    title: 'Task & CRM System',
    description: 'Combined task management and CRM platform with real-time updates, team collaboration, and customer tracking features.',
    gradient: 'linear-gradient(135deg, #00a2ff 0%, #0066ff 100%)',
    category: 'Business',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io']
  },
  {
    id: 5,
    title: 'POS System Landing',
    description: 'High-conversion landing page for Point of Sale system with interactive demos and feature highlights.',
    gradient: 'linear-gradient(135deg, #ff6b00 0%, #ff4d4d 100%)',
    category: 'Web',
    techStack: ['React', 'Tailwind CSS', 'Framer Motion']
  },
  {
    id: 6,
    title: 'Agrovet E-commerce',
    description: 'Full-featured e-commerce platform for agricultural and veterinary products with inventory and order management.',
    gradient: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
    category: 'E-commerce',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    id: 7,
    title: 'M-Pesa Integration',
    description: 'Seamless payment solution integrating M-Pesa services for various business applications and platforms.',
    gradient: 'linear-gradient(135deg, #00ff87 0%, #60efff 100%)',
    category: 'FinTech',
    techStack: ['Node.js', 'Express', 'M-Pesa API', 'MongoDB']
  },
  {
    id: 8,
    title: 'Portfolio Websites',
    description: 'Collection of modern, responsive portfolio websites with interactive elements and smooth animations.',
    gradient: 'linear-gradient(135deg, #aa00ff 0%, #00ff22 100%)',
    category: 'Web',
    techStack: ['React', 'Three.js', 'GSAP', 'Tailwind']
  }
];

const categories = ['All', 'FinTech', 'Healthcare', 'Business', 'Web', 'E-commerce'];

const Projects = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [filteredProjects, setFilteredProjects] = React.useState(projects);
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

  React.useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

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

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <ProjectsSection>
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Our Projects
          </Title>
          <Subtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Delivering innovative digital solutions across diverse industries
          </Subtitle>
          <FilterContainer>
            {categories.map((category, index) => (
              <FilterButton
                key={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </FilterButton>
            ))}
          </FilterContainer>
        </Header>

        <ProjectsGrid
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            >
              <ProjectImage gradient={project.gradient} />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.techStack.map((tech, index) => (
                    <TechTag
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {tech}
                    </TechTag>
                  ))}
                </TechStack>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;