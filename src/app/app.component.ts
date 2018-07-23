import { Component, OnInit } from '@angular/core';
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
	private subscription: Subscription;
	score: number = 0;
	input: number = null;
	time: number = 10;

	best : number = null;
	prev: number = 2;
	next: number = null;
	prevStr: string = '2, ';
	inGame: boolean = true;

	ngOnInit(): void {
		this.next = this.nextPrime(this.prev);
		this.startTimer();
	}

	startTimer(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
		this.subscription = this.timer.subscribe(ticks => {
			if (this.time > 0) {
				this.time--;
			} else {
				this.subscription.unsubscribe();
				this.timeout();
			}
		});
	}

	onSubmit(): void {
		if (this.next != this.input) {
			window.alert('Incorrect');
		} else {
			this.subscription.unsubscribe();

			this.score++;
			this.prevStr += this.next + ', ';
			this.next = this.nextPrime(this.next);
			this.time = 10;
			while (this.input > 10) {
				this.time += 5;
				this.input = this.input / 10;
			}

			this.startTimer();
		}
		this.input = null;
	}

	enter(event: any): void {
		if (event.keyCode == 13) {
			this.onSubmit();
		}
	}

	timeout(): void {
		this.best = this.score;
		this.inGame = false;
		window.alert('Game Over');
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
