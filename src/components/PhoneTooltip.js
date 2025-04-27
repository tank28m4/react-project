import React, { useState } from 'react';

const PhoneTooltip = ({ phoneNumber }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };
  
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };
  
  return (
    <span 
      className="phone-link"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      phone
      {showTooltip && (
        <div className="phone-tooltip">
          {phoneNumber}
        </div>
      )}
    </span>
  );
};

export default PhoneTooltip; 