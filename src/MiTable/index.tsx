import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CellKeyboardEvent,
  CellKeyDownArgs,
  FilterType,
  MiTableProps,
  SortColumn,
} from '@mi/models/MiTable';
import { Empty, TablePaginationConfig } from 'antd';
import { PAGINATION_SIZE, tablePageSize } from '../../constants/AppConst';
import AppLoader from '../core/components/AppLoader';
import { StyledTableEmptyWrapper, StyledTableWrapper } from './index.styled';
import { SelectColumn } from '../core';
import DataGrid from '../core/DataGrid';
import TablePagination from '../core/TablePagination';
import { AppDraggableTable } from './DraggableTable';
import MiThemeProvider from '../core/context/MiThemeProvider';

function rowKeyGetter(row: any, rowKey: string) {
  return row?.[rowKey];
}

const sizeMap: Record<string, number> = {
  small: 39,
  middle: 47,
  large: 55,
};

function keysToSet(keys: React.Key[]): ReadonlySet<React.Key> {
  const numbers = keys.map((key) => key);
  return new Set(numbers);
}

const EMPTY_STATE_SIZE = 136;
const OFFSET_MARGIN = 120;

function paginateArray(data: any[], pagination: TablePaginationConfig) {
  const { pageSize, current } = pagination;

  if (pageSize && current) {
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Slice the data array to get the data for the current page
    return data.slice(startIndex, endIndex);
  }
  return [];
}

export const MiTable = ({
  columns,
  dataSource = [],
  loading,
  id,
  onChange,
  rowKey = 'id',
  className,
  rowSelection,
  pagination,
  isDraggable = false,
  size = 'small',
  bordered = false,
  onRowDragEnd,
  customRowHeight,
  defaultColumnOptions,
  extraHeight = 0,
  customBlockSize,
  fullHeight,
  hasLocalFilters = false,
  ...restProps
}: MiTableProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [localPaginated, setLocalPaginated] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);
  const [activeSortKey, setActiveSortKey] = useState<string | null>(null);
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([]);
  const [filters, setFilter] = useState<FilterType>({});
  const [selectedRows, setSelectedRows] = useState(
    (): ReadonlySet<React.Key> => new Set(),
  );

  const { hasChildren, extraRowSpanCount } = useMemo(() => {
    const hasChildren = columns?.find((item) => item?.children);
    const extraRowSpanCount = dataSource?.reduce(
      (acc, val) =>
        acc + (val?.row_span && val?.row_span > 2 ? val?.row_span - 2 : 0),
      0,
    );
    return {
      hasChildren,
      extraRowSpanCount,
    };
  }, [columns, dataSource]);

  const { blockSize } = useMemo(() => {
    const rowHeight =
      customRowHeight && typeof customRowHeight === 'number'
        ? customRowHeight
        : sizeMap[size];

    const headerRowHeight = sizeMap[size];

    const paginationHeight = pagination ? PAGINATION_SIZE : 0;

    const totalHeaderRowsHeight = hasChildren
      ? 2 * headerRowHeight
      : headerRowHeight;

    let totalRows;

    if (localPaginated) {
      totalRows =
        (rows?.length > tablePageSize ? tablePageSize : rows.length) +
        extraRowSpanCount;
    } else {
      totalRows =
        (dataSource?.length > tablePageSize
          ? tablePageSize
          : dataSource.length) + extraRowSpanCount;
    }

    let bodyHeight = 0;

    bodyHeight = rowHeight * totalRows;

    const blockSize =
      customBlockSize ||
      totalHeaderRowsHeight + bodyHeight + paginationHeight + 20;
    const minHeight = totalHeaderRowsHeight + EMPTY_STATE_SIZE + 100;

    return {
      blockSize,
      minHeight,
    };
  }, [
    hasChildren,
    customBlockSize,
    extraRowSpanCount,
    dataSource?.length,
    rows,
    localPaginated,
    pagination,
    size,
    customRowHeight,
  ]);
  useEffect(() => {
    if (dataSource) {
      const pageSize = (pagination as TablePaginationConfig)?.pageSize;
      if (pageSize && pageSize < dataSource?.length) {
        setLocalPaginated(true);
        setRows(paginateArray(dataSource, pagination as TablePaginationConfig));
      } else {
        setLocalPaginated(false);
        setRows(dataSource);
      }
    }
  }, [dataSource, pagination]);

  useEffect(() => {
    if (sortColumns?.length > 0) {
      setActiveSortKey(sortColumns[0].columnKey);
    }
  }, [sortColumns]);

  useEffect(() => {
    if (rowSelection?.selectedRowKeys) {
      setSelectedRows(keysToSet(rowSelection?.selectedRowKeys));
    }
  }, [rowSelection?.selectedRowKeys]);

  useEffect(() => {
    if (columns?.length && onChange) {
      if (sortColumns?.length === 0) {
        onChange(pagination, filters, {});
      } else {
        const sorterColumn = columns?.find(
          (item) => item.dataIndex === sortColumns[0].columnKey,
        );
        const sorter = {
          column: sorterColumn,
          order: sortColumns[0].direction === 'ASC' ? 'ascend' : 'descend',
          field: sortColumns[0].columnKey,
          columnKey: sortColumns[0].columnKey,
        };
        onChange(pagination, filters, sorter);
      }
    }
  }, [filters, sortColumns]);

  const sortedRows = useMemo(() => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const sortingColumn = columns.find(
          (item) => item.key === sort.columnKey,
        );
        if (sortingColumn?.sorter) {
          const compResult = sortingColumn.sorter(
            a,
            b,
            sort.columnKey,
            typeof a[sort.columnKey],
          );

          if (compResult !== 0) {
            return sort.direction === 'ASC' ? compResult : -compResult;
          }
        }
      }
      return 0;
    });
  }, [rows, sortColumns, columns]);

  if (rowSelection?.onChange) {
    columns = [SelectColumn, ...columns];
  }

  function onSetSelectedRows(keys: Set<React.Key>) {
    setSelectedRows(keys);
    if (rowKey) {
      const selectedRows = rows?.filter((item) => keys.has(item?.[rowKey]));

      if (rowSelection?.onChange) {
        rowSelection?.onChange([...keys], selectedRows);
      }
    }
  }

  function handleCellKeyDown(
    args: CellKeyDownArgs<any>,
    event: CellKeyboardEvent,
  ) {
    event.preventGridDefault();
  }

  return (
    <MiThemeProvider>
      <StyledTableWrapper
        className={`main-table ${className ?? ''}`}
        style={{
          opacity: loading ? 0.5 : 1,
          blockSize: dataSource?.length && !fullHeight ? blockSize : 'auto',
          maxBlockSize: fullHeight
            ? undefined
            : `calc(100vh - ${OFFSET_MARGIN + extraHeight}px)`,
        }}
        ref={wrapperRef}
      >
        {isDraggable ? (
          <AppDraggableTable
            id={id}
            rowKey={rowKey}
            dataSource={dataSource}
            wrapperRef={wrapperRef}
            blockSize={blockSize}
            onRowDragEnd={onRowDragEnd}
            setSortColumns={(value) => {
              setSortColumns(value);
            }}
            handleCellKeyDown={handleCellKeyDown}
            setFilter={setFilter}
            sortedRows={sortedRows}
            loading={loading}
            rowSelection={rowSelection}
            rowKeyGetter={rowKeyGetter}
            columns={columns || []}
            pagination={pagination}
            rowHeight={sizeMap[size]}
            selectedRows={selectedRows}
            onSetSelectedRows={onSetSelectedRows}
            defaultColumnOptions={defaultColumnOptions}
            sortColumns={sortColumns}
            filters={filters}
            bordered={bordered}
            hidePagination
            {...restProps}
          />
        ) : (
          <React.Fragment>
            {dataSource?.length || hasLocalFilters ? (
              <>
                <DataGrid
                  id={id}
                  className='fill-grid'
                  rowKey={rowKey || 'id'}
                  rowSelectionType={rowSelection?.type ?? 'checkbox'}
                  rowKeyGetter={rowKeyGetter}
                  columns={columns || []}
                  defaultColumnOptions={{
                    resizable: true,
                    ...defaultColumnOptions,
                  }}
                  rowHeight={customRowHeight || sizeMap[size]}
                  headerRowHeight={sizeMap[size]}
                  rows={
                    dataSource?.length !== sortedRows?.length
                      ? localPaginated
                        ? sortedRows
                        : dataSource || []
                      : sortedRows || []
                  }
                  selectedRows={selectedRows}
                  onSelectedRowsChange={onSetSelectedRows}
                  onRowsChange={setRows}
                  sortColumns={sortColumns}
                  onSortColumnsChange={setSortColumns}
                  filters={filters}
                  onFiltersChange={setFilter}
                  direction='ltr'
                  border={bordered}
                  // onCellKeyDown={handleCellKeyDown}
                  hidePagination={!pagination}
                  style={{
                    blockSize:
                      pagination && !fullHeight
                        ? `calc(100% - ${PAGINATION_SIZE}px)`
                        : '100%',
                  }}
                  {...restProps}
                />
                {pagination && <TablePagination {...pagination} />}
              </>
            ) : (
              <DataGrid
                id='__id'
                rowKey='__id'
                className='fill-grid'
                rowSelectionType={rowSelection?.type ?? 'checkbox'}
                rowKeyGetter={rowKeyGetter}
                columns={columns || []}
                defaultColumnOptions={{
                  resizable: true,
                  ...defaultColumnOptions,
                }}
                rowHeight={customRowHeight || sizeMap[size]}
                headerRowHeight={sizeMap[size]}
                rows={[]}
                selectedRows={selectedRows}
                onSelectedRowsChange={onSetSelectedRows}
                onRowsChange={setRows}
                sortColumns={sortColumns}
                onSortColumnsChange={setSortColumns}
                filters={filters}
                onFiltersChange={setFilter}
                direction='ltr'
                border={bordered}
                renderers={{
                  noRowsFallback: (
                    <StyledTableEmptyWrapper
                      style={{
                        maxWidth: wrapperRef?.current?.clientWidth,
                      }}
                    >
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description='No data found!'
                      />
                    </StyledTableEmptyWrapper>
                  ),
                }}
                hidePagination
                {...restProps}
              />
            )}

            {loading ? (
              <AppLoader
                position='absolute'
                style={{ backgroundColor: 'transparent' }}
              />
            ) : null}
          </React.Fragment>
        )}
      </StyledTableWrapper>
    </MiThemeProvider>
  );
};

export default MiTable;
