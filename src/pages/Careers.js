import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  User2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  BookOpen, 
  Upload, 
  X, 
  Briefcase 
} from 'lucide-react';


// Keyframe Animations
const starFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 230, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 255, 230, 0.6); }
`;

const textGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
export const CareerSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a1f 0%, #1a1a3a 100%);
  position: relative;
  overflow: hidden;
  padding: 80px 0;
  
  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='1' fill='rgba(255,255,255,0.2)'/%3E%3C/svg%3E");
    animation: ${starFloat} 100s linear infinite;
    opacity: 0.5;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
`;

export const Title = styled(motion.h1)`
  font-size: 4rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #00ffcc, #00ccff, #00ffcc);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${textGradient} 5s ease infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 15px 25px;
  border-radius: 30px;
  border: 1px solid rgba(0, 255, 230, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ffe6;
    box-shadow: 0 0 20px rgba(0, 255, 230, 0.2);
  }
`;

export const FilterSelect = styled.select`
  padding: 15px 25px;
  border-radius: 30px;
  border: 1px solid rgba(0, 255, 230, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #00ffe6;
  }

  option {
    background: #1a1a3a;
    color: #fff;
  }
`;

export const JobsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

export const JobCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  cursor: pointer;
  border: 1px solid rgba(0, 255, 230, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-10px);
    border-color: #00ffe6;
    animation: ${glowPulse} 2s infinite;
  }
`;

export const JobTitle = styled.h3`
  font-size: 1.5rem;
  color: #00ffe6;
  margin-bottom: 15px;
  font-weight: 600;
`;

export const JobDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 20px;
`;

export const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

export const SkillTag = styled(motion.span)`
  padding: 8px 16px;
  background: rgba(0, 255, 230, 0.1);
  border-radius: 20px;
  font-size: 0.9rem;
  color: #00ffe6;
  border: 1px solid rgba(0, 255, 230, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 230, 0.2);
    transform: scale(1.05);
  }
`;

export const JobDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;

  span {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

// Continue from previous styled components...

export const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
`;

export const ModalContent = styled(motion.div)`
  background: linear-gradient(135deg, rgba(26, 26, 58, 0.9) 0%, rgba(10, 10, 31, 0.9) 100%);
  border-radius: 30px;
  padding: 40px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(0, 255, 230, 0.2);
  box-shadow: 0 0 40px rgba(0, 255, 230, 0.1);

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 230, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(0, 255, 230, 0.5);
    }
  }
`;

export const ModalHeader = styled.div`
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 255, 230, 0.2);
`;

export const ModalTitle = styled.h2`
  font-size: 2.5rem;
  color: #00ffe6;
  margin-bottom: 15px;
  background: linear-gradient(45deg, #00ffcc, #00ccff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ModalDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  font-size: 1.1rem;
`;

export const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0, 255, 230, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: #00ffe6;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 230, 0.1);
    transform: rotate(90deg);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: #00ffe6;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const Input = styled.input`
  padding: 15px 20px;
  border-radius: 15px;
  border: 1px solid rgba(0, 255, 230, 0.3);
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00ffe6;
    box-shadow: 0 0 20px rgba(0, 255, 230, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

export const TextArea = styled(Input).attrs({ as: 'textarea' })`
  min-height: 150px;
  resize: vertical;
  line-height: 1.6;
`;

export const FileUploadContainer = styled.div`
  position: relative;
  padding: 40px 20px;
  border: 2px dashed rgba(0, 255, 230, 0.3);
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #00ffe6;
    background: rgba(0, 255, 230, 0.05);
  }
`;

export const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const FileUploadText = styled.div`
  color: rgba(255, 255, 255, 0.8);
  
  p {
    margin: 10px 0;
  }

  span {
    color: #00ffe6;
    font-size: 0.9rem;
  }
`;

export const SubmitButton = styled(motion.button)`
  padding: 15px 30px;
  border-radius: 30px;
  border: none;
  background: linear-gradient(45deg, #00ffcc, #00ccff);
  color: #000;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(0, 255, 230, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const PerksContainer = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: rgba(0, 255, 230, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(0, 255, 230, 0.1);
`;

export const PerksTitle = styled.h4`
  color: #00ffe6;
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

export const PerksList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
`;

export const PerkItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.8);

  &::before {
    content: '→';
    color: #00ffe6;
  }
`;

const jobs = [
  {
    id: 1,
    title: "Senior Full Stack Developer",
    type: "Full-time",
    location: "Juja / Remote",
    experience: "5+ years",
    skills: ["React", "Node.js", "Python", "AWS"],
    description: "Join us in shaping the future of web development as we push beyond conventional boundaries.",
    perks: ["Equity package", "Flexible working hours", "Leadership opportunity"],
    responsibilities: [
      "Lead development of innovative web applications",
      "Architect scalable solutions",
      "Mentor junior developers",
      "Drive technical decisions"
    ]
  },
  {
    id: 2,
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Hybrid",
    experience: "3+ years",
    skills: ["Figma", "Adobe XD", "User Research", "Design Systems"],
    description: "Create extraordinary digital experiences that transcend the ordinary.",
    perks: ["Creative freedom", "Design ownership", "Innovation focus"],
    responsibilities: [
      "Design intuitive interfaces",
      "Create cohesive design systems",
      "Lead user research",
      "Shape product experience"
    ]
  },
  {
    id: 3,
    title: "Project Manager",
    type: "Full-time",
    location: "Hybrid",
    experience: "4+ years",
    skills: ["Agile", "Scrum", "JIRA", "Risk Management"],
    description: "Lead our innovative projects from conception to delivery in our fast-paced environment.",
    perks: ["Team leadership", "Strategic planning", "Growth opportunities"],
    responsibilities: [
      "Drive project success",
      "Lead agile teams",
      "Manage stakeholder relationships",
      "Define project roadmaps"
    ]
  },
  {
    id: 4,
    title: "Business Analyst",
    type: "Full-time",
    location: "Remote",
    experience: "3+ years",
    skills: ["Data Analysis", "SQL", "Requirements Gathering", "Process Mapping"],
    description: "Transform complex business challenges into innovative technical solutions.",
    perks: ["Remote work", "Data-driven impact", "Cross-functional collaboration"],
    responsibilities: [
      "Analyze business requirements",
      "Create detailed specifications",
      "Drive process improvements",
      "Stakeholder management"
    ]
  },
  {
    id: 5,
    title: "Content Strategist",
    type: "Full-time",
    location: "Remote",
    experience: "3+ years",
    skills: ["Content Planning", "SEO", "Analytics", "Editorial"],
    description: "Shape our narrative and content strategy across digital platforms.",
    perks: ["Creative control", "Remote work", "Industry influence"],
    responsibilities: [
      "Develop content strategy",
      "Lead editorial calendar",
      "Analyze content performance",
      "Create brand voice"
    ]
  }
];

const LoadingScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #0a0a1f 0%, #1a1a3a 100%);
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    width: 60px;
    height: 60px;
    border: 3px solid rgba(0, 255, 230, 0.3);
    border-radius: 50%;
    border-top-color: #00ffe6;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null
  });

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || job.location.toLowerCase().includes(filterType);
    return matchesSearch && matchesType;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setFormData(prev => ({ ...prev, resume: file }));
    } else {
      alert('Please upload a file smaller than 5MB');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically send the data to your backend
      console.log('Submitting application:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form and show success
      setFormData({
        name: '',
        email: '',
        phone: '',
        coverLetter: '',
        resume: null
      });
      setSelectedJob(null);
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  if (loading) {
    return (
      <LoadingScreen>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="loader" />
        </motion.div>
      </LoadingScreen>
    );
  }

  return (
    <CareerSection ref={ref}>
      <Container>
        <Title
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Join Our Universe
        </Title>

        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Search positions or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FilterSelect
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Locations</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="juja">Juja</option>
          </FilterSelect>
        </SearchContainer>

        <JobsGrid
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              variants={itemVariants}
              onClick={() => setSelectedJob(job)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <JobTitle>{job.title}</JobTitle>
              <JobDescription>{job.description}</JobDescription>
              
              <SkillsContainer>
                {job.skills.map((skill, index) => (
                  <SkillTag
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {skill}
                  </SkillTag>
                ))}
              </SkillsContainer>

              <JobDetails>
                <span><MapPin size={16} /> {job.location}</span>
                <span><Clock size={16} /> {job.type}</span>
                <span><BookOpen size={16} /> {job.experience}</span>
              </JobDetails>
            </JobCard>
          ))}
        </JobsGrid>

        <AnimatePresence>
          {selectedJob && (
            <Modal
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.target === e.currentTarget && setSelectedJob(null)}
            >
              <ModalContent
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CloseButton
                  onClick={() => setSelectedJob(null)}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </CloseButton>

                <ModalHeader>
                  <ModalTitle>{selectedJob.title}</ModalTitle>
                  <ModalDescription>{selectedJob.description}</ModalDescription>
                </ModalHeader>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label><User2 size={16} /> Full Name</Label>
                    <Input
                      type="text"
                      name="name"
                      required
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label><Mail size={16} /> Email</Label>
                    <Input
                      type="email"
                      name="email"
                      required
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label><Phone size={16} /> Phone</Label>
                    <Input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label><Briefcase size={16} /> Cover Letter</Label>
                    <TextArea
                      name="coverLetter"
                      required
                      placeholder="Tell us why you'd be a great fit..."
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FileUploadContainer>
                    <FileInput
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                    <FileUploadText>
                      <Upload size={24} />
                      <p>Drop your resume here or click to browse</p>
                      <span>PDF, DOC, DOCX (Max 5MB)</span>
                    </FileUploadText>
                  </FileUploadContainer>

                  <PerksContainer>
                    <PerksTitle>What You'll Get</PerksTitle>
                    <PerksList>
                      {selectedJob.perks.map((perk, index) => (
                        <PerkItem key={index}>{perk}</PerkItem>
                      ))}
                    </PerksList>
                  </PerksContainer>

                  <SubmitButton
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit Application
                  </SubmitButton>
                </Form>
              </ModalContent>
            </Modal>
          )}
        </AnimatePresence>
      </Container>
    </CareerSection>
  );
};

export default Careers;