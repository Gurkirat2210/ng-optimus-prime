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

	incorrect: number[] = [];
	time: number = null;
	score: number = 0;
	best: number = 0;

	prev: number = 5;
	prevStr: string = '2, 3, 5';
	next: number = null;
	input: number = null;
	inGame: boolean = false;

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

	onSubmit(): void {
		this.input = parseInt(''+this.input);

		if (this.input) {

			this.subscription.unsubscribe();
			if (this.next != this.input) {
				this.incorrect.push(this.input);
				this.time -= 3;
				if (this.incorrect.length == 3) {
					this.gameOver();
				}
			} else {

				this.score++;
				while (this.input > 1) {
					this.time += 3;
					this.input = this.input / 10;
				}
			}
			this.prevStr += ', ' + this.next;
			this.next = this.nextPrime(this.next);
			this.startTimer();
		}
		this.input = null;
	}

	begin(): void {
		this.time = 10;
		this.score = 0;
		this.prev = 5;
		this.prevStr = '2, 3, 5';
		this.incorrect = [];
		this.inGame = true;
		this.next = this.nextPrime(this.prev);
		this.startTimer();
	}

	enter(event: any): void {
		if (this.inGame) {
			this.onSubmit();
		} else {
			this.begin();
		}
	}

	nextPrime(num: number) {
		while (true) {
			let max = angularMath.powerOfNumber(++num, 0.5);
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

}
