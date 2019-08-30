import { Request, Response } from "express";
import { HttpResponse } from "../utils";
import { IController } from "./interfaces/IController";
import { IService } from "./interfaces/IService";

export default class BaseController implements IController {
  public service: any;
  public modelName: string;

  /**
   * @param  {IService<any>} service
   * @param  {string} modelName
   */
  constructor(service: any, modelName: string) {
    this.service = service;
    this.modelName = modelName;
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {response}
   */
  public async createRecord(req: Request, res: Response) {
    const { body } = req;
    const data = await this.service.createOne(body);
    return res.json({
      data,
      message: `${this.modelName} created successfully`,
      success: true,
    });
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {response}
   */
  public async findAllRecords(req: Request, res: Response) {
    const data = await this.service.findAll();
    return HttpResponse.sendResponse(res, true, 200, 'google', data);
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {response}
   */
  public async deleteRecord(req: Request, res: Response) {
    const { params: { id } }  = req;
    const options = { where: { id } };
    await this.service.deleteOne(options);
    return res.status(200).send({
      message: `${this.modelName} deleted successfully`,
      success: false,
    });
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {response}
   */
  public async findOneRecord(req: Request, res: Response) {
    const { params: { id } }  = req;
    const options = { where: { id } };
    const result = await this.service.findOne(options);
    if (!result) {
      return HttpResponse.sendResponse(res, false, 404, `${this.modelName} Not Found`);
    }
    return HttpResponse.sendResponse(res, true, 200, null, result);
  }

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns {response}
   */
  public async updateRecord(req: Request, res: Response) {
    const { params: { id }, body }  = req;
    const options = { where: { id } };
    const result = await this.service.updateOne(body, options);

    return res.json({
      data: result,
      message: `${this.modelName} updated successfully`,
      success: true,
    });
  }

}
