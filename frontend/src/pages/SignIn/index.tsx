import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Login in</h1>
        <input placeholder="E-mail" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign in</button>
        <a href="forgot">Forgot password?</a>
      </form>

      <a href="login">
        <FiLogIn />
        Create new Account
      </a>
    </Content>

    <Background />
  </Container>
);

export default SignIn;
