import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { CheckCircle, Send } from 'lucide-react';

const FooterContainer = styled.footer`
  background: linear-gradient(
    to bottom,
    var(--background-dark) 0%,
    var(--primary-color) 100%
  );
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterSection = styled(motion.div)`
  color: var(--text-light);
`;

const FooterTitle = styled.h3`
  color: var(--secondary-color);
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 30px;
    height: 2px;
    background: var(--secondary-color);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 50px;
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterLink = styled(motion.a)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  display: block;
  padding: 0.5rem 0;
  transition: all 0.3s ease;

  &:hover {
    color: var(--secondary-color);
    transform: translateX(10px);
  }
`;

const NewsletterForm = styled(motion.form)`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  position: relative;
`;

const NewsletterInput = styled(motion.input)`
  flex: 1;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);

  &:focus {
    outline: none;
    border-color: var(--secondary-color);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SubscribeButton = styled(motion.button)`
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: none;
  background: var(--secondary-color);
  color: var(--background-dark);
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Copyright = styled(motion.div)`
  text-align: center;
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: grid;
  place-items: center;
  color: var(--text-light);
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: var(--secondary-color);
    color: var(--background-dark);
    transform: translateY(-5px);
  }
`;

const SuccessMessage = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--secondary-color);
  color: var(--background-dark);
  padding: 1.5rem 2rem;
  border-radius: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 255, 157, 0.2);
  max-width: 400px;
`;

const SuccessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.1rem;
`;

const SuccessDetails = styled.p`
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.4;
`;

const ErrorMessage = styled(motion.span)`
  color: #ff4d4d;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  position: absolute;
  bottom: -1.5rem;
  left: 0;
`;

const Footer = () => {
  const formRef = useRef(null);
  const [state, handleSubmit] = useForm("xkgnjqqq", {
    data: {
      subject: "Welcome to Beyond Gravity Solutions Newsletter! 🚀",
      replyTo: "@",
      message: `Thank you for subscribing to our newsletter! 

We're excited to have you join our community. You'll be among the first to receive:

• Updates on our latest projects and innovations
• Industry insights and tech trends
• Exclusive content and early access to our releases

Stay tuned for our next update!

Best regards,
The Beyond Gravity Solutions Team

P.S. If you have any questions, feel free to reply to this email.`,
      company: "Beyond Gravity Solutions",
      subscriptionSource: "Website Footer Newsletter",
    }
  });

  useEffect(() => {
    if (state.succeeded) {
      formRef.current?.reset();
      const timer = setTimeout(() => {
        // Optional: Reset form state after success message disappears
        // state.reset();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const successVariants = {
    initial: { 
      opacity: 0, 
      y: 50,
      scale: 0.8 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: 50,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <FooterTitle>About Us</FooterTitle>
            <p>Beyond Gravity Solutions is a leading tech company specializing in innovative digital solutions. We transform ideas into reality.</p>
            <SocialIcons>
              <SocialIcon 
                href="#" 
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-twitter"></i>
              </SocialIcon>
              <SocialIcon 
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-linkedin"></i>
              </SocialIcon>
              <SocialIcon 
                href="#"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fab fa-github"></i>
              </SocialIcon>
            </SocialIcons>
          </motion.div>
        </FooterSection>

        <FooterSection
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <FooterTitle>Quick Links</FooterTitle>
            <FooterList>
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/services">Services</FooterLink></li>
              <li><FooterLink href="/projects">Projects</FooterLink></li>
              <li><FooterLink href="/careers">Careers</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </FooterList>
          </motion.div>
        </FooterSection>

        <FooterSection
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <FooterTitle>Contact Info</FooterTitle>
            <FooterList>
              <li>Juja, Kenya</li>
              <li>Phone: +254 719 408 098</li>
              <li>Email: gravitydevs.tech@gmail.com</li>
            </FooterList>
          </motion.div>
        </FooterSection>

        <FooterSection
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <FooterTitle>Newsletter</FooterTitle>
            <p>Subscribe to our newsletter for updates and insights.</p>
            <NewsletterForm ref={formRef} onSubmit={handleSubmit}>
              <NewsletterInput
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                whileFocus={{ scale: 1.02 }}
                disabled={state.submitting}
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
                component={ErrorMessage}
              />
              <SubscribeButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={state.submitting}
              >
                {state.submitting ? 'Subscribing...' : (
                  <>
                    <Send size={18} />
                    Subscribe
                  </>
                )}
              </SubscribeButton>
            </NewsletterForm>
          </motion.div>
        </FooterSection>
      </FooterContent>

      <Copyright
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>&copy; {new Date().getFullYear()} Beyond Gravity Solutions. All rights reserved.</p>
      </Copyright>

      <AnimatePresence>
        {state.succeeded && (
          <SuccessMessage
            variants={successVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SuccessHeader>
              <CheckCircle size={24} />
              Successfully Subscribed!
            </SuccessHeader>
            <SuccessDetails>
              Thank you for joining our newsletter! Please check your email 
              for a welcome message with more details about what to expect.
            </SuccessDetails>
          </SuccessMessage>
        )}
      </AnimatePresence>
    </FooterContainer>
  );
};

export default Footer;