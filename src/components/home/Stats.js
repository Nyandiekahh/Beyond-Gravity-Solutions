import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Handshake, Calendar, Clock, ChevronRight } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const EnhancedStats = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Simulate intersection observer
    const timer = setTimeout(() => setIsInView(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleCard = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Stats Data
  const stats = [
    {
      icon: <Trophy />,
      number: '100',
      label: 'Projects Completed',
      symbol: '+',
      progress: 85,
      subStats: {
        growth: '+25% YoY',
        average: '95% Success Rate'
      },
      chartData: Array.from({ length: 12 }, (_, i) => ({
        value: 50 + Math.random() * 50
      })),
      backContent: {
        title: 'Project Success Stories',
        description: 'Our projects have consistently exceeded client expectations, with a 95% success rate across various industries.',
        timeline: [
          { year: '2022', achievement: '45 Projects' },
          { year: '2023', achievement: '55 Projects' },
          { year: '2024', achievement: '100+ Projects' }
        ]
      }
    },
    {
      icon: <Handshake />,
      number: '50',
      label: 'Happy Clients',
      symbol: '+',
      progress: 92,
      subStats: {
        growth: '+30% YoY',
        average: '98% Satisfaction'
      },
      chartData: Array.from({ length: 12 }, (_, i) => ({
        value: 60 + Math.random() * 40
      })),
      backContent: {
        title: 'Client Satisfaction',
        description: 'We maintain a 98% client satisfaction rate through dedicated support and exceptional service delivery.',
        timeline: [
          { year: '2022', achievement: '20 Clients' },
          { year: '2023', achievement: '35 Clients' },
          { year: '2024', achievement: '50+ Clients' }
        ]
      }
    },
    {
      icon: <Calendar />,
      number: '5',
      label: 'Years Experience',
      symbol: '+',
      progress: 75,
      subStats: {
        growth: '10+ Industries',
        average: '8+ Technologies'
      },
      chartData: Array.from({ length: 12 }, (_, i) => ({
        value: 40 + Math.random() * 60
      })),
      backContent: {
        title: 'Industry Experience',
        description: 'Five years of delivering innovative solutions across multiple industries and technologies.',
        timeline: [
          { year: '2019', achievement: 'Founded' },
          { year: '2021', achievement: 'Major Expansion' },
          { year: '2024', achievement: 'Industry Leader' }
        ]
      }
    },
    {
      icon: <Clock />,
      number: '24/7',
      label: 'Support',
      symbol: '',
      progress: 100,
      subStats: {
        growth: '<2hr Response',
        average: '99.9% Uptime'
      },
      chartData: Array.from({ length: 12 }, (_, i) => ({
        value: 90 + Math.random() * 10
      })),
      backContent: {
        title: 'Support Excellence',
        description: 'Round-the-clock support with guaranteed response times and high availability.',
        timeline: [
          { year: 'Response', achievement: '<2 Hours' },
          { year: 'Uptime', achievement: '99.9%' },
          { year: 'Satisfaction', achievement: '100%' }
        ]
      }
    }
  ];

  const NumberAnimation = ({ value, symbol }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
  
    useEffect(() => {
      if (!hasAnimated && isInView) {
        const duration = 2000;
        const steps = 60;
        let current = 0;
        const finalValue = value === '24/7' ? '24/7' : parseInt(value);
        
        if (value === '24/7') {
          setCount(value);
          return;
        }
  
        const stepValue = parseInt(value) / steps;
        
        const timer = setInterval(() => {
          current += stepValue;
          if (current >= finalValue) {
            setCount(finalValue);
            clearInterval(timer);
            setHasAnimated(true);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
  
        return () => clearInterval(timer);
      }
    }, [value, hasAnimated, isInView]);
  
    return (
      <span>
        {count}{symbol}
      </span>
    );
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
      y: 20
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
    <div className="stats-section">
      <div className="floating-particle"></div>
      <div className="floating-particle delay-1"></div>
      <div className="floating-particle delay-2"></div>
      <div className="container">
        <div className="section-header">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="title"
          >
            Our Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="description"
          >
            Delivering excellence through innovation and dedication. Our numbers speak for themselves.
          </motion.p>
        </div>

        <motion.div
          className="stats-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`stat-card ${flippedCards[index] ? 'flipped' : ''}`}
              onClick={() => toggleCard(index)}
            >
              <div className="card-face front">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">
                  <div className="circular-progress" style={{ 
                    background: `conic-gradient(from 0deg, #00ffc8 ${stat.progress}%, transparent ${stat.progress}%)` 
                  }}></div>
                  <NumberAnimation value={stat.number} symbol={stat.symbol} />
                </div>
                <div className="stat-label">{stat.label}</div>
                <div className="sub-stats">
                  <span>{stat.subStats.growth}</span>
                  <span>{stat.subStats.average}</span>
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stat.chartData}>
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#00ffc8"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-overlay">
                  <span className="flip-icon">
                    <ChevronRight size={20} />
                  </span>
                </div>
              </div>

              <div className="card-face back">
                <div className="back-content">
                  <div>
                    <h4 className="back-title">{stat.backContent.title}</h4>
                    <p className="back-description">{stat.backContent.description}</p>
                  </div>
                  <div className="timeline">
                    {stat.backContent.timeline.map((item, i) => (
                      <div key={i} className="timeline-item">
                        <span>{item.year}</span>
                        <span>{item.achievement}</span>
                      </div>
                    ))}
                  </div>
                  <button className="learn-more-button">Learn More</button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .stats-section {
          padding: 8rem 2rem;
          background: linear-gradient(135deg, #0a0a0f 0%, #1a1f35 100%);
          position: relative;
          overflow: hidden;
        }

        .stats-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 30%, rgba(0, 255, 200, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(0, 162, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .floating-particle {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 255, 200, 0.15) 0%, rgba(0, 162, 255, 0.05) 50%, transparent 70%);
          filter: blur(15px);
          animation: float 15s infinite linear;
          top: 20%;
          left: 15%;
        }

        .floating-particle.delay-1 {
          width: 200px;
          height: 200px;
          top: 60%;
          left: 75%;
          animation-delay: -5s;
          animation-duration: 20s;
          opacity: 0.4;
        }

        .floating-particle.delay-2 {
          width: 100px;
          height: 100px;
          top: 30%;
          left: 85%;
          animation-delay: -8s;
          animation-duration: 12s;
          opacity: 0.3;
        }

        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(50px, 50px) rotate(90deg); }
          50% { transform: translate(0, 100px) rotate(180deg); }
          75% { transform: translate(-50px, 50px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          background: linear-gradient(to right, #00ffc8, #00a2ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
          position: relative;
          display: inline-block;
        }

        .title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 3px;
          background: linear-gradient(to right, #00ffc8, #00a2ff);
          border-radius: 2px;
        }

        .description {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2.5rem;
          perspective: 1000px;
        }

        .stat-card {
          position: relative;
          height: 320px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }

        .stat-card.flipped {
          transform: rotateY(180deg);
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 24px;
          transition: all 0.3s ease;
        }

        .front {
          text-align: center;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .front::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 2px;
          background: linear-gradient(45deg, #00ffc8, #00a2ff);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          z-index: -1;
        }

        .front::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(0, 255, 200, 0.05) 0%, transparent 60%);
          opacity: 0;
          z-index: -2;
          transition: opacity 0.5s ease;
        }

        .stat-card:hover .front::after {
          opacity: 1;
        }

        .card-overlay {
          position: absolute;
          bottom: 10px;
          right: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat-card:hover .card-overlay {
          opacity: 0.8;
        }

        .flip-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #00ffc8;
}

.stat-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #00ffc8;
}

.stat-number {
  position: relative;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.circular-progress {
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  opacity: 0.3;
}

.stat-label {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
}

.sub-stats {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.chart-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  opacity: 0.5;
}

.back {
  transform: rotateY(180deg);
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 2px;
  background: linear-gradient(45deg, #00a2ff, #00ffc8);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  z-index: -1;
}

.back-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.back-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #00ffc8, #00a2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.back-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1.5rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.timeline-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.timeline-item:last-child {
  border-bottom: none;
}

.timeline-item span:first-child {
  font-weight: 600;
  color: #00ffc8;
}

.timeline-item span:last-child {
  color: rgba(255, 255, 255, 0.8);
}

.learn-more-button {
  background: linear-gradient(45deg, #00ffc8, #00a2ff);
  border: none;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #0a0a0f;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center;
}

.learn-more-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 162, 255, 0.2);
}

@media (max-width: 768px) {
  .stats-section {
    padding: 4rem 1rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
  
  .stat-card {
    height: 300px;
  }
  
  .circular-progress {
    width: 110px;
    height: 110px;
  }
  
  .stat-number {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    height: 280px;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
}
      `}</style>
    </div>
  );
};

export default EnhancedStats;