import { type BasketColor } from '../../types';

interface BasketInputProps {
  color: BasketColor;
  par: 3 | 4 | 5;
  distance: number;
  onParChange: (par: 3 | 4 | 5) => void;
  onDistanceChange: (distance: number) => void;
}

export function BasketInput({
  color,
  par,
  distance,
  onParChange,
  onDistanceChange,
}: BasketInputProps): JSX.Element {
  return (
    <div className="p-3 border border-gray-200 rounded">
      <p className="text-sm font-medium text-gray-700">{color} basket</p>
    </div>
  );
}
