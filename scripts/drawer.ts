import { Circle } from './circle';
import { Point } from './point';
import { Creature } from './creature';
import { Food } from './food';

export class Drawer {
  private circles: Array<Circle> = new Array<Circle>();

  constructor(private context: CanvasRenderingContext2D, public width: number, public height: number) {
    for (let i = 0; i < 30; i++) {
      let food = new Food()
      food.location.x = Math.random() * this.width;
      food.location.y = Math.random() * this.height;
      food.color = this.pad(Math.floor(Math.random() * (256*256*256)).toString(16), '0', 6);
      this.circles.push(food);
    }
    for (let i = 0; i < 10; i++) {
      let circle = new Creature(this.width, this.height, this.circles);
      circle.location.x = Math.random() * this.width;
      circle.location.y = Math.random() * this.height;
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
    this.circles.forEach(t => t.update());
    this.circles.forEach(t => {
      if (t instanceof Creature) {
        this.drawCreature(t);
      } else if (t instanceof Food) {
        this.drawFood(t);
      }
    });
  }

  private drawFood(circle: Food) {
    //circle;
    this.context.beginPath();
    this.context.arc(circle.location.x, circle.location.y, circle.size, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fillStyle = '#' + circle.color;
    this.context.strokeStyle = '#' + circle.color;
    this.context.fill();
  }

  private drawCreature(circle: Creature) {
    //circle;
    this.context.beginPath();
    this.context.arc(circle.location.x, circle.location.y, circle.size, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fillStyle = '#' + circle.color;
    this.context.strokeStyle = '#' + circle.color;
    this.context.fill();

    //nose
    let x = circle.location.x + Math.cos(circle.direction) * circle.size;
    let y = circle.location.y + Math.sin(circle.direction) * circle.size;
    this.drawPoint({x: x, y: y, color: '000000'});
    
    //eyes
    circle.eyes.forEach(eye => {
      //eye
      this.drawPoint(eye.location);
      
      //sight
      eye.views.forEach(u => {
        this.context.beginPath();
        this.context.moveTo(eye.location.x, eye.location.y);
        this.context.lineTo(u.location.x, u.location.y);
        this.context.closePath();
        this.context.stroke();

        this.drawPoint(u.location);
        //collisions
        u.collisions.forEach(v => {
          this.drawPoint(v.location);
        });
      });
    });
  }

  private drawPoint(point: Point) {
    this.context.beginPath();
    this.context.arc(point.x, point.y, 3, 0, 2 * Math.PI, false);
    this.context.closePath();
    this.context.fillStyle = '#' + point.color;
    this.context.fill();
  }
}

