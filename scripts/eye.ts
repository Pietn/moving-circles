import { Point } from './point'
import { View } from './view';

export class Eye {
  constructor(numberOfViews: number) {
    for (let i = 0; i < numberOfViews; i++) {
      this.views.push(new View());
    }
  }

  public viewSpan: number = Math.PI / 4;
  public location: Point = new Point();
  public views: Array<View> = [];
  public viewDistance: number = 200;
  public offset: number = 0;
}
