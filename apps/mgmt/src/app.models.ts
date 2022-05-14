/* eslint-disable prettier/prettier */
import { TrackerEventType } from "./app.enums";
import { Ad } from "./model/ad.entity";

export interface TrackerEvent {
    source: string,
    id: string,
    eventType: TrackerEventType,
    date: number
}


export interface PostAdPayload {
    coinsPerEvent: number
    name: string;
    totalBudget: number;
    content: string;
    eventType: string;
}
