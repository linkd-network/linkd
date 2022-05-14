import { AdEventType } from "./app.enums";

export interface routeItem {
    text: string;
    path: string;
}

export interface CreateAdPayload {
    coinsPerEvent: number;
    name: string;
    totalBudget: number
    content: string
    eventType: string
}

export interface Ad {
    id: string;
    name: string;
    content: string;
    creationDate: string;
}

export interface SubscribeResponse {
    contractId: string;
    accountId: string;
}

export interface MonitorPayload {
    events: string[];
    contractBalnce: string,
    accounts: MonitorAccountPayload[];
}
export interface MonitorAccountPayload {
    name: string;
    amount: string;
}