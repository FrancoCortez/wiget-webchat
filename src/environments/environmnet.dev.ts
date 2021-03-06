// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const globalBffServer = 'https://k8s-dev.chattigo.com';

export const environment = {
  production: false,
  socketServer: 'https://k8s-dev.chattigo.com',
  socketPath: '/feature-eqp1-483/bff-portal-webchat/socket.io/',
  socketTransports: 'websocket',
  bffServer: globalBffServer,
  bffGetAgent: `${globalBffServer}/feature-eqp1-483/bff-portal-webchat/channel/did`,
  bffUploadFile: `${globalBffServer}/feature-eqp1-483/bff-portal-webchat/message/attachment/upload`,
  agentImg: 'https://develop.cdn.chattigo.com/assets/img/profiles',

  // Constant Websocket Action
  joinChat: 'join-chat',
  sendMessage: 'sendMessage',
  newMessage: 'newMessage',
  leaveChat: 'leave-chat',
  /*socketServer: 'https://kops.chattigo.com',
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
  leaveChat: 'leave-chat',*/

  configProfile: 'development',
  configPath: 'https://kops.chattigo.com/config'
  //configPath: 'http://localhost:8888'


};
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
/* const globalBffServer = 'https://kops.chattigo.com';
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


};
*/

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
