import React from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { StyledButton } from './index.styled';
import { MdOutlineFunctions } from 'react-icons/md';
import { SelectCellState } from '../../DataGrid';
import { CalculatedColumn } from '../..';
import { getMinMaxIdx } from '../../utils';

type Props<R> = {
  columns: readonly CalculatedColumn<R, any>[];
  selectedPosition: SelectCellState;
  draggedOverCellIdx?: number;
  draggedOverRowIdx?: number;
  onUpdateFormula(position: SelectCellState, customValue?: string): void;
};

const operations = ['SUM', 'AVERAGE', 'PRODUCT', 'MIN', 'MAX'];

function FormulaMenu<R>({
  columns,
  selectedPosition,
  draggedOverCellIdx,
  draggedOverRowIdx,
  onUpdateFormula,
}: Props<R>) {
  const { idx, rowIdx } = selectedPosition;
  const [startIdx, endIdx] = getMinMaxIdx(idx, draggedOverCellIdx);
  const [startRowIdx, endRowIdx] = getMinMaxIdx(rowIdx, draggedOverRowIdx);

  const constructFormula = (operator: string) => {
    let startPos = columns[startIdx].alphaIdx + (startRowIdx + 1);
    let endPos = columns[endIdx].alphaIdx + (endRowIdx + 1);
    const formula = `=${operator}(${startPos}:${endPos})`;

    if (endRowIdx - startRowIdx > 0) {
      onUpdateFormula(
        { idx: startIdx, rowIdx: endRowIdx + 1 } as SelectCellState,
        formula,
      );
    } else {
      onUpdateFormula(
        { idx: endIdx + 1, rowIdx: startRowIdx } as SelectCellState,
        formula,
      );
    }
  };

  const menuItems: MenuProps['items'] = operations.map((item) => ({
    key: item,
    label: item,
    onClick: () => constructFormula(item),
  }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      placement='bottom'
      disabled={!draggedOverCellIdx}
    >
      <StyledButton size='small' type='text'>
        <MdOutlineFunctions fontSize={18} />
      </StyledButton>
    </Dropdown>
  );
}

export default FormulaMenu;
