import React, { Component } from 'react';

class PhoneTooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false
    };
    
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  
  handleMouseEnter() {
    this.setState({ showTooltip: true });
  }
  
  handleMouseLeave() {
    this.setState({ showTooltip: false });
  }
  
  render() {
    const { phoneNumber } = this.props;
    const { showTooltip } = this.state;
    
    return (
      <span 
        className="phone-link"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
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
}

export default PhoneTooltip; 