import { type Position } from '../../types';

interface DraggableMarkerProps {
  id: string;
  position: Position;
  color: string;
  onDrag: (id: string, position: Position) => void;
}

export function DraggableMarker({
  id,
  position,
  color,
  onDrag,
}: DraggableMarkerProps): JSX.Element {
  return (
    <div
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        backgroundColor: color,
      }}
      className="w-6 h-6 rounded-full"
    >
      {/* Draggable Marker */}
    </div>
  );
}
