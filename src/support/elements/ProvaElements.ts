import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class ProvaElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoEmail(): Locator {
    return this.page.locator('input[id="replyto"]')
  }
  
 getAssunto(): Locator {
    return this.page.locator('input[id="topic"]')
  }

  getCampoNome(): Locator {
    return this.page.locator('input[id="nome-completo"]')
  }

  getCampoEndereco(): Locator {
    return this.page.locator('input[id="endereco"]')
  }

  getCampoBairro(): Locator {
    return this.page.locator('input[id="bairro"]')
  }

  getCampoCidade(): Locator {
    return this.page.locator('select[id="cidade"]');
  }

 getBotaoAceitar(): Locator {
  return this.page.locator('[name="form_submit"]');
}

getValidarMensagem(): Locator {
  return this.page.locator('text=Obrigado por sua entrada.');
}

getValidarMensagemErroCamposObrigatorios(): Locator {
  return this.page.locator('text=Por favor, corrija os erros indicados.');
}

getValidarMensagemErroEmail(): Locator {
  return this.page.locator('text=Seu endereço de e-mail é obrigatório, favor corrija.');
}

}