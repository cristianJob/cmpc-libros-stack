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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const autor_entity_1 = require("./entities/autor.entity");
const typeorm_2 = require("typeorm");
let AutorService = class AutorService {
    autorRepository;
    constructor(autorRepository) {
        this.autorRepository = autorRepository;
    }
    create(createAutorDto) {
        return this.autorRepository.save(createAutorDto);
    }
    findAll() {
        return this.autorRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} autor`;
    }
    update(id, updateAutorDto) {
        return `This action updates a #${id} autor`;
    }
    remove(id) {
        return `This action removes a #${id} autor`;
    }
};
exports.AutorService = AutorService;
exports.AutorService = AutorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(autor_entity_1.Autor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AutorService);
//# sourceMappingURL=autor.service.js.map