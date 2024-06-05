import { TestBed } from '@angular/core/testing';

import { CadastroServiceService } from './cadastro-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('CadastroServiceService', () => {
  let service: CadastroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [HttpClientTestingModule],});
    service = TestBed.inject(CadastroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
