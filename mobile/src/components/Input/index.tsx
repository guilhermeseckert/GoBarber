import React, {
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
  useState,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput, Icon } from './styles';

interface InputPros extends TextInputProps {
  name: string;
  icon: string;
  containerStyele?: {};
}

interface InputValueReference {
  value: string;
}
interface InputRef {
  focus(): void;
}

// eslint-disable-next-line react/prop-types
const Input: React.RefForwardingComponent<InputRef, InputPros> = (
  { name, icon, containerStyele = {}, ...rest },
  ref,
) => {
  const InputElementRef = useRef<any>(null);
  const { registerField, defaultValue, fieldName, error } = useField(name);

  const [isFocused, setIsfocused] = useState(false);

  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsfocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsfocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  useImperativeHandle(ref, () => ({
    focus() {
      InputElementRef.current.focus();
    },
  }));
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        InputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputValueRef.current.clear();
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container
      style={containerStyele}
      isFocused={isFocused}
      isErrored={!!error}
    >
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
      />
      <TextInput
        ref={InputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
