import { type BasketMarker, type BasketColor } from '../../types';

interface CourseInfoFormProps {
  holeNumber: number;
  onHoleNumberChange: (holeNumber: number) => void;
  basketMarkers: BasketMarker[];
  onUpdateBasketMarker: (id: string, updates: Partial<BasketMarker>) => void;
}

const getBasketLabel = (color: BasketColor): string => {
  switch (color) {
    case 'red':
      return 'Red (Short/A)';
    case 'white':
      return 'White (Medium/B)';
    case 'blue':
      return 'Blue (Long/C)';
  }
};

const getBasketColorClass = (color: BasketColor): string => {
  switch (color) {
    case 'red':
      return 'bg-red-600';
    case 'blue':
      return 'bg-blue-600';
    case 'white':
      return 'bg-gray-100';
  }
};

export function CourseInfoForm({
  holeNumber,
  onHoleNumberChange,
  basketMarkers,
  onUpdateBasketMarker,
}: CourseInfoFormProps): JSX.Element {
  const handleHoleNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= 99) {
      onHoleNumberChange(value);
    }
  };

  const handleParChange = (basketId: string, value: string): void => {
    const par = parseInt(value, 10) as 3 | 4 | 5;
    if ([3, 4, 5].includes(par)) {
      onUpdateBasketMarker(basketId, { par });
    }
  };

  const handleDistanceChange = (basketId: string, value: string): void => {
    const distance = parseInt(value, 10);
    if (!isNaN(distance) && distance > 0 && distance <= 9999) {
      onUpdateBasketMarker(basketId, { distance });
    }
  };

  const handleLabelChange = (basketId: string, value: string): void => {
    // Limit to single character and convert to uppercase
    const label = value.slice(0, 1).toUpperCase();
    if (label.length > 0) {
      onUpdateBasketMarker(basketId, { label });
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-100 mb-4">
        Hole Information
      </h3>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="hole-number"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Hole Number
          </label>
          <input
            id="hole-number"
            type="number"
            min="1"
            max="99"
            value={holeNumber}
            onChange={handleHoleNumberChange}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {basketMarkers.length > 0 && (
          <div className="pt-4 border-t border-gray-700">
            <h4 className="text-sm font-medium text-gray-300 mb-3">
              Basket Details
            </h4>
            <div className="space-y-4">
              {basketMarkers.map((basket) => (
                <div
                  key={basket.id}
                  className="p-3 bg-gray-700/50 rounded-lg border border-gray-600"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-4 h-4 rounded-full ${getBasketColorClass(basket.color)}`}
                    />
                    <span className="text-sm font-medium text-gray-100">
                      {getBasketLabel(basket.color)}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label
                        htmlFor={`label-${basket.id}`}
                        className="block text-xs font-medium text-gray-400 mb-1"
                      >
                        Label
                      </label>
                      <input
                        id={`label-${basket.id}`}
                        type="text"
                        maxLength={1}
                        value={basket.label}
                        onChange={(e) =>
                          handleLabelChange(basket.id, e.target.value)
                        }
                        className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded text-gray-100 text-center font-bold uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="A"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`par-${basket.id}`}
                        className="block text-xs font-medium text-gray-400 mb-1"
                      >
                        Par
                      </label>
                      <select
                        id={`par-${basket.id}`}
                        value={basket.par}
                        onChange={(e) => handleParChange(basket.id, e.target.value)}
                        className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor={`distance-${basket.id}`}
                        className="block text-xs font-medium text-gray-400 mb-1"
                      >
                        Distance (ft)
                      </label>
                      <input
                        id={`distance-${basket.id}`}
                        type="number"
                        min="1"
                        max="9999"
                        value={basket.distance}
                        onChange={(e) =>
                          handleDistanceChange(basket.id, e.target.value)
                        }
                        className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {basketMarkers.length === 0 && (
          <div className="pt-2 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Add basket markers on the map to set par and distance
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
