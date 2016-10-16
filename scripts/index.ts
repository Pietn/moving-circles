import { Drawer } from './drawer';

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('c');
let context: CanvasRenderingContext2D = canvas.getContext('2d');

let drawer = new Drawer(context);
drawer.height = canvas.height;
drawer.width = canvas.width;

doAnimation();

function doAnimation() {
  drawer.draw();
  requestAnimationFrame(doAnimation);
}