import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .required('E-mail is required')
          .email('E-mail need to be valid'),
        password: Yup.string().min(
          6,
          'password need to be minimum 6 characters',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const erros = getValidationErros(err);
      formRef.current?.setErrors(erros);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Create your account</h1>
          <Input name="name" icon={FiUser} placeholder="Name" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Register</Button>
        </Form>

        <a href="login">
          <FiArrowLeft />
          Back to home page
        </a>
      </Content>
    </Container>
  );
};
export default SingUp;
