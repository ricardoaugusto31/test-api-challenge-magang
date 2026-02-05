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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
let CommentsService = class CommentsService {
    commentsRepository;
    constructor(commentsRepository) {
        this.commentsRepository = commentsRepository;
    }
    async findByPost(postId) {
        return this.commentsRepository.find({
            where: { postId },
            relations: ['author'],
            order: { createdAt: 'DESC' },
        });
    }
    async create(postId, dto, authorId) {
        const comment = this.commentsRepository.create({ ...dto, postId, authorId });
        return this.commentsRepository.save(comment);
    }
    async update(id, dto, userId) {
        const comment = await this.commentsRepository.findOne({ where: { id } });
        if (!comment) {
            throw new common_1.NotFoundException('Comment tidak ditemukan');
        }
        if (comment.authorId !== userId) {
            throw new common_1.ForbiddenException('Anda tidak bisa mengubah comment orang lain');
        }
        Object.assign(comment, dto);
        return this.commentsRepository.save(comment);
    }
    async remove(id, userId) {
        const comment = await this.commentsRepository.findOne({ where: { id } });
        if (!comment) {
            throw new common_1.NotFoundException('Comment tidak ditemukan');
        }
        if (comment.authorId !== userId) {
            throw new common_1.ForbiddenException('Anda tidak bisa menghapus comment orang lain');
        }
        await this.commentsRepository.remove(comment);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map