"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModule = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const book_controller_1 = require("./book.controller");
const book_entity_1 = require("./entities/book.entity");
const typeorm_1 = require("@nestjs/typeorm");
const genero_entity_1 = require("../genero/entities/genero.entity");
const editorial_entity_1 = require("../editorial/entities/editorial.entity");
const autor_entity_1 = require("../autor/entities/autor.entity");
const auth_module_1 = require("../auth/auth.module");
let BookModule = class BookModule {
};
exports.BookModule = BookModule;
exports.BookModule = BookModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([book_entity_1.Book, genero_entity_1.Genero, editorial_entity_1.Editorial, autor_entity_1.Autor]),
            auth_module_1.AuthModule,
        ],
        controllers: [book_controller_1.BookController],
        providers: [book_service_1.BookService],
    })
], BookModule);
//# sourceMappingURL=book.module.js.map