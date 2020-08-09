import React from 'react';
import { Image } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';
import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />

      <Title>Login </Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Password" />

      <Button
        onPress={() => {
          console.log('test');
        }}
      >
        Join
      </Button>
    </Container>
  );
};

export default SignIn;
