import { Test, TestingModule } from '@nestjs/testing';
import { BoardPostService } from './board-post.service';

describe('PostService', () => {
  let service: BoardPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardPostService],
    }).compile();

    service = module.get<BoardPostService>(BoardPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
