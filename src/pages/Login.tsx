import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { loginSuccess, loginFailed } from '../store/slices/authSlice';
import styled from 'styled-components';

const LoginSection = styled.div`
  background-color: var(--background-color);
  padding: 80px 20px;
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginTitle = styled.h1`
  font-family: Inter, sans-serif;
  color: var(--text-color);
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 30px;
  text-align: center;
`;

const LoginContainer = styled.div`
  max-width: 650px;
  width: 100%;
  margin: 0 auto;
  padding: 40px;
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

interface FormGroupProps {
  marginBottom?: string;
}

const FormGroup = styled.div<FormGroupProps>`
  margin-bottom: ${props => props.marginBottom || '20px'};
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  width: 120px;
  font-weight: 500;
  font-size: 16px;
  margin-right: 15px;
  color: var(--text-color);
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  font-size: 16px;
  background-color: var(--background-color);
  color: var(--text-color);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  padding: 12px 30px;
  border-radius: 4px;
  border: none;
  background: var(--button-color);
  color: var(--button-text);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 12px 30px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background: var(--card-background);
  color: var(--text-color);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Login";
    
    if (!localStorage.getItem('users')) {
      const initialUsers = [
        { username: 'user', password: 'password' }
      ];
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.username === username && u.password === password);
    
    if (user) {
      dispatch(loginSuccess({
        id: '1',
        username: user.username,
        email: `${user.username}@example.com`
      }));
      alert('Login successful!');
      navigate('/');
    } else {
      dispatch(loginFailed('Invalid username or password'));
      alert('Invalid username or password');
    }
  };

  const handleCancel = (): void => {
    navigate('/');
  };

  return (
    <LoginSection>
      <LoginTitle>Log in</LoginTitle>
      
      <LoginContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>User name</Label>
            <Input 
              type="text" 
              value={username}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              placeholder="UserName" 
            />
          </FormGroup>
          
          <FormGroup marginBottom="30px">
            <Label>Password</Label>
            <Input 
              type="password" 
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="******************" 
            />
          </FormGroup>
          
          <ButtonContainer>
            <SubmitButton type="submit">
              Submit
            </SubmitButton>
            
            <CancelButton type="button" onClick={handleCancel}>
              Cancel
            </CancelButton>
          </ButtonContainer>
        </form>
      </LoginContainer>
    </LoginSection>
  );
};

export default Login; 