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
exports.CreateBookDto = void 0;
const class_validator_1 = require("class-validator");
class CreateBookDto {
    titulo;
    precio;
    disponibilidad;
    autor;
    editorial;
    genero;
}
exports.CreateBookDto = CreateBookDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El titulo es obligatorio' }),
    __metadata("design:type", String)
], CreateBookDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El precio es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Precio no válido' }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "precio", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'LA disponibilidad es obligatoria' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Disponibilidad no válido' }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "disponibilidad", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El autor es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Autor no válido' }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "autor", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La editorial es obligatoria' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Editorial no válida' }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "editorial", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El genero es obligatorio' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Genero no válido' }),
    __metadata("design:type", Number)
], CreateBookDto.prototype, "genero", void 0);
//# sourceMappingURL=create-book.dto.js.map