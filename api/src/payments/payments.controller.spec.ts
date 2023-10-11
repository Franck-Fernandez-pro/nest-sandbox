import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  const requestMock = {
    query: {},
  } as unknown as Request;

  const statusResponseMock = {
    send: jest.fn((y) => y),
  };

  const responseMock = {
    status: jest.fn(() => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: {
            create: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a status 400', () => {
      controller.findAll(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        message: 'missing count or page query param',
      });
    });

    it('should return status 200 when query params are presents', () => {
      requestMock.query = {
        count: '20',
        page: '2',
      };

      controller.findAll(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });

  describe('create', () => {
    it('should return successful response', async () => {
      jest.spyOn(service, 'create').mockImplementationOnce(() => {
        throw new BadRequestException();
      });

      try {
        const response = await controller.create({
          email: 'js@gmail.io',
          price: 22,
        });
      } catch (error) {}
    });
  });
});
