var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DbService_1;
import { Injectable, Logger, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
let DbService = DbService_1 = class DbService {
    logger = new Logger(DbService_1.name);
    pool;
    constructor(config) {
        this.pool = new Pool({
            connectionString: config.getOrThrow('DATABASE_URL'),
        });
    }
    async onModuleInit() {
        await this.pool.query('SELECT 1');
        this.logger.log('Connected to Postgres');
    }
    async onModuleDestroy() {
        await this.pool.end();
    }
};
DbService = DbService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], DbService);
export { DbService };
//# sourceMappingURL=db.service.js.map