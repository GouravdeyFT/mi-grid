import React, { Fragment, useMemo, useState } from 'react';
import { Typography } from 'antd';
import type {
  MenuItemProps,
  TableCellItemProps,
  UndoRedoProcessProps,
} from '@mi/models/MiTable';
import {
  MdAdd,
  MdContentCut,
  MdContentCopy,
  MdContentPaste,
  MdDeleteOutline,
  MdRedo,
  MdUndo,
} from 'react-icons/md';
import ModalWindow from '../ModalWindow';
import NewColumnWindow from '../NewColumnWindow';
import { SelectCellState } from '../../DataGrid';
import Menus from '../Menus';
import { getMinMaxIdx } from '../../utils';

const { Text } = Typography;

type Props = {
  onCloseModal: () => void;
  rows: readonly any[];
  columns: readonly any[];
  selectedPosition: SelectCellState;
  draggedOverCellIdx: number;
  draggedOverRowIdx: number;
  onInsertRows?: (
    rowIdx: number,
    count: number,
    callback?: (data: UndoRedoProcessProps) => void,
  ) => void;
  onDeleteRows?: (
    rowIdx: number,
    count: number,
    callback?: (data: UndoRedoProcessProps) => void,
  ) => void;
  onInsertCell?: (
    data: TableCellItemProps,
    callback?: (data: UndoRedoProcessProps) => void,
  ) => void;
  onDeleteCells?: (
    startIdx: number,
    count: number,
    callback?: (data: UndoRedoProcessProps) => void,
  ) => void;
  saveVersionHistory(data: UndoRedoProcessProps): void;
  canUndo: boolean;
  onUndo: () => void;
  canRedo: boolean;
  onRedo: () => void;
  onCut: () => void;
  onCopy: () => void;
  onPaste: () => void;
  [key: string]: any;
};

const ContextWindow = ({
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
  saveVersionHistory,
  canUndo,
  onUndo,
  canRedo,
  onRedo,
  onCut,
  onCopy,
  onPaste,
  ...restProps
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const { idx, rowIdx } = selectedPosition;
  const [startIdx, endIdx] = getMinMaxIdx(idx, draggedOverCellIdx);
  const totalSelectedCells = endIdx - startIdx + 1;
  const [startRowIdx, endRowIdx] = getMinMaxIdx(rowIdx, draggedOverRowIdx);
  const totalSelectedRows = endRowIdx - startRowIdx + 1;

  /**
   * Handle Cut
   */
  const handleCut = () => {
    onCut?.();
    onCloseModal();
  };

  /**
   * Handle Copy
   */
  const handleCopy = () => {
    onCopy?.();
    onCloseModal();
  };

  /**
   * Handle Paste
   */
  const handlePaste = () => {
    onPaste?.();
    onCloseModal();
  };

  /**
   * Handle Insert rows
   * @param rowIndex
   */
  const handleInsertRows = (rowIndex: number) => {
    onInsertRows?.(rowIndex, totalSelectedRows, saveVersionHistory);
    onCloseModal();
  };

  /**
   * Handle delete row(s)
   */
  const handleDeleteRows = () => {
    onDeleteRows?.(startRowIdx, totalSelectedRows, saveVersionHistory);
    onCloseModal();
  };

  const onClickAddColumn = () => {
    setOpenModal(true);
  };

  const handleInsertColumn = (data: any) => {
    onInsertCell?.(data, saveVersionHistory);
    setOpenModal(false);
    setTimeout(() => {
      onCloseModal();
    }, 100);
  };

  /**
   * Handle delete cell(s)
   */
  const handleDeleteCells = () => {
    onDeleteCells?.(startIdx - 1, totalSelectedCells, saveVersionHistory);
    onCloseModal();
  };

  const items = useMemo((): MenuItemProps[] => {
    const menuItems: MenuItemProps[] = [];

    if (totalSelectedCells > 0) {
      menuItems.push({
        icon: <MdContentCut fontSize={16} />,
        label: (
          <Fragment>
            Cut <Text type='secondary'>(Ctrl + X)</Text>
          </Fragment>
        ),
        onClick: handleCut,
      });

      menuItems.push({
        icon: <MdContentCopy fontSize={16} />,
        label: (
          <Fragment>
            Copy <Text type='secondary'>(Ctrl + C)</Text>
          </Fragment>
        ),
        onClick: handleCopy,
      });

      menuItems.push({
        icon: <MdContentPaste fontSize={16} />,
        label: (
          <Fragment>
            Paste <Text type='secondary'>(Ctrl + V)</Text>
          </Fragment>
        ),
        onClick: handlePaste,
        // disabled: !isDataCopied,
      });
    }

    if (onUndo) {
      menuItems.push({
        icon: <MdUndo fontSize={18} />,
        label: (
          <Fragment>
            Undo <Text type='secondary'>(Ctrl + Z)</Text>
          </Fragment>
        ),
        onClick: canUndo ? onUndo : () => {},
        disabled: !canUndo,
      });
    }

    if (onRedo) {
      menuItems.push({
        icon: <MdRedo fontSize={18} />,
        label: (
          <Fragment>
            Redo <Text type='secondary'>(Ctrl + Alt + Z)</Text>
          </Fragment>
        ),
        onClick: canRedo ? onRedo : () => {},
        disabled: !canRedo,
      });
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

    if (onInsertCell && idx > 0) {
      menuItems.push({
        icon: <MdAdd fontSize={18} />,
        label: `Add column`,
        onClick: onClickAddColumn,
      });
    }

    if (onDeleteCells && columns.length > 1 && idx > 0) {
      menuItems.push({
        icon: <MdDeleteOutline fontSize={20} />,
        label:
          totalSelectedCells > 1
            ? `Delete columns ${startIdx} - ${endIdx}`
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

    return menuItems;
  }, [rows, startIdx, endIdx, startRowIdx, endRowIdx, columns]);

  return (
    <ModalWindow
      open={open}
      onCancel={onCloseModal}
      // maskClosable={false}
      mask={false}
      closable={false}
      footer={null}
      width={230}
      centered
      {...restProps}
    >
      <Menus items={items} />

      {idx >= 0 && (
        <NewColumnWindow
          open={openModal}
          onCancel={() => setOpenModal(false)}
          columns={columns}
          idx={idx}
          onAddColumn={handleInsertColumn}
        />
      )}
    </ModalWindow>
  );
};

export default ContextWindow;
