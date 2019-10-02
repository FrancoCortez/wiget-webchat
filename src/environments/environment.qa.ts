// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --qa` replaces `environment.ts` with `environment.qa.ts`.
// The list of file replacements can be found in `angular.json`.
const globalBffServer = 'https://kops.chattigo.com';
export const environment = {
  production: false,
  socketServer: 'https://kops.chattigo.com',
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

  configProfile: 'qa',
  configPath: 'https://kops.chattigo.com/config'
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
