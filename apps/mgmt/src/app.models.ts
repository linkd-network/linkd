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
    resourceType: string;
    title: string;
    contentURL: string;
    budget: number
    triggerType: string;
    costPerAction: number;
    destinationURL: string
}
