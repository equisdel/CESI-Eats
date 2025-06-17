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
exports.DeliveryGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const delivery_service_1 = require("../delivery.service");
let DeliveryGateway = class DeliveryGateway {
    constructor(deliveryService) {
        this.deliveryService = deliveryService;
    }
    async handleTrackDelivery(client, data) {
        const delivery = await this.deliveryService.findOne(data.deliveryId);
        if (delivery) {
            client.join(data.deliveryId);
            client.emit('deliveryUpdate', delivery);
        }
    }
    handleStopTracking(client, data) {
        client.leave(data.deliveryId);
    }
    notifyDeliveryUpdate(delivery) {
        this.server.to(delivery.id.toString()).emit('deliveryUpdate', delivery);
    }
};
exports.DeliveryGateway = DeliveryGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], DeliveryGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('trackDelivery'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], DeliveryGateway.prototype, "handleTrackDelivery", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('stopTracking'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], DeliveryGateway.prototype, "handleStopTracking", null);
exports.DeliveryGateway = DeliveryGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } }),
    __metadata("design:paramtypes", [delivery_service_1.DeliveryService])
], DeliveryGateway);
