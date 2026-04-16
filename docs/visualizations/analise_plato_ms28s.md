# Análise de Visualizações - Manutenção de Software (MS28S)

## Ferramenta utilizada

- Ferramenta: Plato (`v1.7.0`)
- Comando executado:

```bash
plato -r -d docs/visualizations/plato-report src/js/game/*.js
```

- Relatório gerado em: `docs/visualizations/plato-report/index.html`

## Visualização 1 - Maintainability (visão geral)

- Local: gráfico **Maintainability** em `docs/visualizations/plato-report/index.html`
- Objetivo: comparar a manutenibilidade relativa entre os módulos.
- Principais resultados observados:
  - Menor manutenibilidade: `src/js/game/collision.js` (MI = `50.127`)
  - Depois: `src/js/game/audio.js` (MI = `61.066`) e `src/js/game/states.js` (MI = `63.115`)
  - Média geral do projeto analisado: `70.40`

## Visualização 2 - Tamanho e complexidade por arquivo

- Locais:
  - Gráfico **Lines of code** em `docs/visualizations/plato-report/index.html`
  - Lista de arquivos por complexidade na seção **Files** do mesmo relatório
- Objetivo: identificar concentrações de lógica e pontos de maior risco de manutenção.
- Principais resultados observados:
  - Maior tamanho (SLOC): `src/js/game/entities.js` (SLOC = `256`)
  - Alta complexidade ciclomática agregada: `src/js/game/states.js` (CC = `28`)
  - Complexidade elevada em módulo pequeno: `src/js/game/collision.js` (CC = `11`, SLOC = `32`)

## Elementos com sintomas de mau design / má prática

Com base nas visualizações e nas métricas do Plato, os seguintes elementos apresentam sinais de atenção:

1. `FB.Collides` em `src/js/game/collision.js:2`
   - Sintoma: alta complexidade para um método curto.
   - Evidência: CC = `11` em apenas `23` linhas lógicas; arquivo com menor MI (`50.127`).
   - Risco: regra de colisão e pontuação acopladas no mesmo ponto, dificultando evolução e testes.

2. `Play.update` em `src/js/game/states.js:68`
   - Sintoma: método com muitas responsabilidades (progressão de cenário, leitura de input, atualização de entidades e detecção de colisão).
   - Evidência: CC = `10` no método; `states.js` com CC agregada `28` e SLOC `178`.
   - Risco: alterações de gameplay tendem a gerar regressão por acoplamento de regras.

3. `FB.init` em `src/js/game/core.js:38`
   - Sintoma: inicialização muito extensa e centralizadora.
   - Evidência: método com `92` linhas físicas (`37` lógicas), com configuração de canvas, gradientes, user-agent e binding de eventos.
   - Risco: baixa coesão e aumento de custo para manutenção preventiva/evolutiva.

## Observações adicionais

- O relatório aponta `71` ocorrências de JSHint no total, concentradas em:
  - `src/js/game/states.js` (`29`)
  - `src/js/game/entities.js` (`20`)
  - `src/js/game/core.js` (`16`)
  - `src/js/game/draw.js` (`6`)
- Esses dados reforçam os pontos acima para priorização de refatoração.
