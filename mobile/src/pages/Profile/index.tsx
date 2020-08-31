import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton,
} from './styles';
import getValidationErros from '../../utils/getValidationErros';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  // eslint-disable-next-line camelcase
  old_password: string;
  // eslint-disable-next-line camelcase
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const { user, updatedUser } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const emailInputRef = useRef<TextInput>(null);
  const oldpasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSingUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('E-mail is required')
            .email('E-mail need to be valid'),
          old_password: Yup.string(),

          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Is required'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Is required'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          // eslint-disable-next-line camelcase
          old_password,
          password,
          // eslint-disable-next-line camelcase
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(data.old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updatedUser(response.data);

        Alert.alert(
          'Profile atualized with sucessefull',
          'Enjoy the aplication',
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);
          return;
        }
        Alert.alert(
          'Updated failed',
          'Updated Failed - Please Check your information',
        );
      }
    },
    [navigation],
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={23} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={() => {}}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>
            <View>
              <Title>My Profile </Title>
            </View>
            <Form initialData={user} ref={formRef} onSubmit={handleSingUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldpasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldpasswordInputRef}
                secureTextEntry
                name="old_passowrd"
                icon="lock"
                placeholder="old password"
                textContentType="newPassword"
                returnKeyType="next"
                containerStyele={{ marginTop: 16 }}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="New password"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />

              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirme new password"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Confirme changes
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
