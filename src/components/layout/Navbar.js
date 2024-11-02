// components/layout/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--secondary-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .logo-icon {
    width: 40px;
    height: 40px;
    border: 2px solid var(--secondary-color);
    border-radius: 12px;
    display: grid;
    place-items: center;
    transform-style: preserve-3d;
    transition: transform 0.3s ease;

    &:hover {
      transform: rotateY(180deg);
    }
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion(Link))`
  color: var(--text-light);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--secondary-color);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: translateX(0);
  }

  &.active {
    color: var(--secondary-color);
    &::before {
      transform: translateX(0);
    }
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: none;
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: relative;

  @media (max-width: 768px) {
    display: block;
  }

  .line {
    width: 100%;
    height: 2px;
    background: var(--text-light);
    position: absolute;
    transition: all 0.3s ease;

    &:nth-of-type(1) { top: 25%; }
    &:nth-of-type(2) { top: 50%; }
    &:nth-of-type(3) { top: 75%; }
  }

  &.active {
    .line:nth-of-type(1) {
      top: 50%;
      transform: rotate(45deg);
    }
    .line:nth-of-type(2) {
      opacity: 0;
    }
    .line:nth-of-type(3) {
      top: 50%;
      transform: rotate(-45deg);
    }
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const navVariants = {
  hidden: { y: -100 },
  visible: { 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/services', label: 'Services' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavContainer
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: isScrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
        boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <NavContent>
        <Logo whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <div className="logo-icon">BGS</div>
          <span>Beyond Gravity</span>
        </Logo>

        <NavLinks>
          {links.map((link, index) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
            </NavLink>
          ))}
        </NavLinks>

        <MobileMenuButton 
          className={isMobileMenuOpen ? 'active' : ''}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </MobileMenuButton>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileMenu
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </NavLink>
              ))}
            </MobileMenu>
          )}
        </AnimatePresence>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;