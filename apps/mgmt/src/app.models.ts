/* eslint-disable prettier/prettier */
import { TrackerEventType } from "./app.enums";
import { EntityType } from "./enums/drt.enums";
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

export interface CreateUserPayload {
    accountId: string;
}

export interface UserDataViewPayload {
    accountId: string;
    lastUpdatedAt: Date;
    createdAt: Date;
}

export interface CreateDRTSubscriptionPayload {
    subscriberType: EntityType;
    userAccountId: string;
    name: string;
    customMetadata: Map<string, string>;
}

export interface DRTSubscriptionViewPayload {
    id: number;
    name: string;
    customMetadata: Map<string, string>;
    user: UserDataViewPayload;
    accessKeyNFT: string;
    lastUpdatedAt: Date;
    createdAt: Date;
}