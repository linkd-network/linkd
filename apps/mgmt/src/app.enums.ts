
export enum SamplingRate {
    Day = 86400,
    HalfaDay = 43200,
    Hour = 3600,
    Minute = 60
}


export enum AdModel {
    CPM,
    CPC
}

export enum ContentType {
    Gif,
    Photo,
    Video
}



export enum KafkaTopic {
    SCEvents = 'sc_events'
}

export enum TrackerEventType {
    Click = 'click',
    View = 'view',
    DoubleClick = 'doubleClick',
    MouseOver = 'mouseover'
}
