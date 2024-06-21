import React, { useEffect, useMemo } from 'react';
import { Typography } from 'antd';
import type { MenuItemProps, TableCellItemProps } from '@mi/models/MiTable';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
import { SelectCellState } from '../../DataGrid';
import ConfirmWindow from '../ConfirmWindow';
import {
  StyledInfoWrapper,
  StyledMenu,
  StyledMenuItem,
  StyledSumResult,
} from './index.style';
import ModalWindow from '../ModalWindow';
import NewColumnWindow from '../NewColumnWindow';

const { Paragraph } = Typography;

const MenuItem = ({
  label,
  icon,
  onClick,
  confirmWindowProps,
}: MenuItemProps) => {
  return confirmWindowProps ? (
    <ConfirmWindow {...confirmWindowProps}>
      <StyledMenuItem>
        {icon}
        <span>{label}</span>
      </StyledMenuItem>
    </ConfirmWindow>
  ) : (
    <StyledMenuItem onClick={onClick}>
      {icon}
      <span>{label}</span>
    </StyledMenuItem>
  );
};

type Props = {
  onCloseModal: () => void;
  selectedPosition: SelectCellState;
  draggedOverCellIdx: number;
  draggedOverRowIdx: number;
  rows: readonly any[];
  columns: readonly any[];
  onInsertRows?: (rowIdx: number, count: number) => void;
  onDeleteRows?: (rowIdx: number, count: number) => void;
  onInsertCell?: (data: TableCellItemProps) => void;
  onDeleteCells?: (startIdx: number, count: number) => void;
  [key: string]: any;
};

const SelectedCellOptions = ({
  open,
  onCloseModal,
  selectedPosition,
  draggedOverCellIdx,
  draggedOverRowIdx,
  rows,
  columns,
  onInsertRows,
  onDeleteRows,
  onInsertCell,
  onDeleteCells,
  ...restProps
}: Props) => {
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const [result, setResult] = React.useState<any>(null);
  const { idx, rowIdx } = selectedPosition;
  const startIdx = Math.min(idx, draggedOverCellIdx);
  const endIdx = Math.max(idx, draggedOverCellIdx);
  const totalSelectedCells = endIdx - startIdx + 1;
  const startRowIdx = Math.min(rowIdx, draggedOverRowIdx);
  const endRowIdx = Math.max(rowIdx, draggedOverRowIdx);
  const totalSelectedRows = endRowIdx - startRowIdx + 1;

  useEffect(() => {
    setResult(null);
  }, [open]);

  const sumTheValues = () => {
    let total = 0;
    for (let i = startRowIdx; i <= endRowIdx; i++) {
      const row = rows[i]; // get the row
      const column = columns[startIdx]; // get the cell
      const numVal = +row[column.dataIndex];

      total += isNaN(numVal) ? 0 : numVal;
    }

    setResult(total);
  };

  /**
   * Handle Insert rows
   * @param rowIndex
   */
  const handleInsertRows = (rowIndex: number) => {
    onInsertRows?.(rowIndex, totalSelectedRows);
    onCloseModal();
  };

  /**
   * Handle delete row(s)
   */
  const handleDeleteRows = () => {
    onDeleteRows?.(startRowIdx, totalSelectedRows);
    onCloseModal();
  };

  const onClickAddColumn = () => {
    setOpenAddModal(true);
  };

  const handleInsertColumn = (data: any) => {
    onInsertCell?.(data);
    setOpenAddModal(false);
    setTimeout(() => {
      onCloseModal();
    }, 100);
  };

  /**
   * Handle delete cell(s)
   */
  const handleDeleteCells = () => {
    onDeleteCells?.(startIdx - 1, totalSelectedCells);
    onCloseModal();
  };

  const items = useMemo((): MenuItemProps[] => {
    const menuItems: MenuItemProps[] = [];

    if (startIdx === endIdx && rows[startRowIdx] && columns[startIdx]) {
      const startRow = rows[startRowIdx]; // get the start row
      const startColumn = columns[startIdx]; // get the cell
      const startIdxValue = +startRow[startColumn.dataIndex];

      const endRow = rows[endRowIdx]; // get the end row
      const endColumn = columns[endIdx]; // get the cell
      const endIdxValue = +endRow[endColumn.dataIndex];

      if (!isNaN(startIdxValue) || !isNaN(endIdxValue)) {
        menuItems.push({
          label: 'SUM',
          icon: <MdAdd fontSize={18} />,
          onClick: sumTheValues,
        });
      }
    }

    if (onInsertRows) {
      menuItems.push({
        icon: <MdAdd fontSize={18} />,
        label:
          totalSelectedRows > 1
            ? `Insert ${totalSelectedRows} rows above`
            : `Insert row above`,
        onClick: () => handleInsertRows(startRowIdx),
      });

      menuItems.push({
        icon: <MdAdd fontSize={18} />,
        label:
          totalSelectedRows > 1
            ? `Insert ${totalSelectedRows} rows below`
            : `Insert row below`,
        onClick: () => handleInsertRows(endRowIdx + 1),
      });
    }

    if (onDeleteRows && rows.length > 1) {
      menuItems.push({
        icon: <MdDeleteOutline fontSize={20} />,
        label:
          totalSelectedRows > 1
            ? `Delete rows ${startRowIdx + 1} - ${endRowIdx + 1}`
            : 'Delete row',
        confirmWindowProps: {
          onConfirm: handleDeleteRows,
          title: `Delete ${totalSelectedRows > 1 ? 'Rows' : 'Row'}`,
          message: `Are you sure to delete ${
            totalSelectedRows > 1 ? 'these rows' : 'this row'
          }?`,
        },
      });
    }

    if (onInsertCell) {
      menuItems.push({
        icon: <MdAdd fontSize={18} />,
        label: `Add column`,
        onClick: onClickAddColumn,
      });
    }

    if (onDeleteCells && columns.length > 1) {
      menuItems.push({
        icon: <MdDeleteOutline fontSize={20} />,
        label:
          totalSelectedCells > 1
            ? `Delete columns ${startIdx + 1} - ${endIdx + 1}`
            : 'Delete column',
        confirmWindowProps: {
          onConfirm: handleDeleteCells,
          title: `Delete  ${totalSelectedCells > 1 ? 'Columns' : 'Column'}`,
          message: `Are you sure to delete ${
            totalSelectedCells > 1 ? 'these columns' : 'this column'
          }?`,
        },
      });
    }

    return [
      ...menuItems,
      /*{
        icon: <MdContentCopy fontSize={16} />,
        label: 'Copy',
        onClick: handleDeleteRows,
      },
      {
        icon: <MdContentPaste fontSize={16} />,
        label: 'Paste',
        onClick: handleDeleteRows,
      },*/
    ];
  }, [rows, startIdx, endIdx, startRowIdx, endRowIdx, columns]);

  return (
    <ModalWindow
      open={open}
      onCancel={onCloseModal}
      maskClosable={false}
      footer={null}
      width={230}
      centered
      {...restProps}
    >
      <StyledInfoWrapper>
        <Paragraph>
          <strong>Selected Rows </strong>
          <span>
            : {startRowIdx + 1} to {endRowIdx + 1}
          </span>
        </Paragraph>

        <Paragraph>
          <strong>Selected Cells </strong>
          <span>
            : {startIdx + 1} to {endIdx + 1}
          </span>
        </Paragraph>
      </StyledInfoWrapper>

      {result && (
        <StyledSumResult>
          <strong>Total </strong>
          <span>: {result}</span>
        </StyledSumResult>
      )}

      <StyledMenu>
        {items.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </StyledMenu>

      {(endIdx || startIdx) >= 0 && (
        <NewColumnWindow
          open={openAddModal}
          onCancel={() => setOpenAddModal(false)}
          columns={columns}
          idx={endIdx || startIdx}
          onAddColumn={handleInsertColumn}
        />
      )}
    </ModalWindow>
  );
};

export default SelectedCellOptions;
