import styled from 'styled-components';

export const StyledRowWrapper = styled.div`
  display: contents;
  // line-height: var(--rdg-row-height);
  min-height: var(--rdg-row-height);

  &.row-dragging {
    opacity: 0.5;
  }
  &.row-over {
    background: #ececec;
  }

  &.last-row {
    .rdg-cell {
      border-block-end: none !important;
    }
  }

  &[aria-selected='true'] {
    &:hover {
      .rdg-cell {
        background: ${({ theme }: { theme: any }) => theme.table.selectedHover};
      }
    }
  }
`;

export const rowClassname = 'rdg-row';

export const rowHidden = 'rdg-hidden';

export const rowSelectedClassname = 'rdg-row-selected';
