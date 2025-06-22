import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

interface ToggleButtonProps {
  $isDark: boolean;
}

const ToggleButton = styled.button<ToggleButtonProps>`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  padding: 5px;
  color: ${props => props.$isDark ? '#ffffff' : '#333333'};
`;

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <ToggleButton onClick={toggleTheme} $isDark={theme === 'dark'}>
      {theme === 'light' ? '🌙' : '☀️'}
    </ToggleButton>
  );
};

export default ThemeToggle; 