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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const jsonwebtoken_1 = require("jsonwebtoken");
let UserService = class UserService {
    userRepository;
    configService;
    constructor(userRepository, configService) {
        this.userRepository = userRepository;
        this.configService = configService;
    }
    create(createUserDto) {
        return this.userRepository.save(createUserDto);
    }
    findAll() {
        return this.userRepository.find();
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
    generateJWT = (payload) => {
        const token = (0, jsonwebtoken_1.sign)(payload, this.configService.get('JWT_SECRET'), {
            expiresIn: '180d',
        });
        return token;
    };
    async login(createUserDto) {
        const { password, username } = createUserDto;
        const user = await this.userRepository.findOne({
            where: {
                username,
                password,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('Credenciales invalidas');
        const token = this.generateJWT({ id: user.id });
        return { token };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map