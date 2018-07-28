import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';
import { Subscription } from "rxjs";
import { angularMath } from 'angular-ts-math';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	constructor(private http: HttpClient) {
		this.http.get('https://jsonip.com').subscribe((ipOfNetwork) =>
			this.ipAddress = ipOfNetwork['ip']);
	}

	timer = timer(0, 1000);
	subscription: Subscription;
	ipAddress: Object;
	SERVER_GET: string = "http://182.71.214.83:3000/get";
	SERVER_SAVE: string = "http://182.71.214.83:3000/save";
	TIME: number = 10;
	START: number = 3;
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
	input: number;
	inGame: boolean = false;
	name: string;
	gBest: { score: any, initials: string } = { score: null, initials: null };


	ngOnInit(): void {
		this.prev = this.START;
		this.prevStr = this.START_STR
		this.best = parseInt(localStorage.getItem('best'));
		if (!this.best) {
			this.best = 0;
		}

		this.http.get(this.SERVER_GET).subscribe(res => {
			this.gBest = <{ score: any, initials: string }>res;
			this.saveGBestLocally();
		});

		if (this.gBest.score == null || this.gBest.initials == null) {
			this.gBest.score = localStorage.getItem('gBest');
			this.gBest.initials = localStorage.getItem('gBestIni');
		}
		
		if (this.gBest.score != null && this.best > this.gBest.score) {
			this.gBest.score = this.best;
			this.gBest.initials = this.ipAddress + '';
			this.saveGBestLocally();
			this.saveGBestGlobally();
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

		if (this.best > this.gBest.score) {
			this.gBest.score = this.best;
			this.gBest.initials = this.ipAddress.toString();
			this.saveGBestLocally();
			this.saveGBestGlobally();
		}

		this.inGame = false;
	}

	onSubmit(autoInput: boolean): void {
		let input = parseInt(this.input + '');

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
			this.name = name;
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

	saveGBestLocally() {
		localStorage.setItem('gBest', this.gBest.score);
		localStorage.setItem('gBestIni', this.gBest.initials);
	}

	saveGBestGlobally() {
		this.http.post(this.SERVER_SAVE, this.gBest, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		}).pipe(catchError(err => {
			throw err;
		})).subscribe(res => {
			console.log(res);
		});
	}

}
