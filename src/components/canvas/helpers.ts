import { useEffect } from "react";

export class Block {
	height: number = 20;
	width: number = 20;
	x: number;
	y: number;
	flag: boolean;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.flag = false;
	}

	drawBlock(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = "#ffffff";
		ctx.stroke();
		ctx.fillStyle = "#41A490";
		ctx.fill();
		ctx.closePath();
	}
	setSelction(ctx: CanvasRenderingContext2D) {
		this.flag = !this.flag;
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.flag ? "#ffffff" : "#41A490";
		ctx.fill();
		ctx.closePath();
	}
	drawBlockWithflag(ctx: CanvasRenderingContext2D, flag: boolean) {
		this.flag = flag;
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.strokeStyle = "#ffffff";
		ctx.stroke();
		ctx.fillStyle = flag ? "#ffffff" : "#41A490";
		ctx.fill();
		ctx.closePath();
	}
}

export class Canvas {
	ctx: CanvasRenderingContext2D;
	elemets: Array<Array<Block>> = [];
	isCreated = false;
	constructor(ctx: CanvasRenderingContext2D) {
		if (this.isCreated) {
			throw new Error("Canvas is singleton class");
		}
		this.isCreated = true;
		this.ctx = ctx;
	}
	createGrid() {
		for (var c = 0; c < 30; c++) {
			this.elemets[c] = [];
			for (var r = 0; r < 40; r++) {
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
	}
	isvalid(r: number, c: number) {
		if (r > 0 && c > 0 && r < 40 && c < 30) return true;
		return false;
	}
	shuffelGrid() {
		const newelemets: Array<Array<Block>> = [];
		for (var c = 0; c < 30; c++) {
			newelemets[c] = [];
			for (var r = 0; r < 40; r++) {
				var count: number = 0;

				if (
					this.isvalid(r - 1, c - 1) &&
					this.elemets[c - 1][r - 1].flag === true
				) {
					count++;
				}
				if (this.isvalid(r - 1, c) && this.elemets[c][r - 1].flag === true) {
					count++;
				}
				if (
					this.isvalid(r - 1, c + 1) &&
					this.elemets[c + 1][r - 1].flag === true
				) {
					count++;
				}
				if (this.isvalid(r, c - 1) && this.elemets[c - 1][r].flag === true) {
					count++;
				}
				if (this.isvalid(r, c + 1) && this.elemets[c + 1][r].flag === true) {
					count++;
				}
				if (this.isvalid(r + 1, c) && this.elemets[c][r + 1].flag === true) {
					count++;
				}
				if (
					this.isvalid(r + 1, c + 1) &&
					this.elemets[c + 1][r + 1].flag === true
				) {
					count++;
				}
				if (
					this.isvalid(r + 1, c - 1) &&
					this.elemets[c - 1][r + 1].flag === true
				) {
					count++;
				}

				const block = new Block(r * 20, c * 20);
				var flag: boolean;
				if (this.elemets[c][r].flag) {
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
			}
		}
		// if (this.elemets === newelemets) {
		// 	console.log("fasfa");
		// }
		this.elemets = newelemets;
	}
}
