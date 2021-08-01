"use strict";
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
const LibraryScene_1 = __importDefault(require("./LibraryScene"));
let Scene = class Scene extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.BOOLEAN }),
    __metadata("design:type", String)
], Scene.prototype, "enabled", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.TEXT }),
    __metadata("design:type", String)
], Scene.prototype, "description", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Unique(true),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.TEXT }),
    __metadata("design:type", String)
], Scene.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.JSONB }),
    __metadata("design:type", Object)
], Scene.prototype, "extra", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(true),
    sequelize_typescript_1.Column({ type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.JSONB) }),
    __metadata("design:type", Array)
], Scene.prototype, "rules", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Library_1.default, () => LibraryScene_1.default, 'sceneId'),
    __metadata("design:type", Array)
], Scene.prototype, "items", void 0);
Scene = __decorate([
    sequelize_typescript_1.Table({ timestamps: true })
], Scene);
exports.default = Scene;
