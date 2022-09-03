import { TrackerEventType } from "./app.enums";
export interface TrackerEvent {
    source: string;
    id: string;
    eventType: TrackerEventType;
    date: number;
}
