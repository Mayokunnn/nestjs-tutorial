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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async signIn(data) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (!user) {
                throw new common_1.NotFoundException('User does not exist');
            }
            const isCorrectPassword = await argon.verify(user.hash, data.password);
            if (!isCorrectPassword) {
                throw new common_1.ForbiddenException('Incorrect password');
            }
            delete user.hash;
            return { data: user };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error, "Something went wrong");
        }
    }
    async signUp(data) {
        try {
            const hashedPassword = await argon.hash(data.password);
            const user = await this.prisma.user.create({
                data: {
                    email: data.email,
                    hash: hashedPassword,
                    firstName: data?.firstName,
                    lastName: data?.lastName,
                },
            });
            delete user.hash;
            return { data: user };
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_1.ForbiddenException('Email already exists');
                }
            }
            throw new common_1.InternalServerErrorException("Something went wrong");
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map