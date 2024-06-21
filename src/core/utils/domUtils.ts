import type { Maybe } from '@mi/models/MiTable';

export function stopPropagation(event: React.SyntheticEvent) {
  event.stopPropagation();
}

export function scrollIntoView(element: Maybe<Element>) {
  element?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
}
