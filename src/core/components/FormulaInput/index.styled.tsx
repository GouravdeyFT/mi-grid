import { Input } from 'antd';
import styled from 'styled-components';

export const StyledFormulaInput = styled(Input)`
  width: 100%;
  border-radius: ${({ theme }) => theme.sizes.borderRadius.base};
  margin-bottom: 10px;

  &.ant-input-affix-wrapper {
    height: 33px;
  }

  & .ant-input-number-handler-wrap {
    border-start-end-radius: ${({ theme }) => theme.sizes.borderRadius.base};
    border-end-end-radius: ${({ theme }) => theme.sizes.borderRadius.base};
  }
`;
