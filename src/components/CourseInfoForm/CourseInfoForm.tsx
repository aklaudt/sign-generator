interface CourseInfoFormProps {
  holeNumber: number;
  onHoleNumberChange: (holeNumber: number) => void;
}

export function CourseInfoForm({
  holeNumber,
  onHoleNumberChange,
}: CourseInfoFormProps): JSX.Element {
  const handleHoleNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= 99) {
      onHoleNumberChange(value);
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

        <div className="pt-2 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Add tee and basket markers on the map to complete the hole setup
          </p>
        </div>
      </div>
    </div>
  );
}
