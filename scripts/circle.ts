import { Point } from './point'

export interface Circle {
  location: Point;
  color: string;
  size: number; //radius

  update(): void;
}
