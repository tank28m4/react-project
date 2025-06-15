import React, { useState } from 'react';

interface PhoneTooltipProps {
  phoneNumber: string;
}

const PhoneTooltip: React.FC<PhoneTooltipProps> = ({ phoneNumber }) => {
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  
  const handleMouseEnter = (): void => {
    setShowTooltip(true);
  };
  
  const handleMouseLeave = (): void => {
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