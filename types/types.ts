import { Moment } from "moment";

export enum Action {
  NewChatMessage = 1,
  ChangeUsername,
  RequestUserInfo,
  GetChatMessages,
  UpdateMyUserInfo,
  GetAllUsers,
  JoinCall,
  GetMySettings,
  UpdateMySettings,
  EditChatMessage,
}

export type ChatMessage = {
  chatId: string;
  userId: string;
  data: ChatMessageData;
  edited?: boolean;
};

export type ChatMessageChunk = {
  start?: number;
  total?: number;
  messages: ChatMessage[];
};

export type ChatMessageData = {
  content: string;
  timestamp: number;
  editForTimestamp: number;
  replyToUserId?: string;
  replyTo?: ChatMessageData;
};

export type IsTalking = {
  value: boolean;
  time: Moment;
};

export type MySettings = {
  audioSettings: MediaTrackConstraints;
};

export enum Presence {
  Offline = 1,
  Online,
  Away,
  InCall,
}

export type User = {
  username: string;
  presence: Presence;
  status: string;
  icon: string;
  bannerUrl: string;
  usernameColor: string;
  changedUsername: boolean;
  isDeveloper: boolean;
};
