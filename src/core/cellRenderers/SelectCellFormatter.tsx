import type { RenderCheckboxProps } from '@mi/models/MiTable';
import { useDefaultRenderers } from '../DataGridDefaultRenderersProvider';

type SharedInputProps = Pick<
  RenderCheckboxProps,
  'disabled' | 'tabIndex' | 'aria-label' | 'aria-labelledby'
>;

interface SelectCellFormatterProps extends SharedInputProps {
  value: boolean;
  onChange: (value: boolean, isShiftClick: boolean) => void;
  type?: 'radio' | 'checkbox';
}

export function SelectCellFormatter({
  value,
  tabIndex,
  disabled,
  type,
  onChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: SelectCellFormatterProps) {
  const renderCheckbox = useDefaultRenderers()!.renderCheckbox!;

  return renderCheckbox({
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    type: type,
    tabIndex,
    disabled,
    checked: value,
    onChange,
  });
}
