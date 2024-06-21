import styled from 'styled-components';

import type { CalculatedColumn } from '@mi/models/MiTable';

const StyledMeasuringCellClassname = styled.div`
  contain: strict;
  grid-row: 1;
  visibility: hidden;
`;

export function renderMeasuringCells<R, SR>(
  viewportColumns: readonly CalculatedColumn<R, SR>[],
) {
  return viewportColumns.map(({ key, dataIndex, idx, minWidth, maxWidth }) => (
    <StyledMeasuringCellClassname
      key={key}
      style={{ gridColumnStart: idx + 1, minWidth, maxWidth }}
      data-measuring-cell-key={dataIndex}
    />
  ));
}
