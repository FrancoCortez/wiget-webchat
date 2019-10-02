const globalBffServer = 'https://k8s.chattigo.com';
export const environment = {
  production: false,
  socketServer: 'https://k8s.chattigo.com',
  socketPath: '/webchat/socket.io/',
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

  configProfile: 'master',
  configPath: 'https://k8s.chattigo.com/config'

};
