import { Model } from "sequelize-typescript";
import { IService } from "./interfaces/IService";

export default class BaseService<T> implements IService<T> {
  public model;
  /**
   * @param  {Model} model
   */
  constructor(model: Model) {
    this.model = model;
  }
  /**
   * @param  {T} data
   * @param options
   * @returns Promise
   */
  public async createOne(data: T, options: object = {}): Promise<T> {
    const result = await this.model.create({ ...data, ...options });
    return result;
  }

  /**
   * @returns Promise
   * @param options
   */
  public async findAll(options: object = {}): Promise<any> {
    const result = await this.model.findAll(options);
    return result;
  }

  /**
   * @returns Promise
   * @param options
   */
  public async findOne(options: object): Promise<T> {
    const result = await this.model.findOne({
        ...options,
    });
    return result;
  }

  /**
   * @returns Promise
   * @param options
   */
  public async deleteOne(options: object): Promise<boolean> {

    const result = await this.model.destroy({
        ...options,
    });

    return result;
  }

/**
 * @param  {object} data
 * @param options
 * @returns Promise
 */
  public async updateOne(data: object, options: object): Promise<any> {

    const results = await this.model.update(
      {...data}, {...options} );

    return  results ;
  }

  /**
   * @param  {object} options
   * @returns Promise
   */
  public async findOrCreate(options: object): Promise<any> {
    const [result] = await this.model.findOrCreate({...options});
    const { dataValues, _options: {isNewRecord} } = result;
    return  { dataValues, isNewRecord };
  }

}
