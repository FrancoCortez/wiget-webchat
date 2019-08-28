import {AttachmentDto} from './attachment.dto';

export interface ReceivesMessageDto {
  message?: string[];
  links?: string[];
  attachment?: AttachmentDto;
}
