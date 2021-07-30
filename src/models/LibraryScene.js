"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("../../../../nodePaper/node_modules/sequelize-typescript");
const Library_1 = __importDefault(require("./Library"));
const Scene_1 = __importDefault(require("./Scene"));
let LibraryScene = class LibraryScene extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], LibraryScene.prototype, "enabled", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.JSONB) }),
    __metadata("design:type", Array)
], LibraryScene.prototype, "rules", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.NUMBER) }),
    __metadata("design:type", Object)
], LibraryScene.prototype, "monitors", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.FLOAT }),
    __metadata("design:type", Number)
], LibraryScene.prototype, "size", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.FLOAT }),
    __metadata("design:type", Number)
], LibraryScene.prototype, "location", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.FLOAT }),
    __metadata("design:type", Number)
], LibraryScene.prototype, "opacity", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], LibraryScene.prototype, "mute", void 0);
__decorate([
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", Boolean)
], LibraryScene.prototype, "loop", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Library_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], LibraryScene.prototype, "libraryId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Library_1.default, 'libraryId'),
    __metadata("design:type", Library_1.default)
], LibraryScene.prototype, "library", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Scene_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], LibraryScene.prototype, "sceneId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Scene_1.default, 'sceneId'),
    __metadata("design:type", Scene_1.default)
], LibraryScene.prototype, "scene", void 0);
LibraryScene = __decorate([
    sequelize_typescript_1.Table({ timestamps: false })
], LibraryScene);
exports.default = LibraryScene;
