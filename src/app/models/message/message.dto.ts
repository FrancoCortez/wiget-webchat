import {AttachmentDto} from './attachment.dto';

export interface MessageDto {
  id?: string;
  msisdn: string;
  type: string;
  timestamp?: Date;
  content?: string;
  name?: string;
  isAttachment: boolean;
  attachment?: AttachmentDto;
}
