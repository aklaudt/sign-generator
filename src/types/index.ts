// Core types for the Disc Golf Tee Sign Generator

export interface Position {
  x: number;
  y: number;
}

export type BasketColor = 'red' | 'white' | 'blue';

export interface BasketMarker {
  id: string;
  color: BasketColor;
  position: Position;
  par: 3 | 4 | 5;
  distance: number;
}

export interface TeeMarker {
  id: string;
  position: Position;
  rotation: number; // in degrees
  width: number; // in pixels
  height: number; // in pixels
}

export interface TeeSignData {
  holeNumber: number;
  uploadedImage: string | null;
  teeMarker: TeeMarker | null;
  basketMarkers: BasketMarker[];
}

export interface BasketInfo {
  color: BasketColor;
  label: string;
  par: 3 | 4 | 5;
  distance: number;
}
