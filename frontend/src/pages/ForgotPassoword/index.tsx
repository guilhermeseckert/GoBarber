/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErros';
import { useToast } from '../../hooks/Toast';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  // const history = useHistory();
  const handleSubmit = useCallback(
    async (data: ForgotPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail is required')
            .email('E-mail need to be valid'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // reset password

        // history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);
          return;
        }
        addToast({
          type: 'error',
          title: 'Password recover failed',
          description: 'Reset Password Failed - Please Check your E-mail',
        });
      }
    },
    [addToast],
  );
  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Reset password</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button type="submit">Reset</Button>
          </Form>

          <Link to="/signin">
            <FiLogIn />
            Back to home
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  );
};

export default ForgotPassword;
