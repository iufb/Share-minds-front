import { createEvent, createStore } from "effector";

//stores
export const $activeTab = createStore<string | null>("Posts");

//events
export const changeActiveTab = createEvent<string | null>();

$activeTab.on(changeActiveTab, (_, tab) => tab);
