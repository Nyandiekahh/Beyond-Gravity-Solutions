// components/home/FeaturedProjects.js
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ProjectsSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(
    45deg,
    var(--background-dark) 0%,
    var(--primary-color) 50%,
    var(--background-dark) 100%
  );
  position: relative;
  overflow: hidden;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  perspective: 1000px;
`;

const ProjectCard = styled(motion.div)`
  position: relative;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transform-style: preserve-3d;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: 1;
  }
`;

const ProjectImage = styled.div`
  position: absolute;
  inset: 0;
  background: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
`;

const ProjectContent = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  z-index: 2;
  transform: translateZ(50px);
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-light);
  margin-bottom: 1rem;
  font-weight: bold;
`;

const ProjectDescription = styled(motion.p)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 1rem;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  
  ${ProjectCard}:hover & {
    max-height: 100px;
  }
`;

const ProjectTags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tag = styled(motion.span)`
  padding: 0.3rem 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  font-size: 0.8rem;
  color: var(--secondary-color);
`;

const ProjectModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: var(--background-dark);
  padding: 2rem;
  border-radius: 20px;
  width: 100%;
  max-width: 800px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const projects = [
  {
    id: 1,
    title: 'P2P Lending Platform',
    description: 'A secure and scalable peer-to-peer lending solution with blockchain integration.',
    image: '/api/placeholder/600/400',
    tags: ['React', 'Node.js', 'MongoDB', 'Blockchain'],
    fullDescription: 'Comprehensive P2P lending platform with advanced features including KYC verification, automated matching algorithms, and secure payment processing.',
    link: 'https://example.com/p2p'
  },
  {
    id: 2,
    title: 'Hospital Management System',
    description: 'End-to-end healthcare facility management solution.',
    image: '/api/placeholder/600/400',
    tags: ['Vue.js', 'Python', 'PostgreSQL', 'Docker'],
    fullDescription: 'Complete hospital management system including patient records, appointment scheduling, inventory management, and billing.',
    link: 'https://example.com/hms'
  },
  {
    id: 3,
    title: 'Task Management & CRM',
    description: 'Integrated task and customer relationship management system.',
    image: '/api/placeholder/600/400',
    tags: ['React', 'Express', 'MySQL', 'Redis'],
    fullDescription: 'Feature-rich task management system with CRM capabilities, real-time notifications, and analytics dashboard.',
    link: 'https://example.com/crm'
  }
];

const FeaturedProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const handleCardHover = (e, rotate) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (rotate) {
      const rotateX = ((y - rect.height / 2) / rect.height) * 20;
      const rotateY = ((x - rect.width / 2) / rect.width) * 20;
      
      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    } else {
      card.style.transform = 'rotateX(0) rotateY(0)';
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      rotateX: -10
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  return (
    <ProjectsSection>
      <ProjectsGrid
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            variants={cardVariants}
            onClick={() => setSelectedProject(project)}
            onMouseMove={(e) => handleCardHover(e, true)}
            onMouseLeave={(e) => handleCardHover(e, false)}
            whileHover={{ scale: 1.05 }}
          >
            <ProjectImage image={project.image} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectTags>
                {project.tags.map((tag, index) => (
                  <Tag
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {tag}
                  </Tag>
                ))}
              </ProjectTags>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <CloseButton
                onClick={() => setSelectedProject(null)}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </CloseButton>
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.fullDescription}</p>
              <ProjectTags>
                {selectedProject.tags.map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </ProjectTags>
            </ModalContent>
          </ProjectModal>
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
};

export default FeaturedProjects;