export class Circle {
  public x: number = 0;
  public y: number = 0;
  public direction: number = 0;

  public move(width: number, height: number) {
    this.direction += ((Math.random() - 0.5) / 20);
    this.x += Math.cos(this.direction);
    this.y += Math.sin(this.direction);

    if (this.x < 0) {
      this.x += width;
    }

    if (this.y < 0) {
      this.y += height;
    }

    if (this.x > width) {
      this.x -= width;
    }

    if (this.y > height) {
      this.y -= height;
    }
  }
}