

class CensusHttpClient {
  post = (data: any[]) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/mgmt/v1/tracker', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ events: data }));
  }
}

class ReleaseManger {

  private readonly minimumAmountOfEventForRelease = 5;
  private readonly eventsQue: any[] = [];
  private readonly subscribers: Function[] = [];
  constructor(private periodicTime = 5000, private eventsQueLimit = 1000) {
    this.startPeriodicTimeCounter()
  }

  private startPeriodicTimeCounter = () => {
    setInterval(() => {
      if (this.eventsQue.length > this.minimumAmountOfEventForRelease) {
        this.triggerPeriodicRelease()
      }
    }, this.periodicTime)
  }

  private triggerPeriodicRelease = () => {
    this.release();
  }

  private triggerLimitReachedRelease = () => {
    this.release();
  }


  private clearQue = () => {
    this.eventsQue.length = 0;
  }

  private release = () => {
    this.subscribers.forEach((subscriber) => {
      subscriber(this.eventsQue)
    })
    this.clearQue()
  }

  // Public API

  public triggerCustomRelease = () => {
    this.release();
  }
  public subscribeToRelease = (cb: Function) => {
    this.subscribers.push(cb);
  }

  public addEvent = (e: any) => {
    this.eventsQue.push(e);
    if (this.eventsQue.length >= this.eventsQueLimit) {
      this.triggerLimitReachedRelease()
    }
  }


}

class EventHandler {
  readonly _eventType: string;
  passEventToOrchestratorFn: Function;

  constructor({ eventType, passEventToOrchestratorFn }: { eventType: string, passEventToOrchestratorFn: Function }) {
    this._eventType = eventType
    this.passEventToOrchestratorFn = passEventToOrchestratorFn;
  }

  listener = (e: any) => {
    this.passEventToOrchestratorFn(e)
  }
}



class Orchestrator {
  private _releaseManger = new ReleaseManger()
  private _censusHttpClient = new CensusHttpClient()
  constructor() {
  }

  init = () => {
    this._releaseManger.subscribeToRelease((eventsList: any[]) => {
      this._censusHttpClient.post(eventsList)
    })
    this.subscribeToEvents(window);
  };

  private subscribeToEvents = (target: Window, ...otherArguments: any) => {
    for (const key in target) {
      if (/^on/.test(key) && !/pointer/.test(key) && !['onmousemove', 'onmouseout'].includes(key)) {

        console.log(key);

        const eventType = key.substr(2);
        const evntHandler = new EventHandler({
          eventType,
          passEventToOrchestratorFn: this.processEvent
        })
        const { listener } = evntHandler;
        target.addEventListener(eventType, listener, ...otherArguments);
      }
    }

    // dynamically install listeners for all manually triggered events, just-in-time before they're dispatched ;D
    const dispatchEvent_original = EventTarget.prototype.dispatchEvent;
    const evntHandler = new EventHandler({
      eventType: 'manuallyTriggeredEvents',
      passEventToOrchestratorFn: this.processEvent
    })

     const dispatchEvent = (event: any)=> {
      target.addEventListener(event.type, evntHandler.listener, ...otherArguments); // multiple identical listeners are automatically discarded
      dispatchEvent_original(event)
    }
    
    EventTarget.prototype.dispatchEvent = <any>dispatchEvent;
    if (EventTarget.prototype.dispatchEvent !== dispatchEvent)
      console.warn(`Browser is smarter than you think!`);
  };

  private processEvent = (e: any) => {
    let event = {
      name: e.type,
      // target: e.target,
      clientX: e.clientX,
      clientY: e.clientY,
      // path:e.path
    }
    console.log(e);

    this._releaseManger.addEvent(event)
  };

  unsubscribeEvents = () => { };
}
let orchestrator = new Orchestrator();
orchestrator.init();