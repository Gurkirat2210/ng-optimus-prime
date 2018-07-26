import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';
import { Subscription } from "rxjs";
import { angularMath } from 'angular-ts-math';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	timer = timer(0, 1000);
	subscription: Subscription;

	TIME: number = 10;
	START: number = 5;
	START_STR: string = "2, 3";
	TIME_MUL: number = 3;

	toLearn: number[] = [];
	score: number = 0;
	time: number;
	best: number;
	prev: number;
	prevStr: string;
	next: number;
	lives: number;
	level: number;
	input: string;
	inGame: boolean = false;

	ngOnInit(): void {
		this.prev = this.START;
		this.prevStr = this.START_STR
		this.best = parseInt(localStorage.getItem('best'));
		if (!this.best) {
			this.best = 0;
		}
	}

	startTimer(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
		this.subscription = this.timer.subscribe(ticks => {
			if (this.time - 1 > 0) {
				this.time--;
			} else if (this.lives > 1) {
				this.lives--;
				this.time = this.TIME;
			} else {
				this.gameOver();
			}
		});
	}

	gameOver(): void {
		this.time = 0;
		if (this.score > this.best) {
			this.best = this.score;
		}
		localStorage.setItem('best', this.best + '');
		this.inGame = false;
	}

	onSubmit(autoInput: boolean): void {
		let input = parseInt(this.input);

		if (this.input) {
			let level = this.getLevel(input);
			let correct = this.next == input;
			let incorrect = !correct && (!autoInput || this.level == level);
			if (correct) {
				this.score++;
				this.time += (level * this.TIME_MUL);
			} else if (incorrect) {
				this.toLearn.push(this.next);
				this.time -= level;
				this.lives--;
				if (this.lives == 0) {
					this.gameOver();
				}
			}
			if (correct || incorrect) {
				this.prevStr += ', ' + this.next;
				this.next = this.nextPrime(this.next);
				this.level = this.getLevel(this.next);
				this.lives = this.getLives(this.level, this.toLearn.length);
				this.input = null;
			}
		}
	}

	begin(): void {
		this.time = this.TIME;
		this.score = 0;
		this.prev = this.START
		this.prevStr = this.START_STR
		this.toLearn = [];
		this.inGame = true;
		this.next = this.nextPrime(this.prev);
		this.level = this.getLevel(this.next);
		this.lives = this.getLives(this.level, this.toLearn.length);
		this.input = null;
		this.startTimer();
	}

	enter(event: any): void {
		if (this.inGame) {
			this.onSubmit(event.keyCode != 13);
		} else {
			this.begin();
		}
	}

	nextPrime(num: number) {
		while (true) {
			num += 2;
			let max = angularMath.powerOfNumber(num, 0.5);
			let isPrime = true;
			for (let i = 2; i <= max; i++) {
				if (num % i == 0) {
					isPrime = false;
					break;
				}
			}
			if (isPrime) {
				console.log(num);
				return num;
			}
		}
	}

	getLevel(num: number) {
		let toRet = 0;
		while (num >= 1) {
			toRet++;
			num = num / 10;
		}
		return toRet;
	}

	getLives(level: number, mistakes: number) {
		return level - mistakes + 1;
	}
}
