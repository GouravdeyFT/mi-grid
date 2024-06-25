# react-excel-data-grid

[![npm-badge]][npm-url]
<!-- [![type-badge]][npm-url]
[![size-badge]][size-url] -->

[npm-badge]: https://img.shields.io/npm/v/mi-grid
[npm-url]: https://www.npmjs.com/package/mi-grid
<!-- [size-badge]: https://img.shields.io/bundlephobia/minzip/mi-grid
[size-url]: https://bundlephobia.com/package/mi-grid
[type-badge]: https://img.shields.io/npm/types/mi-grid -->

<!-- 
## Features

- [React 18.0+](package.json) support
- [Evergreen browsers and server-side rendering](browserslist) support
- Great performance thanks to virtualization: columns and rows outside the viewport are not rendered
- Strictly typed with TypeScript
- [Keyboard accessibility](<(https://adazzle.github.io/react-data-grid/#/common-features)>)
- Light and dark mode support out of the box. The light or dark themes can be enforced using the `rdg-light` or `rdg-dark` classes.
- [Frozen columns](https://adazzle.github.io/react-data-grid/#/common-features)
- [Column resizing](https://adazzle.github.io/react-data-grid/#/common-features)
- [Multi-column sorting](https://adazzle.github.io/react-data-grid/#/common-features)
  - Click on a sortable column header to toggle between its ascending/descending sort order
  - Ctrl+Click / Meta+Click to sort an additional column
- [Column spanning](https://adazzle.github.io/react-data-grid/#/column-spanning)
- [Column grouping](https://adazzle.github.io/react-data-grid/#/column-grouping)
- [Row selection](https://adazzle.github.io/react-data-grid/#/common-features)
- [Row grouping](https://adazzle.github.io/react-data-grid/#/row-grouping)
- [Summary rows](https://adazzle.github.io/react-data-grid/#/common-features)
- [Dynamic row heights](https://adazzle.github.io/react-data-grid/#/variable-row-height)
- [No rows fallback](https://adazzle.github.io/react-data-grid/#/no-rows)
- [Cell formatting](https://adazzle.github.io/react-data-grid/#/common-features)
- [Cell editing](https://adazzle.github.io/react-data-grid/#/common-features)
- [Cell copy / pasting](https://adazzle.github.io/react-data-grid/#/all-features)
- [Cell value dragging / filling](https://adazzle.github.io/react-data-grid/#/all-features)
- [Customizable Renderers](https://adazzle.github.io/react-data-grid/#/customizable-renderers)
- Right-to-left (RTL) support. We recommend using Firefox as Chrome has a [bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1140374) with frozen columns, and the [`:dir` pseudo class](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir) is not supported

## Links

- [Examples website](https://adazzle.github.io/react-data-grid/)
  - [Source code](website)
- [Old website for react-data-grid v6](https://adazzle.github.io/react-data-grid/old/)
- [Changelog](CHANGELOG.md)
- [Contributing](CONTRIBUTING.md) -->
## 🖥 Environment Support

- Modern browsers
- Server-side Rendering

[<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari 
| --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions 

## 📦  Install

```sh
npm install react-excel-data-grid
```

`react-excel-data-grid` is published as ECMAScript modules for evergreen browsers / bundlers, and CommonJS for server-side rendering / Jest.

## 🔨 Quick start

```jsx
import { ExcelDataGrid } from 'react-excel-data-grid';

const columns = [
  { key: 'id', dataIndex:'id', title: 'ID' },
  { key: 'title', dataIndex:'title', title: 'Title' }
];

const rows = [
  { id: 0, title: 'Example' },
  { id: 1, title: 'Demo' }
];

function App() {
    return <ExcelDataGrid rowKey='id' columns={columns} rows={rows} />;
}
```

## API

### Components

#### `<ExcelDataGrid />`

##### Props

###### `columns: readonly Column<R, SR>[]`

See [`Column`](#column).

An array describing the grid's columns.

⚠️ Passing a new `columns` array will trigger a re-render for the whole grid, avoid changing it as much as possible for optimal performance.

###### `rowKey: string`

The unique id key for the data grid, mostly used for operations such as row selection.

###### `rows: readonly R[]`

An array of rows, the rows data can be of any type.

###### `topSummaryRows?: Maybe<readonly SR[]>`

###### `bottomSummaryRows?: Maybe<readonly SR[]>`

An optional array of summary rows, usually used to display total values for example.

###### `onRowsChange?: Maybe<(rows: R[], data: RowsChangeData<R, SR>) => void>`

A function receiving row updates.
The first parameter is a new rows array with both the updated rows and the other untouched rows.
The second parameter is an object with an `indexes` array highlighting which rows have changed by their index, and the `column` where the change happened.

```tsx
import { useState } from 'react';
import ExcelDataGrid from 'react-excel-data-grid';

function MyGrid() {
  const [rows, setRows] = useState(initialRows);

  return <ExcelDataGrid columns={columns} rows={rows} onRowsChange={setRows} />;
}
```

###### `rowHeight?: Maybe<number | ((row: R) => number)>`

**Default:** `39` pixels

Either a number defining the height of row in pixels, or a function returning dynamic row heights.

###### `headerRowHeight?: Maybe<number>`

**Default:** `39` pixels

A number defining the height of the header row.

###### `summaryRowHeight?: Maybe<number>`

**Default:** `39` pixels

A number defining the height of summary rows.

###### `autoRowHeight?: boolean`

Auto adjust row height in case of dynamic content.

<!-- ###### `selectedRows?: Maybe<ReadonlySet<K>>` -->

<!-- ###### `onSelectedRowsChange?: Maybe<(selectedRows: Set<K>) => void>` -->

<!-- ###### `sortColumns?: Maybe<readonly SortColumn[]>` -->

<!-- ###### `onSortColumnsChange?: Maybe<(sortColumns: SortColumn[]) => void>` -->

###### `defaultColumnOptions?: Maybe<DefaultColumnOptions<R, SR>>`

Arguments:

- `args.width`: `number | string` - width of a cell, default `auto`
- `args.minWidth`: `number | string` - minimum width of a cell, default `80`
- `args.maxWidth`: `number | string` - maximum width of a cell
- `args.resizable`: `boolean` - to make a particular column resizable, default `false`
- `args.draggable`: `boolean` - maximum width of a cell, default `false`
- `args.sorter`: `Maybe<(a: TRow, b: TRow, key: keyof TRow, type?: string) => number>` - callback function for sorting
- `args.renderCell`: `Maybe<(props: RenderCellProps<R, SR>) => React.ReactNode>` - custom react component for cell.

```tsx
interface RenderCellProps<TRow, TSummaryRow> {
  column: CalculatedColumn<TRow, TSummaryRow>;
  row: TRow;
  isCellEditable: boolean;
  tabIndex: number;
  onRowChange: (row: TRow) => void;
  rowSelectionType: 'radio' | 'checkbox';
}
```

###### `groupBy?: Maybe<readonly string[]>`

###### `rowGrouper?: Maybe<(rows: readonly R[], columnKey: string) => Record<string, readonly R[]>>`

###### `expandedGroupIds?: Maybe<ReadonlySet<unknown>>`

###### `onExpandedGroupIdsChange?: Maybe<(expandedGroupIds: Set<unknown>) => void>`

###### `onFill?: Maybe<(event: FillEvent<R>) => R>`

###### `onCopy?: Maybe<(event: CopyEvent<R>) => void>`

###### `onPaste?: Maybe<(event: PasteEvent<R>) => R>`

###### `onCellClick?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

###### `onCellDoubleClick?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

###### `onCellContextMenu?: Maybe<(args: CellClickArgs<R, SR>, event: CellMouseEvent) => void>`

###### `onCellKeyDown?: Maybe<(args: CellKeyDownArgs<R, SR>, event: CellKeyboardEvent) => void>`

###### `onSelectedCellChange?: Maybe<(args: CellSelectArgs<R, SR>) => void>;`

Triggered when the selected cell is changed.

Arguments:

- `args.rowIdx`: `number` - row index
- `args.row`: `R` - row object of the currently selected cell
- `args.column`: `CalculatedColumn<TRow, TSummaryRow>` - column object of the currently selected cell

###### `onScroll?: Maybe<(event: React.UIEvent<HTMLDivElement>) => void>`

###### `onColumnResize?: Maybe<(idx: number, width: number) => void>`

###### `enableVirtualization?: Maybe<boolean>`

###### `renderers?: Maybe<Renderers<R, SR>>`

This prop can be used to override the internal renderers. The prop accepts an object of type

```tsx
interface Renderers<TRow, TSummaryRow> {
  renderCheckbox?: Maybe<(props: RenderCheckboxProps) => ReactNode>;
  renderRow?: Maybe<(key: Key, props: RenderRowProps<TRow, TSummaryRow>) => ReactNode>;
  renderSortStatus?: Maybe<(props: RenderSortStatusProps) => ReactNode>;
  noRowsFallback?: Maybe<ReactNode>;
}
```

For example, the default `<Row />` component can be wrapped via the `renderRow` prop to add context providers or tweak props

```tsx
import ExcelDataGrid, { RenderRowProps, Row } from 'react-excel-data-grid';

function myRowRenderer(key: React.Key, props: RenderRowProps<Row>) {
  return (
    <MyContext.Provider key={key} value={123}>
      <Row {...props} />
    </MyContext.Provider>
  );
}

function MyGrid() {
  return <ExcelDataGrid columns={columns} rows={rows} renderers={{ renderRow: myRowRenderer }} />;
}
```

⚠️ To prevent all rows from being unmounted on re-renders, make sure to pass a static or memoized component to `renderRow`.

###### `rowClass?: Maybe<(row: R) => Maybe<string>>`

##### `direction?: Maybe<'ltr' | 'rtl'>`

This property sets the text direction of the grid, it defaults to `'ltr'` (left-to-right). Setting `direction` to `'rtl'` has the following effects:

- Columns flow from right to left
- Frozen columns are pinned on the right
- Column resize handle is shown on the left edge of the column
- Scrollbar is moved to the left

###### `className?: string | undefined`

###### `style?: CSSProperties | undefined`

###### `'aria-label'?: string | undefined`

###### `'aria-labelledby'?: string | undefined`

###### `'aria-describedby'?: string | undefined`

###### `'data-testid'?: Maybe<string>`

### Filters

The props used while filtering are: 

```tsx

type AcceptedInputType = string | number | boolean | Date | null | undefined;

interface LocalFilter {
  columnKey: string;
  operator: string;
  inputVal: AcceptedInputType | { start:AcceptedInputType, end: AcceptedInputType };
  dataType?: string;
}
```

Example: 
```tsx
import { useState } from 'react';
import ExcelDataGrid from 'react-excel-data-grid';
import type { LocalFilter } from 'react-excel-data-grid';

const applyLocalFilters = <R,>(rows: any[], filters: LocalFilter[]) => {
  return rows.filter((row) => {
    return filters.every((filter) => {
      const value = row[filter.columnKey as keyof R];
      const cellValue =
        typeof value === 'string' ? value.toString().toLowerCase() : value;

      switch (filter.operator) {
        case 'contains':
          return cellValue.includes(filter.inputVal);
        case 'notContains':
          return !cellValue.includes(filter.inputVal);
        case 'eq':
          return cellValue === filter.inputVal;
        case 'neq':
          return cellValue !== filter.inputVal;
        default:
          return true;
      }
    });
  });
};

function MyGrid() {
  const [localFilters, setLocalFilters] = useState<LocalFilter[]>([]);

  return (
    <ExcelDataGrid
      dataSource={applyLocalFilters(rows, localFilters)}
      columns={columns}
      onLocalFiltersChange={setLocalFilters}
    />
  );
}
```

### Formatting

The formatting or styling options in the datagrid are:

- **Bold** - Select single or multiple cells and click on Formatting bar or `CTRL+B`
- *Italic* - Select single or multiple cells and click on Formatting bar or `CTRL+I`
- ~~Strikethrough~~ - Select single or multiple cells and click on Formatting bar or `CTRL+Shift+5`
- <span style="color:#0969da">Text Color</span> or <span style="background-color:#0969da;color:#fff">Background Color</span> - Select single or multiple cells and choose a color from the formatting bar.

```tsx
interface GridCellStyleType {
  rowKey: number | string;
  colKey: number | string;
  style: React.CSSProperties | null;
}
```

Example: 
```tsx
import { useState } from 'react';
import ExcelDataGrid from 'react-excel-data-grid';
import type { GridCellStyleType } from 'react-excel-data-grid';

function MyGrid() {
  const [cellStyles, setCellStyles] = useState<GridCellStyleType[]>([]);

  return (
    <ExcelDataGrid
      dataSource={rows}
      columns={columns}
      cellStyles={cellStyles}
      setCellStyles={setCellStyles}
    />
  );
}
```

For row-wize and column-wize formatting: 
```tsx
import { useState } from 'react';
import ExcelDataGrid from 'react-excel-data-grid';
import type { GridCellStyleType, GridRowColStyleType } from 'react-excel-data-grid';

function MyGrid() {
  const [cellStyles, setCellStyles] = useState<GridCellStyleType[]>([]);
  const [rowColumnStyles, setRowColumnStyles] = useState<GridRowColStyleType>({
    rows: {},
    columns: {},
  });

  return (
    <ExcelDataGrid
      dataSource={rows}
      columns={columns}
      cellStyles={cellStyles}
      setCellStyles={setCellStyles}
      rowColumnStyles={rowColumnStyles}
      setRowColumnStyles={setRowColumnStyles}
    />
  );
}
```

### Formula

For adding formula to data grid, add `formulas` and `setFormulas` props. Formula should always start with `=` similar to how it works in `Spreadsheet`. Below are the sample format acceptable in the formula bar.

```tsx
=SUM(B1,B2)
=SUM(B5:B8)
=SUM(SUM(B1:B4):SUM(B15:B18))
```

```tsx
interface GridFormulaType {
  rowKey: number | string;
  colKey: number | string;
  formula: string | null;
}
```

Example: 
```tsx
import { useState } from 'react';
import ExcelDataGrid from 'react-excel-data-grid';
import type { GridFormulaType } from 'react-excel-data-grid';

function MyGrid() {
  const [gridFormulas, setGridFormulas] = useState<GridFormulaType[]>([]);

  return (
    <ExcelDataGrid
      dataSource={rows}
      columns={columns}
      cellStyles={cellStyles}
      setCellStyles={setCellStyles}
    />
  );
}
```

#### `<TextEditor />`

##### Props

See [`RenderEditCellProps`](#rendereditcellprops)

#### `<NumberEditor />`

##### Props

See [`RenderEditCellProps`](#rendereditcellprops)

#### `<SelectInput />`

##### Props

See [`RenderEditCellProps`](#rendereditcellprops)

#### `<DateInput />`

##### Props

See [`RenderEditCellProps`](#rendereditcellprops)

#### `<TimeInput />`

##### Props

See [`RenderEditCellProps`](#rendereditcellprops)

#### `<DateTimeInput />`

##### Props

See [`RenderEditCellProps`](#rendereditcellprops)

#### `<Row />`

See [`renderers`](#renderers-mayberenderersr-sr)

##### Props

See [`RenderRowProps`](#renderrowprops)

The `ref` prop is supported.

#### `<SortableHeaderCell />`

##### Props

###### `onSort: (ctrlClick: boolean) => void`

###### `sortDirection: SortDirection | undefined`

###### `priority: number | undefined`

###### `tabIndex: number`

###### `children: React.ReactNode`

#### `<ValueFormatter />`

##### Props

See [`FormatterProps`](#formatterprops)

#### `<SelectCellFormatter />`

##### Props

###### `value: boolean`

###### `tabIndex: number`

###### `disabled?: boolean | undefined`

###### `onChange: (value: boolean, isShiftClick: boolean) => void`

###### `onClick?: MouseEventHandler<T> | undefined`

###### `'aria-label'?: string | undefined`

###### `'aria-labelledby'?: string | undefined`

#### `<ToggleGroupFormatter />`

##### Props

See [`RenderGroupCellProps`](#rendergroupcellprops)

### Hooks

#### `useRowSelection<R>(): [boolean, (selectRowEvent: SelectRowEvent<R>) => void]`

### Other

#### `SelectColumn: Column<any, any>`

#### `SELECT_COLUMN_KEY = 'select-row'`

### Types

#### `Column`

#### `ExcelDataGridHandle`

#### `RenderEditCellProps`

#### `RenderCellProps`

#### `RenderGroupCellProps`

#### `RenderRowProps`

### Generics

- `R`, `TRow`: Row type
- `SR`, `TSummaryRow`: Summary row type
- `K`: Row key type