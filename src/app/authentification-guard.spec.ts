import { TestBed } from '@angular/core/testing';

import { AuthentificationGuardService } from './authentification-guard.service';

describe('AuthentificationGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthentificationGuardService = TestBed.get(AuthentificationGuardService);
    expect(service).toBeTruthy();
  });
});
