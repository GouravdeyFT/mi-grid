import type { RenderCellProps } from '@mi/models/MiTable';

export function renderValue<R, SR>(props: RenderCellProps<R, SR>) {
  try {
    return props.row[props.column.dataIndex as keyof R] as React.ReactNode;
  } catch {
    return null;
  }
}
