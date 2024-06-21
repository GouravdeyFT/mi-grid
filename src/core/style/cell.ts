import styled from 'styled-components';

export const StyledCellWrapper = styled.div<{
  theme: any;
  autoRowHeight?: boolean;
}>`
  /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning, layout/paint containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
  position: relative; /* needed for absolute positioning to work */
  padding-block: ${({ autoRowHeight }) => (autoRowHeight ? '8px' : 0)};
  padding-inline: 8px;
  border-inline-end: none;
  border: 2px solid transparent;
  border-block-end: 1px solid
    ${({ theme }: { theme: any }) => theme.table.borderColor};
  grid-row-start: var(--rdg-grid-row-start);
  background: ${({ theme }: { theme: any }) => theme.common.paper};

  white-space: ${({ autoRowHeight }) => (autoRowHeight ? 'normal' : 'nowrap')};
  overflow: ${({ autoRowHeight }) => (autoRowHeight ? 'unset' : 'clip')};
  text-overflow: ${({ autoRowHeight }) =>
    autoRowHeight ? 'unset' : 'ellipsis'};
  outline: none;
  // user-select: none;

  &.rdg-cell {
    color: ${({ theme }: { theme: any }) => theme.table.textColor};
  }

  &.show-border {
    border-inline-end: 1px solid
      ${({ theme }: { theme: any }) => theme.table.borderColor};
  }

  &.cell-frozen {
    position: sticky;
    z-index: 1;
  }
  &.rdg-cell-frozen {
    left: 0;
  }
  &.rdg-cell-frozen-right {
    right: 0;
  }
  .right-data-scrolled &.rdg-cell-frozen-first {
    box-shadow: calc(5px * var(--rdg-sign-right)) 0 5px -2px rgba(136, 136, 136, 0.3);
  }
  .left-data-scrolled &.rdg-cell-frozen-last {
    box-shadow: calc(5px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
  }
`;

export const cellClassname = 'rdg-cell';

export const CellFrozen = styled.div`
  position: sticky;
  /* Should have a higher value than 0 to show up above unfrozen cells */
  z-index: 1;

  &.rdg-cell-frozen {
    left: 0;
  }
  &.rdg-cell-frozen-right {
    right: 0;
  }
`;

export const cellFrozenClassname = 'cell-frozen rdg-cell-frozen';
export const cellFrozenRightClassname = 'cell-frozen rdg-cell-frozen-right';

export const CellFrozenLast = styled.div`
  box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  &.rdg-cell-frozen-first {
    box-shadow: calc(2px * var(--rdg-sign-right)) 0 5px -2px rgba(136, 136, 136, 0.3);
  }
`;

export const cellFrozenFirstClassname = 'rdg-cell-frozen-first';
export const cellFrozenLastClassname = 'rdg-cell-frozen-last';
