import { CreateOptions, FindOptions, FindOrCreateOptions, UpdateOptions } from "sequelize";
import { IService } from "./interfaces/IService";
import { WhereOptions } from "sequelize";

export default class BaseService<T> implements IService<T> {
  public model;
  /**
   * @param  {Model} model
   */
  constructor(model) {
    this.model = model;
  }
  /**
   * @param  {T} data
   * @param options
   * @returns Promise
   */
  public async createOne(data: T, options?: CreateOptions): Promise<T> {
    const result = await this.model.create({ ...data, ...options });
    return result;
  }

  /**
   * @returns Promise
   * @param options
   */
  public async findAll(options: FindOptions): Promise<T[]> {
    const result = await this.model.findAll(options);
    return result;
  }

  /**
   * @returns Promise
   * @param options
   */
  public async findOne(options: FindOptions): Promise<T> {
    const result = await this.model.findOne({
        ...options,
    });
    return result;
  }

  /**
   * @returns Promise
   * @param options
   */
  public async deleteOne(options: WhereOptions): Promise<boolean> {

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
  public async updateOne(data: T, options: UpdateOptions): Promise<any> {

    const results = await this.model.update(
      {...data}, {...options} );

    return  results ;
  }

  /**
   * @param  {object} options
   * @returns Promise
   */
  public async findOrCreate(options: FindOrCreateOptions): Promise<{dataValues: T, isNewRecord: boolean}> {
    const [result] = await this.model.findOrCreate({...options});
    const { dataValues, _options: {isNewRecord} } = result;
    return  { dataValues, isNewRecord };
  }

}
