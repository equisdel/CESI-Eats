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
exports.DeliveryController = void 0;
const common_1 = require("@nestjs/common");
const delivery_service_1 = require("./delivery.service");
const delivery_dto_1 = require("./dto/delivery.dto");
const delivery_gateway_1 = require("./gateway/delivery.gateway");
let DeliveryController = class DeliveryController {
    constructor(deliveryService, deliveryGateway) {
        this.deliveryService = deliveryService;
        this.deliveryGateway = deliveryGateway;
    }
    async create(deliveryDto) {
        const delivery = await this.deliveryService.create(deliveryDto);
        this.deliveryGateway.notifyDeliveryUpdate(delivery);
        return delivery;
    }
    async findAll() {
        return this.deliveryService.findAll();
    }
    async findOne(id) {
        return this.deliveryService.findOne(id);
    }
    async update(id, status) {
        const delivery = await this.deliveryService.update(id, status);
        this.deliveryGateway.notifyDeliveryUpdate(delivery);
        return delivery;
    }
    async assignDeliveryPerson(id, deliveryPersonId) {
        const delivery = await this.deliveryService.assignDeliveryPerson(id, deliveryPersonId);
        this.deliveryGateway.notifyDeliveryUpdate(delivery);
        return delivery;
    }
};
exports.DeliveryController = DeliveryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delivery_dto_1.DeliveryDto]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(':id/assign'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('deliveryPersonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "assignDeliveryPerson", null);
exports.DeliveryController = DeliveryController = __decorate([
    (0, common_1.Controller)('delivery'),
    __metadata("design:paramtypes", [delivery_service_1.DeliveryService,
        delivery_gateway_1.DeliveryGateway])
], DeliveryController);
