/**
 * @author Chad Koslovsky
 * @email Chad@technomancy.it
 * @create date 2021-05-25 00:12:45
 * @modify date 2021-05-29 05:05:22
 * @desc [ Scene postgres model. This extends the Scene Table into a functional class throughout the application. Just include this file within a script and it will let you know all functionality you have via the database with this table.
 *        You will see the @Table class has all your Column info inside of it. You can set Hooks and Prototypes on the Acutal Scene Class or Scene Instance you pull. The model will always be attached to sequalize.models.
 *        If imported directly from this file Typing will work and let you know the database columns that are accepted. ]
 * @return {Model Instance} This return the Scene Instance. You may Create/Delete/Update/Find Scenes from postgress.
 */

import seq, { Optional } from '../../../../nodePaper/node_modules/sequelize';

import sequelize, {
  Table,
  Column,
  Model,
  Default,
  AllowNull,
  DataType,
  BelongsTo,
  Unique,
  BelongsToMany,
  HasMany,
} from '../../../../nodePaper/node_modules/sequelize-typescript';

import Library from './Library';
import LibraryScene from './LibraryScene';

// Scene functions

export interface SceneAttributes {
  id: number;
  extra: Object;
  enabled: boolean;
  rules: { [key: string]: {} }[];
  title: string;
  description: string;
}

export interface SceneCreationAttributes
  extends Optional<
    SceneAttributes,
    'id' | 'extra' | 'rules' | 'description' | 'enabled'
  > {}

@Table({ timestamps: true })
export default class Scene extends Model<
  SceneAttributes,
  SceneCreationAttributes
> {
  //Columns
  @Default(false)
  @Column({ type: DataType.BOOLEAN })
  enabled!: string;
  @AllowNull(true)
  @Column({ type: DataType.TEXT })
  description!: string;
  @AllowNull(false)
  @Unique(true)
  @Column({ type: DataType.TEXT })
  title!: string;
  @AllowNull(true)
  @Column({ type: DataType.JSONB })
  extra!: Object;
  @AllowNull(true)
  @Column({ type: DataType.ARRAY(DataType.JSONB) })
  rules!: Object[];

  //Relationships

  @BelongsToMany(() => Library, () => LibraryScene, 'sceneId')
  items!: Array<Library & { LibraryScene: LibraryScene }>;
}
