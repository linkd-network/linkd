"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaTopics = exports.TrackerEventType = exports.KafkaTopic = exports.ContentType = exports.AdModel = exports.SamplingRate = void 0;
var SamplingRate;
(function (SamplingRate) {
    SamplingRate[SamplingRate["Day"] = 86400] = "Day";
    SamplingRate[SamplingRate["HalfaDay"] = 43200] = "HalfaDay";
    SamplingRate[SamplingRate["Hour"] = 3600] = "Hour";
    SamplingRate[SamplingRate["Minute"] = 60] = "Minute";
})(SamplingRate = exports.SamplingRate || (exports.SamplingRate = {}));
var AdModel;
(function (AdModel) {
    AdModel[AdModel["CPM"] = 0] = "CPM";
    AdModel[AdModel["CPC"] = 1] = "CPC";
})(AdModel = exports.AdModel || (exports.AdModel = {}));
var ContentType;
(function (ContentType) {
    ContentType[ContentType["Gif"] = 0] = "Gif";
    ContentType[ContentType["Photo"] = 1] = "Photo";
    ContentType[ContentType["Video"] = 2] = "Video";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
var KafkaTopic;
(function (KafkaTopic) {
    KafkaTopic["SCEvents"] = "sc_events";
})(KafkaTopic = exports.KafkaTopic || (exports.KafkaTopic = {}));
var TrackerEventType;
(function (TrackerEventType) {
    TrackerEventType["Click"] = "click";
    TrackerEventType["View"] = "view";
    TrackerEventType["DoubleClick"] = "doubleClick";
    TrackerEventType["MouseOver"] = "mouseover";
})(TrackerEventType = exports.TrackerEventType || (exports.TrackerEventType = {}));
var KafkaTopics;
(function (KafkaTopics) {
    KafkaTopics["WebEvents"] = "WebEvents";
})(KafkaTopics = exports.KafkaTopics || (exports.KafkaTopics = {}));
//# sourceMappingURL=app.enums.js.map