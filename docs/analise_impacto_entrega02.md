# Análise de Impacto - Entrega 02

Projeto de manutenção: CrappyBird
Repositório submetido: `https://github.com/pedrol2b/CrappyBird`

Este documento apresenta, para 3 solicitações de mudança da Entrega 01 (`docs/solicitacoes_mudanca.md`), os conjuntos:

- CII: Conjunto Inicial de Impacto
- CCI: Conjunto Candidato de Impacto

Observação: CRI e CID serão preenchidos ao final do projeto, após as implementações.

---

## 1) Correção de inconsistências de colisão (falsos positivos/negativos)

### CII (Conjunto Inicial de Impacto)

- Módulo: `src/js/game/collision.js`
  - Elemento: `FB.Collides`
- Módulo: `src/js/game/states.js`
  - Elemento: `FB.States.Play.update` (ponto em que a colisão é avaliada)
- Módulo: `src/js/game/entities.js`
  - Elementos: `FB.Entities.Bird` e `FB.Entities.Pipe` (dados usados no cálculo de hitbox)

### CCI (Conjunto Candidato de Impacto)

- Módulo: `src/js/game/core.js`
  - Elementos: `FB.update`, `FB.render` (impacto indireto por ordem de atualização)
- Módulo: `src/js/game/states.js`
  - Elemento: `FB.States.GameOver` (mudanças de critério podem alterar quando ocorre game over)
- Módulo: `src/js/game/draw.js`
  - Elemento: `FB.Draw` (caso seja necessário visualizar hitbox para calibração)

---

## 2) Implementar pausa e retorno da partida (tecla + botão na tela)

### CII (Conjunto Inicial de Impacto)

- Módulo: `src/js/game/states.js`
  - Elementos: `FB.States.Play.update`, `FB.States.Play.render`
  - Ação esperada: controle de estado pausado e botão de pausa/retorno no HUD
- Módulo: `src/js/game/core.js`
  - Elementos: `FB.update`, `FB.loop`, `FB.changeState`
  - Ação esperada: orquestração do estado pausado
- Módulo: `src/js/game/input.js`
  - Elemento: `FB.Input.set`
  - Ação esperada: integração do clique/toque com o botão de pausa

### CCI (Conjunto Candidato de Impacto)

- Arquivo: `index.html`
  - Elemento: registro de eventos de teclado (atalho para pausar/retomar)
- Módulo: `src/js/game/audio.js`
  - Elemento: `FB.Audio.play` (regras para áudio durante pausa, se aplicável)
- Módulo: `src/js/game/states.js`
  - Elemento candidato: novo estado `FB.States.Pause` (caso a estratégia escolhida seja state dedicado)

---

## 3) Salvar e exibir recorde local persistente

### CII (Conjunto Inicial de Impacto)

- Módulo: `src/js/game/storage.js`
  - Elementos: `FB.Storage.getCookie`, `FB.Storage.setCookie`
  - Ação esperada: substituir/estender persistência para `localStorage`
- Módulo: `src/js/game/states.js`
  - Elementos: `FB.States.GameOver.getHighScore`, `FB.States.GameOver.init`, `FB.States.GameOver.render`
  - Ação esperada: leitura/escrita e exibição de recorde persistido

### CCI (Conjunto Candidato de Impacto)

- Módulo: `src/js/game/states.js`
  - Elemento: `FB.States.Splash.init` (exibir recorde na tela inicial, se o escopo evoluir)
- Módulo: `src/js/game/core.js`
  - Elementos: `FB.score`, `FB.digits` (ajustes de fluxo de pontuação, se necessário)
- Documentação: `docs/solicitacoes_mudanca.md`
  - Ação esperada: atualizar avaliação/esforço conforme refinamento técnico

---

## Resumo

As 3 solicitações acima já possuem CII e CCI definidos para orientar implementação incremental e rastreabilidade de impacto. Os conjuntos CRI e CID serão preenchidos ao final, comparando estimativa x alterações reais no código.
