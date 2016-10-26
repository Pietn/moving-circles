import { Point } from './point'
import { MathHelpers } from './math-helpers';
import { Eye } from './eye';
import { View } from './view';
import { Collision } from './collision';

export class Circle {
  public location: Point = new Point();
  public direction: number = 0;
  public color: string;
  public eyeSpace: number = Math.PI / 3;
  public size: number = 25; //radius
  public eyes: Array<Eye> = [];

  constructor() {
    for(let i = 0; i < 2; i++) {
      this.eyes.push(new Eye(10));
    }
  }

  public move(width: number, height: number, circles: Array<Circle>) {
    this.direction += ((Math.random() - 0.5) / 20);
    this.location.x += Math.cos(this.direction);
    this.location.y += Math.sin(this.direction);

    if (this.location.x < 0) {
      this.location.x += width;
    }

    if (this.location.y < 0) {
      this.location.y += height;
    }

    if (this.location.x > width) {
      this.location.x -= width;
    }

    if (this.location.y > height) {
      this.location.y -= height;
    }

    let eyeSpan = (this.eyes.length - 1) * this.eyeSpace;
    let eyeStart = this.direction - (eyeSpan / 2)
    for(let i = 0; i < this.eyes.length; i++) {
      let x1 = this.location.x + Math.cos(eyeStart) * this.size;
      let y1 = this.location.y + Math.sin(eyeStart) * this.size;
      let eye = this.eyes[i];
      eye.location.x = x1;
      eye.location.y = y1;
      let viewStart = 0;
      let viewSpace: number = 0;
      if (eye.views.length > 1) {
        viewStart = -(eye.viewSpan / 2);
        viewSpace = eye.viewSpan / (eye.views.length - 1);
      }
      for (let j = 0; j < eye.views.length; j++) {
        let x2 = x1 + Math.cos(eyeStart + viewStart + viewSpace * j) * eye.viewDistance;
        let y2 = y1 + Math.sin(eyeStart + viewStart + viewSpace * j) * eye.viewDistance;
        eye.views[j].location.x = x2;
        eye.views[j].location.y = y2;
        eye.views[j].collisions = this.findCollisions(eye, eye.views[j], circles);
        eye.views[j].nearest = this.getNearest(eye.views[j].collisions, eye);
        eye.views[j].location.color = eye.views[j].nearest ? eye.views[j].nearest.circle.color : '000000';
        eye.location.color = eye.views[j].location.color;
      }
      eyeStart += this.eyeSpace;
    }
  }

  private getNearest(collisions: Array<Collision>, eye: Eye) : Collision {
    var nearest: Collision = null;
    var distance = eye.viewDistance;
    for (let i = 0; i < collisions.length; i++) {
      let d = MathHelpers.distance(collisions[i].location, eye.location);
      if (d <= distance) {
        nearest = collisions[i];
        distance = d;
      }
    }
    return nearest;
  }

  private findCollisions(eye: Eye, view: View, circles: Array<Circle>) : Array<Collision> {
    let collisions: Array<Collision> = [];
      circles.forEach(u => {
        if (u === this) {
          return;
        }
          this.findPoints(u, eye.location, view.location)
            .filter(v => { 
              let d1 = MathHelpers.distance(v, eye.location);
              let d2 = MathHelpers.distance(v, view.location);
              return (d1 < eye.viewDistance) && (d2 < eye.viewDistance) 
            })
            .forEach(v =>{
              collisions.push({location: v, circle: u});
            });
      });
      return collisions;
  }

  private findPoints(circle: Circle, point1: Point, point2: Point): Array<Point> {
    let m = (point2.y - point1.y) / (point2.x - point1.x);
    let n = - (m * point1.x - point1.y);  //y1 = m * x1 + n

    let points = MathHelpers.findCircleLineIntersections(circle.size, circle.location.x, circle.location.y, m, n);
    return points;
  }
}
