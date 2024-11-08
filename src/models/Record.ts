export interface CreateRecordProps {
  company: string;
  campaign: string;
  content: string;
  description: string;
  where: string;
  plannedDate: string;
  language: string;
  imageFiles?: { file: { url: string }; name: string }[];
  imageContent?: string;
  }

export interface Record extends Omit<CreateRecordProps, 'id'> {
  id: string;
}
