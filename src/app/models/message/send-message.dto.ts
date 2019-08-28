import {AttachmentDto} from './attachment.dto';

export interface SendMessageDto {
  id?: string;
  did: string;
  msisdn: string;
  type: string;
  // channel: string = 'WEBCHAT';
  content?: string;
  name?: string;
  isAttachment: boolean;
  attachment?: AttachmentDto;
}
