(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"container\" (click)=\"enter($event)\">\r\n\t<h1>\r\n\t\tOPTIMUS PRIME\r\n\t\t<br><span>gurkirat2412@gmail.com</span>\r\n\t</h1>\r\n\t<div class=\"row\">\r\n\t\t<h2 class=\"col-sm-6 left\">\r\n\t\t\t<span>Score</span>\r\n\t\t\t<br> {{score}}\r\n\t\t</h2>\r\n\t\t<h2 class=\"col-sm-6 right\" *ngIf=\" !inGame \">\r\n\t\t\t<span>Best</span>\r\n\t\t\t<br> {{best}}\r\n\t\t</h2>\r\n\t\t<h2 class=\"col-sm-6 right\" *ngIf=\" inGame \">\r\n\t\t\t<span>Time</span>\r\n\t\t\t<br> {{time}}\r\n\t\t</h2>\r\n\t</div>\r\n\t<div class=\"list\">\r\n\t\t<h3>\r\n\t\t\t<span>Guess the next prime number</span>\r\n\t\t\t<br>{{prevStr}}\r\n\t\t\t<label *ngIf=\"inGame\">,\r\n\t\t\t\t<input type=\"text\" [(ngModel)]=\"input\" (keyup)=\"enter($event)\" #myInput/>{{ myInput.focus() }}</label>\r\n\t\t</h3>\r\n\t\t<div class=\"incorrect\" *ngIf=\"toLearn.length> 0\">\r\n\t\t\tRemember:\r\n\t\t\t<label *ngFor=\"let num of toLearn\">&nbsp;&nbsp;{{num}}&nbsp;&nbsp;\r\n\t\t\t</label>\r\n\t\t</div>\r\n\t\t<h3>\r\n\t\t\t<span *ngIf=\"!inGame\">Click to start</span>\r\n\t\t</h3>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var angular_ts_math__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-ts-math */ "./node_modules/angular-ts-math/dist/angular-ts-math.js");
/* harmony import */ var angular_ts_math__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(angular_ts_math__WEBPACK_IMPORTED_MODULE_2__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.timer = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(0, 1000);
        this.toLearn = [];
        this.time = null;
        this.score = 0;
        this.best = 0;
        this.prev = 5;
        this.prevStr = '2, 3, 5';
        this.next = null;
        this.input = null;
        this.inGame = false;
        this.level = 0;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.best = parseInt(localStorage.getItem('best'));
        if (!this.best) {
            this.best = 0;
        }
    };
    AppComponent.prototype.startTimer = function () {
        var _this = this;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = this.timer.subscribe(function (ticks) {
            if (_this.time - 1 > 0) {
                _this.time--;
            }
            else {
                _this.gameOver();
            }
        });
    };
    AppComponent.prototype.gameOver = function () {
        this.time = 0;
        if (this.score > this.best) {
            this.best = this.score;
        }
        localStorage.setItem('best', this.best + '');
        this.inGame = false;
    };
    AppComponent.prototype.onSubmit = function (autoInput) {
        var input = parseInt(this.input);
        if (this.input) {
            var level = this.getLevel(input);
            var correct = this.next == input;
            var incorrect = !correct && (!autoInput || this.level == level);
            if (correct) {
                this.score++;
                this.time += (level * 3);
            }
            else if (incorrect) {
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
    };
    AppComponent.prototype.begin = function () {
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
    };
    AppComponent.prototype.enter = function (event) {
        if (this.inGame) {
            this.onSubmit(event.keyCode != 13);
        }
        else {
            this.begin();
        }
    };
    AppComponent.prototype.nextPrime = function (num) {
        while (true) {
            num += 2;
            var max = angular_ts_math__WEBPACK_IMPORTED_MODULE_2__["angularMath"].powerOfNumber(num, 0.5);
            var isPrime = true;
            for (var i = 2; i <= max; i++) {
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
    };
    AppComponent.prototype.getLevel = function (num) {
        var toRet = 1;
        while (num >= 1) {
            toRet++;
            num = num / 10;
        }
        return toRet;
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModule"].forRoot()
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\NG\optimus-prime\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map