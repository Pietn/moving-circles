export class Drawer {
  constructor(private context: CanvasRenderingContext2D) {

  }

  public width: number;
  public height: number;

  public draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = '#33ff66';
    this.context.fillRect(50, 50, 80, 60);
    this.context.strokeStyle = '#660000';
    this.context.lineWidth = 3;
    this.context.strokeRect(50, 50, 80, 60);
  }
}