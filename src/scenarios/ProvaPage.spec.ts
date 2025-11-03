import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import ProvaPage from '../support/pages/ProvaPage';
import { ai } from '@zerostep/playwright';

test.describe('Testes sobre formulario para prova', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let provaPage: ProvaPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.prova')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    provaPage = new ProvaPage(page);
    await page.goto(BASE_URL);
  });

  test('Validar funcionalidade formulário de testes', async () => {
    await provaPage.preencherCamposValidos();

    await provaPage.enviarFormulario();

    await provaPage.validarMensagem();
  });


  test('Testar validadores de campo obrigatorio', async () => {
    await provaPage.preencherSomenteAlgunsCampos();
    await provaPage.enviarFormulario();
    await provaPage.validarMensagemDeCampoObrigatorio();
  });


  test('Testar validadores de erro email', async ({ page }) => {
    await page.goto(BASE_URL);
  
    const aiArgs = { page, test };
    await ai('Preencha todos os campos do formulário exibido na tela, exceto o campo com seletor input[id="replyto"].Depois de enviar o formulário, verifique se aparece a seguinte mensagem de erro na tela:<div class="fieldErrorBox">Seu endereço de e-mail é obrigatório, favor corrija.</div>Confirme que essa mensagem está visível e contém exatamente o texto:"Seu endereço de e-mail é obrigatório, favor corrija.")', aiArgs);
  });

});