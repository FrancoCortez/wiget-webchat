export interface MessageUiModel {
  id?: string;
  content?: string;
  originalContent?: string;
  type?: string;
  subject?: string;
  hour?: Date;
  mediaUrl?: string;
  redirectUrl?: string;
  mimeType?: string;
  nameFile?: string;
  agentName?: string;
}
