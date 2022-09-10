"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var CensusHttpClient = /** @class */ (function () {
    function CensusHttpClient() {
        this.post = function (data) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", '/mgmt/v1/tracker', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({ events: data }));
        };
    }
    return CensusHttpClient;
}());
var ReleaseManger = /** @class */ (function () {
    function ReleaseManger(periodicTime, eventsQueLimit) {
        if (periodicTime === void 0) { periodicTime = 5000; }
        if (eventsQueLimit === void 0) { eventsQueLimit = 1000; }
        var _this = this;
        this.periodicTime = periodicTime;
        this.eventsQueLimit = eventsQueLimit;
        this.minimumAmountOfEventForRelease = 5;
        this.eventsQue = [];
        this.subscribers = [];
        this.startPeriodicTimeCounter = function () {
            setInterval(function () {
                if (_this.eventsQue.length > _this.minimumAmountOfEventForRelease) {
                    _this.triggerPeriodicRelease();
                }
            }, _this.periodicTime);
        };
        this.triggerPeriodicRelease = function () {
            _this.release();
        };
        this.triggerLimitReachedRelease = function () {
            _this.release();
        };
        this.clearQue = function () {
            _this.eventsQue.length = 0;
        };
        this.release = function () {
            _this.subscribers.forEach(function (subscriber) {
                subscriber(_this.eventsQue);
            });
            _this.clearQue();
        };
        // Public API
        this.triggerCustomRelease = function () {
            _this.release();
        };
        this.subscribeToRelease = function (cb) {
            _this.subscribers.push(cb);
        };
        this.addEvent = function (e) {
            _this.eventsQue.push(e);
            if (_this.eventsQue.length >= _this.eventsQueLimit) {
                _this.triggerLimitReachedRelease();
            }
        };
        this.startPeriodicTimeCounter();
    }
    return ReleaseManger;
}());
var EventHandler = /** @class */ (function () {
    function EventHandler(_a) {
        var eventType = _a.eventType, passEventToOrchestratorFn = _a.passEventToOrchestratorFn;
        var _this = this;
        this.listener = function (e) {
            _this.passEventToOrchestratorFn(e);
        };
        this._eventType = eventType;
        this.passEventToOrchestratorFn = passEventToOrchestratorFn;
    }
    return EventHandler;
}());
var Orchestrator = /** @class */ (function () {
    function Orchestrator() {
        var _this = this;
        this._releaseManger = new ReleaseManger();
        this._censusHttpClient = new CensusHttpClient();
        this.init = function () {
            _this._releaseManger.subscribeToRelease(function (eventsList) {
                _this._censusHttpClient.post(eventsList);
            });
            _this.subscribeToEvents(window);
        };
        this.subscribeToEvents = function (target) {
            var otherArguments = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                otherArguments[_i - 1] = arguments[_i];
            }
            for (var key in target) {
                if (/^on/.test(key) && !/pointer/.test(key) && !['onmousemove', 'onmouseout'].includes(key)) {
                    console.log(key);
                    var eventType = key.substr(2);
                    var evntHandler_1 = new EventHandler({
                        eventType: eventType,
                        passEventToOrchestratorFn: _this.processEvent
                    });
                    var listener = evntHandler_1.listener;
                    target.addEventListener.apply(target, __spreadArray([eventType, listener], otherArguments, false));
                }
            }
            // dynamically install listeners for all manually triggered events, just-in-time before they're dispatched ;D
            var dispatchEvent_original = EventTarget.prototype.dispatchEvent;
            var evntHandler = new EventHandler({
                eventType: 'manuallyTriggeredEvents',
                passEventToOrchestratorFn: _this.processEvent
            });
            function dispatchEvent(event) {
                target.addEventListener.apply(target, __spreadArray([event.type, evntHandler.listener], otherArguments, false)); // multiple identical listeners are automatically discarded
                dispatchEvent_original.apply(this, arguments);
            }
            EventTarget.prototype.dispatchEvent = dispatchEvent;
            if (EventTarget.prototype.dispatchEvent !== dispatchEvent)
                console.warn("Browser is smarter than you think!");
        };
        this.processEvent = function (e) {
            var event = {
                name: e.type,
                // target: e.target,
                clientX: e.clientX,
                clientY: e.clientY,
                // path:e.path
            };
            console.log(e);
            _this._releaseManger.addEvent(event);
        };
        this.unsubscribeEvents = function () { };
    }
    return Orchestrator;
}());
var orchestrator = new Orchestrator();
orchestrator.init();
