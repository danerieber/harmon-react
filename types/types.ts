export enum Action {
  NewChatMessage = 1,
  ChangeUsername,
  RequestUserInfo,
  GetChatMessages,
  UpdateMyUserInfo,
  GetAllUsers,
  JoinCall,
}

export type ChatMessage = {
  userId: string;
  data: {
    content: string;
    timestamp: string;
  };
};

export type ChatMessageChunk = {
  start?: number;
  total?: number;
  messages: ChatMessage[];
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
};
