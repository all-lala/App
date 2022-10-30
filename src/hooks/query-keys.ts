export const queryKeys = {
  authCheck: () => ['authCheck'],
  authUser: () => ['authUser'],
  googleFont: () => ['googleFont'],
  chat: (id?: string) => ['chat', id],
  chats: () => ['chats'],
  lottie: (url?: string) => ['lottie', url],
  alert: (id?: string) => ['alert', id],
  alerts: () => ['alerts'],
};
