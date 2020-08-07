import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputPrrops extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputPrrops> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Container>
);

export default Input;
