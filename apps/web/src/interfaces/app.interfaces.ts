export interface NavigationNode {
    text: string;
    path: string;
    icon: JSX.Element;
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
    contractBalance: string,
    accounts: MonitorAccountPayload[];
}
export interface MonitorAccountPayload {
    name: string;
    amount: string;
    userId: string;
}