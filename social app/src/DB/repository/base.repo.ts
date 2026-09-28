import { Model } from "mongoose";
export abstract class BaseRepository<T> {
    protected model: Model<T>;
    constructor(model: Model<T>) { this.model = model; }
    async create(data: Partial<T>): Promise<T> {
        return (await this.model.create(data)) as T;
    }
    async findOne(filter: any): Promise<T | null> {
        return await this.model.findOne(filter);
    }
    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }
    async find(filter: any = {}): Promise<T[]> {
        return await this.model.find(filter);
    }
    async updateOne(filter: any, data: any): Promise<T | null> {
        return await this.model.findOneAndUpdate(filter, data, { new: true });
    }
    async deleteOne(filter: any): Promise<T | null> {
        return await this.model.findOneAndDelete(filter);
    }
}