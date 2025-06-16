"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAutorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_autor_dto_1 = require("./create-autor.dto");
class UpdateAutorDto extends (0, mapped_types_1.PartialType)(create_autor_dto_1.CreateAutorDto) {
}
exports.UpdateAutorDto = UpdateAutorDto;
//# sourceMappingURL=update-autor.dto.js.map