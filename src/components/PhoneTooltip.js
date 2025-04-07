import React, { useState } from 'react';

function PhoneTooltip({ phoneNumber }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <span 
      className="phone-link"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      phone
      {showTooltip && (
        <div className="phone-tooltip">
          {phoneNumber}
        </div>
      )}
    </span>
  );
}

export default PhoneTooltip; 