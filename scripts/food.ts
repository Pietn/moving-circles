import { Point } from './point'
import { MathHelpers } from './math-helpers';
import { Circle } from './circle';

export class Food
  implements Circle {

  public location: Point = new Point();
  public color: string;
  public size: number = 7; //radius

  public update() {

  }
}