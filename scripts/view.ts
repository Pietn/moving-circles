import { Point } from './point'
import { Collision } from './collision';

export class View {
  public location: Point = new Point();
  public collisions: Array<Collision> = [];
}
