import { Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import BasePage from './BasePage';
import ProvaElements from '../elements/ProvaElements';

export default class ProvaPage extends BasePage {
  readonly provaElements: ProvaElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.provaElements = new ProvaElements(page);
  }

  async preencherCamposValidos(): Promise<void> {
    await this.provaElements.getCampoEmail().fill(faker.internet.email());
    await this.provaElements.getAssunto().fill(faker.lorem.words(3));
    await this.provaElements.getCampoNome().fill(faker.person.fullName());
    await this.provaElements.getCampoEndereco().fill(faker.address.streetAddress());
    await this.provaElements.getCampoBairro().fill(faker.address.street());
    await this.provaElements.getCampoCidade().selectOption('Arapongas - PR');
  }
  
  async preencherSomenteAlgunsCampos(): Promise<void> {
    await this.provaElements.getCampoNome().fill(faker.person.fullName());
    await this.provaElements.getCampoEndereco().fill(faker.address.streetAddress());
    await this.provaElements.getCampoBairro().fill(faker.address.street());
    await this.provaElements.getCampoCidade().selectOption('Arapongas - PR');
  }

  async preencherCampoDeEmailIncorretamente(): Promise<void> {
    await this.provaElements.getAssunto().fill(faker.lorem.words(3));
    await this.provaElements.getCampoNome().fill(faker.person.fullName());
    await this.provaElements.getCampoEndereco().fill(faker.address.streetAddress());
    await this.provaElements.getCampoBairro().fill(faker.address.street());
    await this.provaElements.getCampoCidade().selectOption('Arapongas - PR');
  }

  async enviarFormulario(): Promise<void> {
    await this.provaElements.getBotaoAceitar().click();
  }

  async validarMensagem(): Promise<void> {
    await expect(this.provaElements.getValidarMensagem()).toBeVisible();
  }

  async validarMensagemDeCampoObrigatorio(): Promise<void> {
    await expect(this.provaElements.getValidarMensagemErroCamposObrigatorios()).toBeVisible();
  }

  async validarMensagemCampoEmailIncorreto(): Promise<void> {
    await expect(this.provaElements.getValidarMensagemErroEmail()).toBeVisible();
  }
}