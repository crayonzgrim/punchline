import { Test, TestingModule } from '@nestjs/testing';
import { BoardPostController } from './board-post.controller';

describe('PostController', () => {
  let controller: BoardPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardPostController],
    }).compile();

    controller = module.get<BoardPostController>(BoardPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
