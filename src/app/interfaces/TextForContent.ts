import {ContentSentenceDto} from './ContentSentenceDto';

export interface ContentDto {
  id: number;
  text: string;
  task: string;
  type: string;
  menuItemId:number;
  url:string;
  url1:string;
  code:string;
  order:number;
  numValue:number;
  sentences: ContentSentenceDto[] | undefined;
}
