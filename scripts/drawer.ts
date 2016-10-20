import { Circle } from './circle';

export class Drawer {
  private circles: Array<Circle> = new Array<Circle>();

  constructor(private context: CanvasRenderingContext2D, public width: number, public height: number) {
    for (let i = 0; i < 20; i++) {
      let circle = new Circle();
      circle.x = Math.random() * this.width;
      circle.y = Math.random() * this.height;
      circle.direction = Math.random() * Math.PI * 2;
      circle.color = this.pad(Math.floor(Math.random() * (256*256*256)).toString(16), '0', 6);
      this.circles.push(circle)
    }
  }

  public pad(value: string, char: string, length: number) {
    if (value.length >= length) {
      return value.substr(0, length);
    }

    return this.pad(char + value, char, length);
  }

  public draw() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.circles.forEach(t => t.move(this.width, this.height));
    this.circles.forEach(t => this.drawCircle(t));
  }

  private drawCollitions(circle: Circle, circles: Array<Circle>) {
    circles.forEach(t => {
      if (t !== circle) {

      }
    })
  }

  private distance(p: Point, x: number, y: number): number {
    let d =  Math.sqrt( (x-=p.x)*x + (y-=p.y)*y );
    return d;
  }

  private drawCircle(circle: Circle) {
    this.context.beginPath();
    this.context.arc(circle.x, circle.y, 25, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fillStyle = '#' + circle.color;
    this.context.fill();

    let x = circle.x + Math.cos(circle.direction) * 25;
    let y = circle.y + Math.sin(circle.direction) * 25;
    this.drawPoint({x: x, y: y, color: '000000'});
    let x2 = x + Math.cos(circle.direction) * 75;
    let y2 = y + Math.sin(circle.direction) * 75;
    
    x = circle.x + Math.cos(circle.direction - circle.eyeSpace) * 25;
    y = circle.y + Math.sin(circle.direction - circle.eyeSpace) * 25;
    this.drawPoint({x: x, y: y, color: '000000'});
    x2 = x + Math.cos(circle.direction) * 75;
    y2 = y + Math.sin(circle.direction) * 75;
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(x2, y2);
    this.context.stroke();
    this.circles.forEach(t => {
      if (t === circle) {
        return;
      }
      let points = this.findPoints(t.x, t.y, 25, x, y, x2, y2)
        .filter(u => { return (this.distance(u, x, y) < 75) && (this.distance(u, x2, y2) < 75) })
        .forEach(u => this.drawPoint(u));
    })
    
    
    x = circle.x + Math.cos(circle.direction + circle.eyeSpace) * 25;
    y = circle.y + Math.sin(circle.direction + circle.eyeSpace) * 25;
    this.drawPoint({x: x, y: y, color: '000000'});
    x2 = x + Math.cos(circle.direction) * 75;
    y2 = y + Math.sin(circle.direction) * 75;
    this.context.beginPath();
    this.context.moveTo(x, y);
    this.context.lineTo(x2, y2);
    this.context.stroke();
    this.circles.forEach(t => {
      if (t === circle) {
        return;
      }
      let points = this.findPoints(t.x, t.y, 25, x, y, x2, y2)
        .filter(u => { return (this.distance(u, x, y) < 75) && (this.distance(u, x2, y2) < 75); })
        .forEach(u => this.drawPoint(u));
    });
  }

  private drawPoint(point: Point) {
    this.context.beginPath();
    this.context.arc(point.x, point.y, 2, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fillStyle = '#' + point.color;
    this.context.fill();
  }

  private findPoints(xc, yc, r, x1, y1, x2, y2): Array<Point> {
    let m = (y2 - y1) / (x2 - x1);
    let n = - (m * x1 - y1);  //-(m * x2 - y2); y1 = m * x1 + n

    let points = this.findCircleLineIntersections(r, xc, yc, m, n);
    return points;
  }
  /**
   * https://cscheng.info/2016/06/09/calculate-circle-line-intersection-with-javascript-and-p5js.html
   */
  private findCircleLineIntersections(r, h, k, m, n) {
    // circle: (x - h)^2 + (y - k)^2 = r^2
    // line: y = m * x + n
    // r: circle radius
    // h: x value of circle centre
    // k: y value of circle centre
    // m: slope
    // n: y-intercept

    // get a, b, c values
    var a = 1 + this.sq(m);
    var b = -h * 2 + (m * (n - k)) * 2;
    var c = this.sq(h) + this.sq(n - k) - this.sq(r);

    // get discriminant
    var d = this.sq(b) - 4 * a * c;
    if (d >= 0) {
        // insert into quadratic formula
        let x1 = (-b + Math.sqrt(this.sq(b) - 4 * a * c)) / (2 * a);
        let x2 = (-b - Math.sqrt(this.sq(b) - 4 * a * c)) / (2 * a);
        var intersections = [
            {x: x1, y: m * x1 + n, color: 'ff0000'},
            {x: x2, y: m * x2 + n, color: '0000ff'}
        ];
        if (d == 0) {
            // only 1 intersection
            return [intersections[0]];
        }
        return intersections;
    }
    // no intersection
    return [];
  }

  private sq(x: number): number {
    return x * x;
  }
}

class Point {
  public x: number;
  public y: number;
  public color: string;
}