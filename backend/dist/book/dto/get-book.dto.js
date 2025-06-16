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
exports.GetBookQueryDto = void 0;
const class_validator_1 = require("class-validator");
class GetBookQueryDto {
    take;
    skip;
    autor;
    genero;
    editorial;
}
exports.GetBookQueryDto = GetBookQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)({}, { message: 'Take debe ser un numero' }),
    __metadata("design:type", Number)
], GetBookQueryDto.prototype, "take", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)({}, { message: 'Skip debe ser un numero' }),
    __metadata("design:type", Number)
], GetBookQueryDto.prototype, "skip", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)({}, { message: 'Autor debe ser un numero' }),
    __metadata("design:type", Number)
], GetBookQueryDto.prototype, "autor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)({}, { message: 'Genero debe ser un numero' }),
    __metadata("design:type", Number)
], GetBookQueryDto.prototype, "genero", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumberString)({}, { message: 'Editorial debe ser un numero' }),
    __metadata("design:type", Number)
], GetBookQueryDto.prototype, "editorial", void 0);
//# sourceMappingURL=get-book.dto.js.map