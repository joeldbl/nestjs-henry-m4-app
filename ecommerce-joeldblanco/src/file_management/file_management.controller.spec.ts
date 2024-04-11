import { Test, TestingModule } from '@nestjs/testing';
import { FileManagementController } from './file_management.controller';
import { FileManagementService } from './file_management.service';

describe('FileManagementController', () => {
  let controller: FileManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileManagementController],
      providers: [FileManagementService],
    }).compile();

    controller = module.get<FileManagementController>(FileManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
