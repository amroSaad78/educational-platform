import { DBSource } from "../server";
import { BaseModel } from "./baseModel";
import { injectable, Lifecycle, scoped } from "tsyringe";
import { EntityTarget } from "typeorm";

@injectable()
@scoped(Lifecycle.ContainerScoped)
export class DBRepository<T extends BaseModel> {
  constructor() {}
  create = async (item: T): Promise<T> => {
    try {
      return await DBSource.manager.save(item);
    } catch (err) {
      throw err;
    }
  };

  update = async (entity: EntityTarget<T>, criteria: object, query: object) => {
    try {
      await DBSource.manager.update(entity, criteria, query);
    } catch (err) {
      throw err;
    }
  };

  findOne = async (entity: EntityTarget<T>, filter: {}): Promise<T | null> => {
    try {
      return await DBSource.manager.findOne<T>(entity, { where: filter });
    } catch (err) {
      throw err;
    }
  };
}
