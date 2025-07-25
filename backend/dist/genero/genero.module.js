"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneroModule = void 0;
const common_1 = require("@nestjs/common");
const genero_service_1 = require("./genero.service");
const genero_controller_1 = require("./genero.controller");
const genero_entity_1 = require("./entities/genero.entity");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
let GeneroModule = class GeneroModule {
};
exports.GeneroModule = GeneroModule;
exports.GeneroModule = GeneroModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([genero_entity_1.Genero]), auth_module_1.AuthModule],
        controllers: [genero_controller_1.GeneroController],
        providers: [genero_service_1.GeneroService],
    })
], GeneroModule);
//# sourceMappingURL=genero.module.js.map