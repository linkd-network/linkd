import { AdEventType } from "./app.enums";

export interface routeItem {
    text: string;
    path: string;
}

export interface CreateAdPayload {
    resourceType: string;
    title: string;
    contentURL: string;
    budget: number
    triggerType: string;
    costPerAction: number;
    destinationURL: string
}

export interface Ad {
    id: string;
    resourceType: string;
    title: string;
    contentURL: string;
    budget: number;
    costPerAction: number;
    triggerType: string;
    destinationURL: string;
    creationDate: string;
}

export interface SubscribeResponse {
    contractId: string;
    accountId: string;
}

export interface AnalyticsPayload {
    events: string[];
    contractBalnce: string,
    accounts: MonitorAccountPayload[];
}
export interface MonitorAccountPayload {
    name: string;
    amount: string;
    userId: string;
}