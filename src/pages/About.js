import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './About.module.css';

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
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
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className={styles.aboutSection} ref={ref}>
      <motion.div 
        className={styles.glowingOrb}
        style={{ top: '10%', left: '10%' }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className={styles.glowingOrb}
        style={{ bottom: '10%', right: '10%' }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className={styles.container}>
        <motion.h1
          className={styles.mainTitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Beyond Gravity Solutions
        </motion.h1>

        <motion.div
          className={styles.visionSection}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 className={styles.sectionTitle} variants={itemVariants}>
            Our Vision
          </motion.h2>
          <motion.p className={styles.text} variants={itemVariants}>
            We are a dynamic team of young innovators, driven by an insatiable thirst to revolutionize daily activities through cutting-edge technology. At Beyond Gravity Solutions, we transcend conventional boundaries, focusing on quality over quantity in every project we undertake.
          </motion.p>
          <motion.p className={styles.text} variants={itemVariants}>
            Our mission extends beyond mere development - we're building a future where healthcare is seamlessly integrated, where work is location-independent, and where technology serves humanity's real needs. Our flagship initiative includes developing a comprehensive hospital management system that will revolutionize patient care through complete digital integration.
          </motion.p>
        </motion.div>

        <motion.div 
          className={styles.timelineContainer}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {[
            {
              year: '2021',
              text: 'Embarked on our coding journey with Python, laying the foundation for our technical expertise.'
            },
            {
              year: '2022',
              text: 'First client website launched using HTML/CSS. A milestone that marked our entry into professional web development.'
            },
            {
              year: '2023',
              text: 'Advanced our expertise through Data Analysis and Machine Learning at JKUAT. Participated in KAPS-sponsored hackathon, developing smart home solutions with Arduino.'
            },
            {
              year: '2024',
              text: 'Completed comprehensive Software Engineering training at Moringa, mastering full-stack development from HTML/CSS to React, Python, Flask, and Django. Launched Beyond Gravity Solutions with a vision to transform the tech landscape.'
            }
          ].map((item, index) => (
            <motion.div key={item.year} className={styles.timelineItem} variants={itemVariants}>
              <div className={styles.timelineContent}>
                <h3>{item.year}</h3>
                <p>{item.text}</p>
              </div>
              <div className={styles.timelineDot} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.statsGrid}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {[
            { number: '5+', label: 'Technical Certifications' },
            { number: '2+', label: 'Years Experience' },
            { number: '24/7', label: 'Development Support' },
            { number: '100%', label: 'Client Satisfaction' }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className={styles.statCard}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className={`${styles.visionSection} ${styles.futureSection}`}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h2 className={styles.sectionTitle} variants={itemVariants}>
            Our Future
          </motion.h2>
          <motion.p className={styles.text} variants={itemVariants}>
            We're not just building a company; we're cultivating a community. Our five-year vision encompasses creating a thriving tech ecosystem where developers grow together, supported by our innovative SACCO initiative that promotes financial empowerment among our team members and their families.
          </motion.p>
          <motion.p className={styles.text} variants={itemVariants}>
            To aspiring developers, we offer this wisdom: "The journey to becoming a full-stack developer is a nine-month commitment of pure dedication and focus, starting with HTML fundamentals. We're here to guide you every step of the way."
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;