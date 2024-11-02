import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageCircle, CheckCircle } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const ContactSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: linear-gradient(
    45deg,
    var(--background-dark) 0%,
    var(--primary-color) 100%
  );
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactForm = styled(motion.form)`
  background: rgba(255, 255, 255, 0.05);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const FormGroup = styled(motion.div)`
  margin-bottom: 2rem;
  position: relative;
`;

const Label = styled(motion.label)`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-light);
  font-size: 0.9rem;
  transform-origin: left;
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--secondary-color);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 15px rgba(0, 255, 198, 0.2);
  }
`;

const TextArea = styled(Input.withComponent('textarea'))`
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: var(--secondary-color);
  color: var(--background-dark);
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s ease;
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(1);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ContactInfo = styled(motion.div)`
  color: var(--text-light);
`;

const InfoTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(
    135deg,
    var(--secondary-color),
    var(--accent-color)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const InfoText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
`;

const InfoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
  }

  &.whatsapp-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(37, 211, 102, 0.15);
      border-color: rgba(37, 211, 102, 0.3);
    }
  }
`;

const WhatsAppButton = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #25D366;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #128C7E;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SuccessMessage = styled(motion.div)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: var(--secondary-color);
  color: var(--background-dark);
  padding: 1rem 2rem;
  border-radius: 10px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 255, 157, 0.2);
`;

const SuccessIcon = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled(motion.span)`
  color: #ff4d4d;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: block;
`;

const Contact = () => {
  const [state, handleSubmit, reset] = useForm("xkgnjqqq");
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const formRef = useRef(null);

  useEffect(() => {
    if (state.succeeded) {
      formRef.current?.reset();
      const timer = setTimeout(() => {
        reset();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, reset]);

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
        duration: 0.6
      }
    }
  };

  const successVariants = {
    initial: { 
      opacity: 0, 
      x: 100,
      scale: 0.8 
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      x: 100,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const iconVariants = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };

  const handleWhatsAppClick = () => {
    window.location.href = 'https://wa.me/254719408098';
  };

  return (
    <ContactSection ref={ref}>
      <Container>
        <ContactGrid>
          <ContactInfo
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <InfoTitle variants={itemVariants}>
              Let's Create Something Amazing Together
            </InfoTitle>
            <InfoText variants={itemVariants}>
              Whether you have a project in mind or just want to explore possibilities,
              we're here to help turn your vision into reality.
            </InfoText>
            
            <InfoCard
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>Location</h3>
              <p>Juja, Kenya</p>
            </InfoCard>
            
            <InfoCard
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>Email</h3>
              <p>gravitydevs.tech@gmail.com</p>
            </InfoCard>
            
            <InfoCard
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>Phone</h3>
              <p>+254 719 408 089</p>
            </InfoCard>

            <InfoCard
              className="whatsapp-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWhatsAppClick}
            >
              <div>
                <h3>WhatsApp</h3>
                <p>Chat with us directly</p>
              </div>
              <WhatsAppButton
                href="https://wa.me/254719408098"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle />
                Chat Now
              </WhatsAppButton>
            </InfoCard>
          </ContactInfo>

          <ContactForm
            ref={formRef}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
          >
            <FormGroup variants={itemVariants}>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <ValidationError 
                prefix="Name" 
                field="name"
                errors={state.errors}
                component={ErrorText}
              />
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
                component={ErrorText}
              />
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                type="text"
                name="subject"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <ValidationError 
                prefix="Subject" 
                field="subject"
                errors={state.errors}
                component={ErrorText}
              />
            </FormGroup>

            <FormGroup variants={itemVariants}>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
                component={ErrorText}
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={state.submitting}
            >
              {state.submitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </ContactGrid>
      </Container>

      <AnimatePresence>
        {state.succeeded && (
          <SuccessMessage
            variants={successVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SuccessIcon
              variants={iconVariants}
              initial="initial"
              animate="animate"
            >
              <CheckCircle size={24} />
            </SuccessIcon>
            Message sent successfully!
          </SuccessMessage>
        )}
      </AnimatePresence>
    </ContactSection>
  );
};

export default Contact;