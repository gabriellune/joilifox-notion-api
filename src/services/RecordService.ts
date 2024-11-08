import { NotionRepository } from "../repositories/NotionRepository";
import { CreateRecordProps, Record } from "../models/Record";

export class RecordService {
  constructor(private notionRepository: NotionRepository) {}

  createRecord(data: CreateRecordProps): Promise<Record> {
    return this.notionRepository.createRecord(data);
  }

  getRecord(id: string): Promise<Record> {
    return this.notionRepository.getRecordById(id);
  }

  updateRecord(id: string, data: CreateRecordProps): Promise<Record> {
    return this.notionRepository.updateRecord(id, data);
  }

  deleteRecord(id: string): Promise<void> {
    return this.notionRepository.deleteRecord(id);
  }
}
