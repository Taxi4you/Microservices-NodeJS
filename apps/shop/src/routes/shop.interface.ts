import { Request, Response } from 'express';

export interface IShopRoute {
    removeUserData(req: Request, res: Response);
    addSampleData(req: Request, res: Response);
    getAllUserData(req: Request, res: Response);
}
