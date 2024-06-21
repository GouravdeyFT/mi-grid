import type { CellEvent } from '@mi/models/MiTable';

export function createCellEvent<E extends React.SyntheticEvent<HTMLDivElement>>(
  event: E,
): CellEvent<E> {
  let defaultPrevented = false;
  const cellEvent = {
    ...event,
    preventGridDefault() {
      defaultPrevented = true;
    },
    isGridDefaultPrevented() {
      return defaultPrevented;
    },
  };

  Object.setPrototypeOf(cellEvent, Object.getPrototypeOf(event));

  return cellEvent;
}
