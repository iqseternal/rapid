import type { EventAction } from '@meta2d/core';
import type { Events } from 'vue';

type EventName<Key> = Key extends `on${infer U}` ? U : never;

export interface EventType {
  name: string;
  event: 'enter' | 'leave' | 'active' | 'inactive' | 'click' | 'dbclick';
}

export interface EventBehavior {
  name: string;
  behavior: EventAction;
  depend: {


  }[];
}
