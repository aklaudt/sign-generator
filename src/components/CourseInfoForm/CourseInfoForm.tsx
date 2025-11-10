interface CourseInfoFormProps {
  holeNumber: number;
  onHoleNumberChange: (holeNumber: number) => void;
}

export function CourseInfoForm({
  holeNumber,
  onHoleNumberChange,
}: CourseInfoFormProps): JSX.Element {
  return (
    <div className="p-4 border border-gray-300 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Course Information</h3>
      <p className="text-gray-600">Course Info Form Component</p>
    </div>
  );
}
