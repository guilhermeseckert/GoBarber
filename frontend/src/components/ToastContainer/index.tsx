import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';
import { Container, Toast } from './styles';

const ToastContainer: React.FC = () => {
  return (
    <Container>
      <Toast hasDescription>
        <FiAlertCircle size={20} />
        <div>
          <strong>Validation Error</strong>
          <p>Login fail</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>
      <Toast hasDescription={false} type="success">
        <FiAlertCircle size={20} />
        <div>
          <strong>Validation Error</strong>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>
      <Toast type="error" hasDescription>
        <FiAlertCircle size={20} />
        <div>
          <strong>Validation Error</strong>
          <p>Login fail</p>
        </div>

        <button type="button">
          <FiXCircle size={18} />
        </button>
      </Toast>
    </Container>
  );
};
export default ToastContainer;
