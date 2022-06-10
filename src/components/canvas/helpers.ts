import { stringify } from 'querystring';
import { noOfCol, noOfRow } from '../Constants';

export class Block {
  height: number = 20;
  width: number = 20;
  x: number;
  y: number;
  isAlive: boolean;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.isAlive = false;
  }

  drawBlock(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.fillStyle = '#41A490';
    ctx.fill();
    ctx.closePath();
  }
  setSelction(ctx: CanvasRenderingContext2D) {
    this.isAlive = !this.isAlive;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.fillStyle = this.isAlive ? '#ffffff' : '#41A490';
    ctx.fill();
    ctx.closePath();
  }
  drawBlockWithflag(ctx: CanvasRenderingContext2D, flag: boolean) {
    this.isAlive = flag;
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.fillStyle = flag ? '#ffffff' : '#41A490';
    ctx.fill();
    ctx.closePath();
  }
}

export class Canvas {
  nofelementscolumn: number;
  nofelementsrows: number;
  noofsteps: number = 0;
  ctx: CanvasRenderingContext2D;
  elemets: Array<Array<Block>> = [];
  isCreated = false;
  public speed = 200;
  isRepeting: boolean;
  isAnimationRunning: boolean = false;
  previouselemets: Array<string> = [];
  countmaxalive: number = 0;
  constructor(ctx: CanvasRenderingContext2D) {
    if (this.isCreated) {
      throw new Error('Canvas is singleton class');
    }
    this.nofelementsrows = noOfRow;
    this.nofelementscolumn = noOfCol;
    this.isCreated = true;
    this.ctx = ctx;
    this.isRepeting = false;
  }

  createGrid() {
    for (var c = 0; c < this.nofelementsrows; c++) {
      this.elemets[c] = [];
      for (var r = 0; r < this.nofelementscolumn; r++) {
        const block = new Block(r * 20, c * 20);
        block.drawBlock(this.ctx);
        this.elemets[c][r] = block;
      }
    }
  }

  changestate(x: number, y: number) {
    const x1: number = Math.floor(x / 20);
    const y1: number = Math.floor(y / 20);
    this.elemets[y1][x1].setSelction(this.ctx);
    this.noofsteps = 0;
  }

  isvalid(r: number, c: number) {
    if (
      r > 0 &&
      c > 0 &&
      r < this.nofelementscolumn &&
      c < this.nofelementsrows
    )
      return true;
    return false;
  }

  set setSpeed(newSpeed: number) {
    this.speed = newSpeed;
  }

  startAnimation() {
    const This = this;
    function loop() {
      setTimeout(() => {
        This.shuffelGrid();
        if (This.isAnimationRunning) {
          requestAnimationFrame(loop);
        }
      }, This.speed);
    }
    this.isAnimationRunning = true;
    requestAnimationFrame(loop);
  }

  stopAnimation() {
    this.isAnimationRunning = false;
  }

  shuffelGrid() {
    this.noofsteps += 1;
    var t = '';
    var countmaxalive: number = 0;
    for (var c = 0; c < this.nofelementsrows; c++) {
      for (var r = 0; r < this.nofelementscolumn; r++) {
        if (this.elemets[c][r].isAlive) {
          t = t + '0';
          countmaxalive += 1;
        } else {
          t = t + '1';
        }
      }
    }
    this.countmaxalive =
      countmaxalive > this.countmaxalive ? countmaxalive : this.countmaxalive;
    let newelemets: Array<Array<Block>> = [];
    let areNewElementsSame = true;
    for (c = 0; c < this.nofelementsrows; c++) {
      newelemets[c] = [];
      for (r = 0; r < this.nofelementscolumn; r++) {
        var count: number = 0;
        if (
          this.elemets[(c - 1 + this.nofelementsrows) % this.nofelementsrows][
            (r - 1 + this.nofelementscolumn) % this.nofelementscolumn
          ].isAlive
        ) {
          count++;
        }
        if (
          this.elemets[(c + this.nofelementsrows) % this.nofelementsrows][
            (r - 1 + this.nofelementscolumn) % this.nofelementscolumn
          ].isAlive
        ) {
          count++;
        }
        if (
          this.elemets[(c + 1 + this.nofelementsrows) % this.nofelementsrows][
            (r - 1 + this.nofelementscolumn) % this.nofelementscolumn
          ].isAlive
        ) {
          count++;
        }
        if (
          this.elemets[(c - 1 + this.nofelementsrows) % this.nofelementsrows][
            (r + this.nofelementscolumn) % this.nofelementscolumn
          ].isAlive
        ) {
          count++;
        }
        if (
          this.elemets[(c + 1 + this.nofelementsrows) % this.nofelementsrows][
            (r + this.nofelementscolumn) % this.nofelementscolumn
          ].isAlive
        ) {
          count++;
        }
        if (
          this.elemets[(c + this.nofelementsrows) % this.nofelementsrows][
            (r + 1 + this.nofelementscolumn) % this.nofelementscolumn
          ].isAlive
        ) {
          count++;
        }
        if (
          this.elemets[(c + 1 + this.nofelementsrows) % this.nofelementsrows][
            (r + 1 + this.nofelementscolumn) % this.nofelementscolumn
          ].isAlive
        ) {
          count++;
        }
        if (
          this.elemets[(c - 1 + this.nofelementsrows) % this.nofelementsrows][
            (r + 1 + this.nofelementscolumn) % this.nofelementscolumn
          ].isAlive
        ) {
          count++;
        }
        const block = new Block(r * 20, c * 20);
        var flag: boolean;
        if (this.elemets[c][r].isAlive) {
          if (count < 2 || count > 3) {
            flag = false;
          } else {
            flag = true;
          }
        } else {
          if (count === 3) {
            flag = true;
          } else {
            flag = false;
          }
        }
        block.drawBlockWithflag(this.ctx, flag);
        newelemets[c][r] = block;
        areNewElementsSame =
          areNewElementsSame &&
          this.elemets[c][r].isAlive === newelemets[c][r].isAlive;
      }
    }
    t = '';
    countmaxalive = 0;
    for (c = 0; c < this.nofelementsrows; c++) {
      for (r = 0; r < this.nofelementscolumn; r++) {
        if (newelemets[c][r].isAlive) {
          t = t + '0';
          countmaxalive++;
        } else {
          t = t + '1';
        }
      }
    }
    this.countmaxalive =
      countmaxalive > this.countmaxalive ? countmaxalive : this.countmaxalive;
    this.elemets = newelemets;

    console.log('hi', t === this.previouselemets[0]);
    if (this.previouselemets.indexOf(t) !== -1) {
      this.isRepeting = true;
      this.stopAnimation();
    }
    this.previouselemets[5] = this.previouselemets[4];
    this.previouselemets[4] = this.previouselemets[3];
    this.previouselemets[3] = this.previouselemets[2];
    this.previouselemets[2] = this.previouselemets[1];
    this.previouselemets[1] = this.previouselemets[0];
    this.previouselemets[0] = t;
  }
  currentGeneration(): number {
    return this.noofsteps;
  }
  newstate() {
    this.isRepeting = false;
    this.createGrid();
  }
  makeSomePattern = async (pattern: Array<Array<number>>) => {
    this.noofsteps = 0;
    for (var c = 0; c < this.nofelementsrows; c++) {
      this.elemets[c] = [];
      for (var r = 0; r < this.nofelementscolumn; r++) {
        const block = new Block(r * 20, c * 20);
        block.drawBlock(this.ctx);
        this.elemets[c][r] = block;
      }
    }
    for (let i = 0; i < pattern.length; i++) {
      this.elemets[pattern[i][0]][pattern[i][1]].isAlive = true;
      this.elemets[pattern[i][0]][pattern[i][1]].drawBlockWithflag(
        this.ctx,
        true
      );
    }
  };
}
