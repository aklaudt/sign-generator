import { type BasketColor } from '../../types';

interface BasketMarkerCircleProps {
  color: BasketColor;
  label: string;
  variant?: 'default' | 'header' | 'selected';
}

const getBasketColorClass = (color: BasketColor): string => {
  switch (color) {
    case 'red':
      return 'bg-red-600 border-red-700';
    case 'blue':
      return 'bg-blue-600 border-blue-700';
    case 'white':
      return 'bg-white border-gray-300';
  }
};

const getBasketTextColorClass = (color: BasketColor): string => {
  return color === 'white' ? 'text-gray-900' : 'text-white';
};

const getVariantClasses = (
  variant: 'default' | 'header' | 'selected'
): string => {
  switch (variant) {
    case 'header':
      return 'border-white/30';
    case 'selected':
      return 'ring-2 ring-yellow-400 border-yellow-500';
    case 'default':
    default:
      return '';
  }
};

export function BasketMarkerCircle({
  color,
  label,
  variant = 'default',
}: BasketMarkerCircleProps): JSX.Element {
  return (
    <div
      className={`rounded-full shadow-lg font-bold transition-all w-8 h-8 text-xs border-2 ${getBasketColorClass(
        color
      )} ${getBasketTextColorClass(color)} ${getVariantClasses(variant)}`}
      style={{
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center',
      }}
    >
      {label}
    </div>
  );
}
