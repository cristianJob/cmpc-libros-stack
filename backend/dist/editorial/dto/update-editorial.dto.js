"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEditorialDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_editorial_dto_1 = require("./create-editorial.dto");
class UpdateEditorialDto extends (0, mapped_types_1.PartialType)(create_editorial_dto_1.CreateEditorialDto) {
}
exports.UpdateEditorialDto = UpdateEditorialDto;
//# sourceMappingURL=update-editorial.dto.js.map