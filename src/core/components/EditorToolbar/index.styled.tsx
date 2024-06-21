import { Button, Input } from 'antd';
import styled from 'styled-components';
import { rgba } from 'polished';

export const StyledRoot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

export const StyledToolbarRoot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1px;
  padding: 5px;
  background-color: ${({ theme }: { theme: any }) =>
    rgba(theme.palette.primary, 0.11)};
  border: 1px solid ${({ theme }: { theme: any }) => theme.border.baseColor};
  border-radius: ${({ theme }: { theme: any }) =>
    theme.sizes.borderRadius.base};
`;

export const StyledInput = styled(Input)`
  border-radius: ${({ theme }) => theme.sizes.borderRadius.base};

  &.ant-input-affix-wrapper {
    height: 36px;
  }

  & .ant-input-number-handler-wrap {
    border-start-end-radius: ${({ theme }) => theme.sizes.borderRadius.base};
    border-end-end-radius: ${({ theme }) => theme.sizes.borderRadius.base};
  }
`;

export const StyledButton = styled(Button)`
  &.selected {
    background-color: ${({ theme }: { theme: any }) =>
      rgba(theme.palette.primary, 0.17)};
  }
`;
export const StyledColorButton = styled(StyledButton)`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const StyledFillColor = styled.div`
  width: 14px;
  height: 4px;
  margin-top: 2px;
`;
