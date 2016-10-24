import { Point } from './point';

export class MathHelpers {
  public static sq(x: number): number {
    return x * x;
  }

  public static distance(point1: Point, point2: Point): number {
    let d =  Math.sqrt( (point2.x-point1.x)*(point2.x-point1.x) + (point2.y-point1.y)*(point2.y-point1.y) );
    return d;
  }
  
  /**
   * https://cscheng.info/2016/06/09/calculate-circle-line-intersection-with-javascript-and-p5js.html
   */
  public static findCircleLineIntersections(r, h, k, m, n) {
    // circle: (x - h)^2 + (y - k)^2 = r^2
    // line: y = m * x + n
    // r: circle radius
    // h: x value of circle centre
    // k: y value of circle centre
    // m: slope
    // n: y-intercept

    // get a, b, c values
    var a = 1 + MathHelpers.sq(m);
    var b = -h * 2 + (m * (n - k)) * 2;
    var c = MathHelpers.sq(h) + MathHelpers.sq(n - k) - MathHelpers.sq(r);

    // get discriminant
    var d = MathHelpers.sq(b) - 4 * a * c;
    if (d >= 0) {
        // insert into quadratic formula
        let x1 = (-b + Math.sqrt(MathHelpers.sq(b) - 4 * a * c)) / (2 * a);
        let x2 = (-b - Math.sqrt(MathHelpers.sq(b) - 4 * a * c)) / (2 * a);
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
}