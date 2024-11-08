import axios, { AxiosResponse } from "axios";
import { CreateRecordProps, Record } from "../models/Record.ts";
import dotenv from "dotenv";

dotenv.config();

export class NotionRepository {
  private notionAPIUrl = "https://api.notion.com/v1/pages";
  private notionAPIKey = process.env.NOTION_API_KEY!;
  private notionDatabaseId = process.env.NOTION_DATABASE_ID!;
  private notionVersion = "2021-05-13";

  private get headers() {
    return {
      "Authorization": `Bearer ${this.notionAPIKey}`,
      "Notion-Version": this.notionVersion,
      "Content-Type": "application/json",
    };
  }

  private buildProperties(data: CreateRecordProps) {
    return {
      Company: { title: [{ text: { content: data.company } }] },
      Campaign: { rich_text: [{ text: { content: data.campaign } }] },
      Content: { rich_text: [{ text: { content: data.content } }] },
      Description: { rich_text: [{ text: { content: data.description } }] },
      Where: { rich_text: [{ text: { content: data.where } }] },
      PlannedDate: { date: { start: data.plannedDate } },
      Language: { rich_text: [{ text: { content: data.language } }] },
    };
  }

  private async makeRequest<T>(method: string, url: string, data?: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        headers: this.headers,
        data,
      });
      return response.data;
    } catch (error) {
      console.error(`Error making ${method} request to ${url}:`, error);
      throw new Error('Failed to communicate with Notion API');
    }
  }

  async createRecord(data: CreateRecordProps): Promise<Record> {
    const body = {
      parent: { database_id: this.notionDatabaseId },
      properties: this.buildProperties(data),
    };
    return this.makeRequest<Record>('post', this.notionAPIUrl, body);
  }

  async getRecordById(id: string): Promise<Record> {
    return this.makeRequest<Record>('get', `${this.notionAPIUrl}/${id}`);
  }

  async updateRecord(id: string, data: CreateRecordProps): Promise<Record> {
    const body = {
      properties: this.buildProperties(data),
    };
    return this.makeRequest<Record>('patch', `${this.notionAPIUrl}/${id}`, body);
  }

  async deleteRecord(id: string): Promise<void> {
    await this.makeRequest<void>('delete', `${this.notionAPIUrl}/${id}`);
  }
}
