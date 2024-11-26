// components/about/CoreValues.js
import React from 'react';

const CoreValues = ({ isVisible }) => {
  return (
    <section 
      id="philosophy" 
      className={`section philosophy-section ${isVisible ? 'visible' : ''}`}
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
  );
};

export default CoreValues;