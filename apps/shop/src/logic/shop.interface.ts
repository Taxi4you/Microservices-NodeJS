import { DataSummary } from '../types';

export interface IShopLogic {
    removeUserData(email: string): Promise<void>;
    addSampleData(token: string): Promise<void>;
    getAllUserData(token: string, email: string): Promise<DataSummary>;
}
