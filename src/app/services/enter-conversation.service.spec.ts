import { TestBed } from '@angular/core/testing';

import { EnterConversationService } from './enter-conversation.service';

describe('EnterConversationService', () => {
  let service: EnterConversationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnterConversationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
