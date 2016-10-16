import { Circle } from './circle';

export class Drawer {
  private circles: Array<Circle> = new Array<Circle>();
  private trail: Array<Point> = new Array<Point>();
  private counter: number = 0;

  constructor(private context: CanvasRenderingContext2D, public width: number, public height: number) {
    for (let i = 0; i < 10; i++) {
      let circle = new Circle();
      circle.x = Math.random() * this.width;
      circle.y = Math.random() * this.height;
      circle.direction = Math.random() * Math.PI * 2;
      this.circles.push(circle)
    }
  }

  public draw() {
    this.context.clearRect(0, 0, this.width, this.height);

    if (this.counter % 10 === 0) {
      this.circles.forEach(t => this.trail.push({x: t.x, y: t.y}));
    }
    this.trail.forEach(t => this.drawPoint(t));
    this.circles.forEach(t => t.move(this.width, this.height));
    this.circles.forEach(t => this.drawCircle(t));
    this.counter++;
  }

  private drawCircle(circle: Circle) {
    this.context.beginPath();
    this.context.arc(circle.x, circle.y, 25, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fillStyle = '#990000';
    this.context.fill();

    let x = circle.x + Math.cos(circle.direction) * 25;
    let y = circle.y + Math.sin(circle.direction) * 25;
    this.context.beginPath();
    this.context.arc(x, y, 2, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fillStyle = '#000000';
    this.context.fill();
  }

  private drawPoint(point: Point) {
    this.context.beginPath();
    this.context.arc(point.x, point.y, 2, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fillStyle = '#990000';
    this.context.fill();
  }
}

class Point {
  public x: number;
  public y: number;
}