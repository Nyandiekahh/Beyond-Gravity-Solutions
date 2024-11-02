import React, { useEffect, useRef, useState } from 'react';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = {
    vision: useRef(null),
    journey: useRef(null),
    future: useRef(null),
    philosophy: useRef(null),
    team: useRef(null)
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        setIsVisible(prev => ({
          ...prev,
          [entry.target.id]: entry.isIntersecting
        }));
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const renderParticles = () => {
    return Array(50).fill(null).map((_, i) => (
      <div 
        key={i} 
        className="particle"
        style={{
          '--delay': `${Math.random() * 4}s`,
          '--size': `${Math.random() * 10 + 5}px`,
          '--speed': `${Math.random() * 20 + 10}s`,
          '--x': `${Math.random() * 100}%`,
          '--y': `${Math.random() * 100}%`
        }}
      />
    ));
  };

  return (
    <div className="about-section">
      <div className="about-container">
        {renderParticles()}
        
        <div className="cosmic-overlay"></div>
        
        <section 
          id="vision" 
          ref={sectionRefs.vision}
          className={`section vision-section ${isVisible.vision ? 'visible' : ''}`}
        >
          <h1 className="cosmic-title">Beyond Gravity: Redefining Digital Frontiers</h1>
          <p className="vision-text">
            We are the architects of tomorrow's digital landscape - a team of young innovators driven by 
            an insatiable thirst to revolutionize everyday activities through cutting-edge technology. 
            At the intersection of ambition and innovation, we craft digital solutions that transcend 
            conventional boundaries.
          </p>
        </section>

        <section 
          id="philosophy" 
          ref={sectionRefs.philosophy}
          className={`section philosophy-section ${isVisible.philosophy ? 'visible' : ''}`}
        >
          <h2 className="section-title">Core Values</h2>
          <div className="values-container">
            <div className="value-card">
              <h3>Quality Over Quantity</h3>
              <p>Every pixel, every line of code, every interaction is crafted with precision and purpose.</p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>Building trust through honest communication and open collaboration.</p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>Pushing boundaries while maintaining a balance of professionalism and youthful energy.</p>
            </div>
          </div>
        </section>

        <section 
          id="journey" 
          ref={sectionRefs.journey}
          className={`section journey-section ${isVisible.journey ? 'visible' : ''}`}
        >
          <h2 className="section-title">Our Genesis Story</h2>
          <div className="timeline">
            <div className="timeline-item">
              <span className="year">2021</span>
              <p>First steps into Python development</p>
            </div>
            <div className="timeline-item">
              <span className="year">2022</span>
              <p>First client website using HTML/CSS</p>
            </div>
            <div className="timeline-item">
              <span className="year">2023</span>
              <p>Data Analysis and Machine Learning at JKUAT</p>
            </div>
            <div className="timeline-item">
              <span className="year">2024</span>
              <p>Moringa Software Engineering & Company Launch</p>
            </div>
          </div>
        </section>

        <section 
          id="future" 
          ref={sectionRefs.future}
          className={`section future-section ${isVisible.future ? 'visible' : ''}`}
        >
          <h2 className="section-title">Pioneering Tomorrow</h2>
          <div className="future-grid">
            <div className="future-card">
              <h3>Healthcare Revolution</h3>
              <p>Developing an integrated hospital system that will revolutionize patient care through 
              comprehensive digital health records, from birth to present day.</p>
            </div>
            <div className="future-card">
              <h3>Workplace Innovation</h3>
              <p>Creating task management solutions that embrace remote work culture while maintaining 
              peak productivity and accountability.</p>
            </div>
            <div className="future-card">
              <h3>Community Building</h3>
              <p>Fostering financial growth through our SACCO initiative while building a supportive 
              network of developers and innovators.</p>
            </div>
          </div>
        </section>

        <section 
          id="team" 
          ref={sectionRefs.team}
          className={`section team-section ${isVisible.team ? 'visible' : ''}`}
        >
          <h2 className="section-title">Join Our Constellation</h2>
          <div className="team-content">
            <p className="team-message">
              "To aspiring developers: Your journey to becoming a full-stack developer is a 9-month 
              dedication to pure grinding and focus. Start with HTML, embrace the process, and join 
              our mission to reshape the digital landscape."
            </p>
            <div className="certification-badge">
              <h3>Our Excellence Markers</h3>
              <ul>
                <li>Machine Learning Certification</li>
                <li>Data Analysis Expertise</li>
                <li>AWS Cloud Computing</li>
                <li>Moringa Software Engineering</li>
                <li>Mechatronics Engineering (JKUAT)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;