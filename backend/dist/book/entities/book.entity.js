"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const autor_entity_1 = require("../../autor/entities/autor.entity");
const editorial_entity_1 = require("../../editorial/entities/editorial.entity");
const genero_entity_1 = require("../../genero/entities/genero.entity");
const typeorm_1 = require("typeorm");
let Book = class Book {
    id;
    titulo;
    precio;
    disponibilidad;
    generoId;
    autorId;
    editorialId;
    autor;
    editorial;
    genero;
};
exports.Book = Book;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar'),
    __metadata("design:type", String)
], Book.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Book.prototype, "precio", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Book.prototype, "disponibilidad", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Book.prototype, "generoId", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Book.prototype, "autorId", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], Book.prototype, "editorialId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => autor_entity_1.Autor, { eager: true }),
    __metadata("design:type", autor_entity_1.Autor)
], Book.prototype, "autor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => editorial_entity_1.Editorial, { eager: true }),
    __metadata("design:type", editorial_entity_1.Editorial)
], Book.prototype, "editorial", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => genero_entity_1.Genero, { eager: true }),
    __metadata("design:type", genero_entity_1.Genero)
], Book.prototype, "genero", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)()
], Book);
//# sourceMappingURL=book.entity.js.map