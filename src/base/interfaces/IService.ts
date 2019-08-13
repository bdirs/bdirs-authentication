export interface IService<T> {
  findOne: (options: object) => Promise<T>;
  findAll: (options?: object) => Promise<T[]>;
  deleteOne: (options: object) => Promise<boolean>;
  updateOne: (data: object, options: object) => Promise<any>;
  createOne: (data: T, options?: object) => Promise<T>;
  findOrCreate: (options: object) => Promise<object>;
}
