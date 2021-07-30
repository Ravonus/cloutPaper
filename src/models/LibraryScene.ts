/**
 * @author Chad Koslovsky
 * @email Chad@technomancy.it
 * @create date 2021-05-25 00:12:45
 * @modify date 2021-05-28 14:24:50
 * @desc [ LibraryScene postgres model. This extends the LibraryScene Table into a functional class throughout the application. Just include this file within a script and it will let you know all functionality you have via the database with this table.
 *        You will see the @Table class has all your Column info inside of it. You can set Hooks and Prototypes on the Acutal LibraryScene Class or LibraryScene Instance you pull. The model will always be attached to sequalize.model.
 *        If imported directly from this file Typing will work and let you know the database columns that are accepted. ]
 * @return {Model Instance} This return the LibraryScene Instance. You may Create/Delete/Update/Find LibraryScenes from postgress.
 * @example
 *
 * ```
 * import LibraryScene from './LibraryScene';
 *
 * LibraryScene.register(user, password, cb);
 *
 * const userLookup = await LibraryScene.findOne({where:{email:"test@email.com"}});
 *
 * const isCorrect = await userLookup.passwordCheck(passwordString);
 *
 * ```
 *
 */

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  AllowNull,
  BelongsTo,
} from '../../../../nodePaper/node_modules/sequelize-typescript';

import { Optional } from '../../../../nodePaper/node_modules/sequelize';

import Library from './Library';
import Scene from './Scene';

interface LibrarySceneAttributes {
  id: number;
  sceneId: number;
  libraryId: number;
  enabled: boolean;
  rules: object[];
  monitors: string | number[];
  size: number;
  location: number;
  opacity: number;
  mute: boolean;
  loop: boolean;
}
export interface LibrarySceneCreationAttributes
  extends Optional<
    LibrarySceneAttributes,
    | 'id'
    | 'rules'
    | 'monitors'
    | 'size'
    | 'location'
    | 'opacity'
    | 'mute'
    | 'loop'
    | 'enabled'
  > {}
@Table({ timestamps: false })
export default class LibraryScene extends Model<
  LibrarySceneAttributes,
  LibrarySceneCreationAttributes
> {
  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN })
  enabled?: boolean;
  @Column({ type: DataType.ARRAY(DataType.JSONB) })
  rules?: object[];
  @Column({ type: DataType.ARRAY(DataType.NUMBER) })
  monitors?: number[] | string;
  @Column({ type: DataType.FLOAT })
  size?: number;
  @Column({ type: DataType.FLOAT })
  location?: number;
  @Column({ type: DataType.FLOAT })
  opacity?: number;
  @Column({ type: DataType.BOOLEAN })
  mute?: boolean;
  @Column({ type: DataType.BOOLEAN })
  loop?: boolean;
  //relationships
  @ForeignKey(() => Library)
  @Column
  libraryId!: number;

  @BelongsTo(() => Library, 'libraryId')
  library!: Library;

  @ForeignKey(() => Scene)
  @Column
  sceneId!: number;

  @BelongsTo(() => Scene, 'sceneId')
  scene!: Scene;
}
