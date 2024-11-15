import React from 'react';
import { Link } from 'react-router-dom';

const SectionHome: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Sections</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
        <Link to="/section-masculine-junior">
          <button style={buttonStyle}>Section Masculine Junior</button>
        </Link>
        <Link to="/section-masculine-senior">
          <button style={buttonStyle}>Section Masculine Senior</button>
        </Link>
        <Link to="/section-feminine-junior">
          <button style={buttonStyle}>Section Feminine Junior</button>
        </Link>
        <Link to="/section-feminine-senior">
          <button style={buttonStyle}>Section Feminine Senior</button>
        </Link>
      </div>
      <br />
      <br />
      <br />
      </div>

  );
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
};

export default SectionHome;
