const globalBffServer = 'NGINX_REPLACE_BFF_PORTAL_WEBCHAT';
export const environment = {
  production: false,
  socketServer: 'NGINX_REPLACE_SOCKET_SERVER',
  socketPath: 'NGINX_REPLACE_SOCKET_PATH',
  socketTransports: 'websocket',
  bffServer: globalBffServer,
  bffGetAgent: `${globalBffServer}/webchat/channel/did`,
  bffUploadFile: `${globalBffServer}/webchat/message/attachment/upload`,
  agentImg: 'https://cdn.chattigo.com/assets/img/profiles',

  // Constant Websocket Action
  joinChat: 'join-chat',
  sendMessage: 'sendMessage',
  newMessage: 'newMessage',
  leaveChat: 'leave-chat',
  leaveAgentChat: 'notifyClosed',

  configProfile: 'NGINX_REPLACE_SPRING_PROFILES_ACTIVE',
  configPath: 'NGINX_REPLACE_CONFIG_SERVER'
};
