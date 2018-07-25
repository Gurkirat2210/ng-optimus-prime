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

	toLearn: number[] = [];
	time: number = null;
	score: number = 0;
	best: number = 0;

	prev: number = 5;
	prevStr: string = '2, 3, 5';
	next: number = null;
	input: string = null;
	inGame: boolean = false;
	level: number = 0;

	ngOnInit(): void {
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
				this.time += (level * 2);
			} else if (incorrect) {
				this.toLearn.push(this.next);
				this.time -= level;
				if (this.toLearn.length == this.level) {
					this.gameOver();
				}
			}
			if (correct || incorrect) {
				this.prevStr += ', ' + this.next;
				this.next = this.nextPrime(this.next);
				this.level = this.getLevel(this.next);
				this.input = null;
			}
		}
	}

	begin(): void {
		this.time = 10;
		this.score = 0;
		this.prev = 5;
		this.prevStr = '2, 3, 5';
		this.toLearn = [];
		this.inGame = true;
		this.next = this.nextPrime(this.prev);
		this.level = this.getLevel(this.next);
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
		let toRet = 1;
		while (num >= 1) {
			toRet++;
			num = num / 10;
		}
		return toRet;
	}

}
