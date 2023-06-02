import React, {FormEvent, useState} from 'react';
import {login} from 'services/session-service';
import styled from 'styled-components';

const StyledForm = styled.form`
  * {
    font-family: 'Work Sans', sans-serif;
    font-size: 15px;
  }

  gap: 10px;
  transition: max-height 0.5s ease 0s;
  width: 310px;
  max-width: 400px;
  overflow-y: hidden;
  border-radius: 5px;
  background-color: #eff2f8;
  box-shadow: 0px 2px 5px 0px #eff2f8;
  color: #000000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  display: flex;
  flex-direction: column;
  padding: 20px;

  & .form-error {
    color: #ff3636;
    font-weight: 600;
    margin-bottom: -2px;
  }

  & input {
    height: 26px;
    padding: 16px 10px;
    border-radius: 4px;
    width: 100%;
    border: none;
    color: #000000;
    background-color: white;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
`;
const StyledButton = styled.button`
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
  margin-top: 8px;
  cursor: pointer;
  padding: 6px 10px;
  text-decoration: none;
  color: white;
  border: 1px solid #0049ef;
  background-color: #0049ef;
  height: 34px;
  width: 100%;
  transition: all .18s ease-in-out;
  border-radius: 4px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: white;
    color: #0049ef;
    box-shadow: 0px 2px 5px 0px #0049ef;
  }
`;

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        setIsError(false);
        setIsLoading(true);
        const isAuthSuccess: boolean = await login({username: username, password: password});
        setIsLoading(false);

        if (isAuthSuccess) {
            window.location.reload();
        } else {
            setIsError(true);
        }

    };

    return (
        <StyledForm onSubmit={handleSubmit} id='login-form'>
            <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Login" name="login"
                   disabled={isLoading}/>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" name="password"
                   disabled={isLoading}/>
            {isError && <div className="form-error">Incorrect login or password</div>}
            <StyledButton type="submit" disabled={isLoading}>
                login
            </StyledButton>
            <div>Login: axelote</div>
            <div>Password: axelote</div>
        </StyledForm>
    );
};

export default LoginForm;
