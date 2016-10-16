import { Circle } from './circle';

export class Drawer {
  constructor(private context: CanvasRenderingContext2D) {

  }

  public width: number;
  public height: number;

  private circle = new Circle();

  public draw() {
    this.context.clearRect(0, 0, this.width, this.height);

    this.circle.move(this.width, this.height);
    this.drawCircle(this.circle.x, this.circle.y);
  }

  private drawCircle(x: number, y: number) {
    this.context.beginPath();
    this.context.arc(x, y, 25, 0, 2 * Math.PI, false);
    this.context.fillStyle = '#990000';
    this.context.fill();
  }
}