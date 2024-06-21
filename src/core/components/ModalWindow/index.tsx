import React from 'react';
import { type ModalProps } from 'antd';
import { StyledModal } from './index.style';

const ModalWindow = (props: ModalProps) => {
  return <StyledModal {...props} />;
};

export default ModalWindow;
