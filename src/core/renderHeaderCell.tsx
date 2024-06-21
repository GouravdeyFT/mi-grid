import React, { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Button, Popover, Select } from 'antd';
import styled from 'styled-components';
// import './index.css';

import type { FilterDataType, RenderHeaderCellProps } from '@mi/models/MiTable';
import { useDefaultRenderers } from './DataGridDefaultRenderersProvider';
import { FilterFilled, SearchOutlined } from '@ant-design/icons';
import { appLog } from './utils';
import { useDataGridConfiguration } from './DataGridContext';

const StyledHeaderRoot = styled.span`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const StyledFilterIcon = styled.span<{ fillcolor: string }>`
  cursor: pointer;
  color: ${(props) =>
    props.fillcolor !== ''
      ? props.fillcolor
      : ({ theme }: { theme: any }) => theme.table.headerIconColor};
`;

const StyledHeaderName = styled.span`
  flex-grow: 1;
  overflow: hidden;
  overflow: clip;
  text-overflow: ellipsis;
`;

const StyledHeaderSortWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const StyledPopoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 180px;
`;

const StyledActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export default function renderHeaderCell<R, SR>({
  column,
  sortDirection,
  priority,
  onFilter,
  filterValue,
  headerColumnOptions,
  onSort,
  onClick,
}: RenderHeaderCellProps<R, SR>) {
  const gridConfig = useDataGridConfiguration();

  return (
    <StyledHeaderRoot>
      {column.sorter ? (
        <SortableHeaderCell
          column={column}
          sortDirection={sortDirection}
          priority={priority}
          onSort={onSort}
          onClick={onClick}
        >
          {column.title}{' '}
          {gridConfig.allowGridActions &&
          gridConfig.allowFormula &&
          column.alphaIdx
            ? `(${column.alphaIdx})`
            : ''}
        </SortableHeaderCell>
      ) : (
        <StyledHeaderName
          style={{ textAlign: column.align ?? 'left' }}
          className='rdg-header-name'
          onClick={onClick}
        >
          {column.title}{' '}
          {gridConfig.allowGridActions &&
          gridConfig.allowFormula &&
          column.alphaIdx
            ? `(${column.alphaIdx})`
            : ''}
        </StyledHeaderName>
      )}

      <FilterHeaderCell
        filterValue={filterValue}
        column={column}
        onFilter={onFilter}
      />

      {headerColumnOptions}
    </StyledHeaderRoot>
  );
}

type SharedHeaderCellProps<R, SR> = Pick<
  RenderHeaderCellProps<R, SR>,
  'sortDirection' | 'priority' | 'column' | 'onSort' | 'onClick'
>;

type SharedFilterHeaderCellProps<R, SR> = Pick<
  RenderHeaderCellProps<R, SR>,
  'filterValue' | 'column' | 'onFilter'
>;

interface SortableHeaderCellProps<R, SR> extends SharedHeaderCellProps<R, SR> {
  children: ReactNode;
}

function FilterHeaderCell<R, SR>({
  filterValue,
  column,
  onFilter,
}: SharedFilterHeaderCellProps<R, SR>) {
  const [open, onOpen] = useState(false);
  const [hasFilter, onSetFilter] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<FilterDataType>([]);

  useEffect(() => {
    if (filterValue) {
      setSelectedKeys(filterValue);
      onSetFilter(filterValue?.length > 0);
    }
  }, [filterValue]);

  const onSelectChange = (newValue: string) => {
    setSelectedKeys([newValue]);
  };

  const onConfirm = () => {
    onFilter(column.dataIndex, selectedKeys);
    onOpen(false);
  };

  const onClear = () => {
    setSelectedKeys([]);
    onFilter(column.dataIndex, null);
    onSetFilter(false);
    onOpen(false);
  };

  const onInputChange = (keys: FilterDataType) => {
    setSelectedKeys(keys);
  };

  const onOpenChange = (visible: boolean) => {
    appLog('onOpenChange: ', visible);
    onOpen(visible);
  };

  return column.filterDropdown ?? column.filters ? (
    <Popover
      placement='bottom'
      trigger='click'
      open={open}
      rootClassName='table-filter'
      content={
        column.filters ? (
          <StyledPopoverContainer>
            <StyledActionContainer>
              <Select
                value={selectedKeys?.[0] as any}
                style={{
                  width: '100%',
                }}
                onChange={onSelectChange}
              >
                {column.filters.map((filter, index) => (
                  <Select.Option key={index} value={filter.value as string}>
                    {filter.text}
                  </Select.Option>
                ))}
              </Select>
            </StyledActionContainer>

            <StyledActionContainer>
              <Button onClick={onClear} size='small'>
                Reset
              </Button>
              <Button
                type='primary'
                onClick={onConfirm}
                icon={<SearchOutlined />}
                size='small'
              >
                Search
              </Button>
            </StyledActionContainer>
          </StyledPopoverContainer>
        ) : column.filterDropdown ? (
          column.filterDropdown({
            selectedKeys,
            setSelectedKeys: onInputChange,
            confirm: onConfirm,
            clearFilters: onClear,
            filters: column.filters,
            visible: hasFilter,
          })
        ) : null
      }
      onOpenChange={onOpenChange}
    >
      {column.filterIcon ? (
        column.filterIcon(hasFilter)
      ) : (
        <StyledFilterIcon fillcolor={hasFilter ? '#1890ff' : ''}>
          <FilterFilled />
        </StyledFilterIcon>
      )}
    </Popover>
  ) : null;
}

function SortableHeaderCell<R, SR>({
  column,
  sortDirection,
  priority,
  children,
  onSort,
  onClick,
}: SortableHeaderCellProps<R, SR>) {
  const renderSortStatus = useDefaultRenderers<R, SR>()!.renderSortStatus!;

  function onKeyDown(event: React.KeyboardEvent<HTMLSpanElement>) {
    if (event.key === ' ' || event.key === 'Enter') {
      // prevent scrolling
      event.preventDefault();
      onSort(event.ctrlKey || event.metaKey);
    }
  }

  return (
    <>
      <StyledHeaderName
        style={{ textAlign: column.align ?? 'left' }}
        className='rdg-header-name'
        onClick={onClick}
      >
        {children}
      </StyledHeaderName>
      <StyledHeaderSortWrapper
        onKeyDown={column.sorter ? onKeyDown : undefined}
        onClick={(event) => {
          onSort(event.ctrlKey || event.metaKey);
        }}
      >
        {renderSortStatus({ sortDirection, priority })}
      </StyledHeaderSortWrapper>
    </>
  );
}
