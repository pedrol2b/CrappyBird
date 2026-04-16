# Análise de Fatores COCOMO II para Estimativa de Esforço de Manutenção

## Contexto

Projeto analisado: **CrappyBird** (fork acadêmico para disciplina de Manutenção de Software - MS28S).
Objetivo desta entrega: selecionar fatores relevantes do COCOMO II e classificar o nível de cada fator (muito baixo a muito alto), com justificativa baseada na situação atual do projeto.

> Observação: conforme orientação da atividade, não foi realizado o cálculo numérico de esforço pelas fórmulas do modelo; apenas a análise qualitativa dos fatores.

## Fatores selecionados

### 1) ACAP - Capacidade dos Analistas

- **Nível:** Médio
- **Justificativa:** o projeto já foi estudado e modularizado, mas ainda há regras legadas com acoplamento relevante (colisão, estados de jogo e fluxo de pontuação). Isso exige análise cuidadosa para evitar regressão durante a manutenção.

### 2) PCAP - Capacidade dos Programadores

- **Nível:** Médio-Alto
- **Justificativa:** há evidências de boa capacidade de implementação (reorganização arquitetural, separação em módulos, melhoria de scripts e documentação). Mesmo assim, como a manutenção em código existente tende a gerar efeitos colaterais, o nível foi mantido abaixo de muito alto.

### 3) AEXP - Experiência na Aplicação (domínio)

- **Nível:** Médio
- **Justificativa:** o domínio de jogo 2D é conhecido, porém pontos de jogabilidade são sensíveis a pequenas mudanças (detecção de colisão, equilíbrio de dificuldade e comportamento de estados), exigindo validação prática frequente.

### 4) LTEX - Experiência com Linguagem e Ferramentas

- **Nível:** Alto
- **Justificativa:** o projeto utiliza HTML, CSS e JavaScript, além de ferramentas já dominadas no fluxo atual (Git, Plato e deploy na Vercel). A curva de aprendizado técnica para evolução do sistema é baixa.

### 5) CPLX - Complexidade do Produto

- **Nível:** Médio-Alto
- **Justificativa:** embora o tamanho do sistema seja reduzido, há concentração de lógica em pontos críticos (principalmente estados e colisão), com risco de regressão funcional. As métricas de análise estática também apontam maior complexidade em módulos centrais.

### 6) TOOL - Uso de Ferramentas de Suporte

- **Nível:** Médio
- **Justificativa:** existem ferramentas de apoio para análise e organização, mas ainda há espaço para ampliar a automação de qualidade (ex.: lint padronizado e checks contínuos no fluxo de contribuição).

### 7) SCED - Restrição de Cronograma

- **Nível:** Baixo
- **Justificativa:** o projeto segue uma janela de tempo definida pela disciplina (5 semanas para implementações prioritárias), com carga horária limitada. Isso reduz a folga de cronograma e exige priorização rigorosa das solicitações.

## Conclusão

Pelos fatores escolhidos, o esforço de manutenção deste projeto tende a ser **moderado**, com maior atenção em:

- componentes com lógica central (estados e colisão),
- controle de regressão funcional no gameplay,
- disciplina de priorização para cumprir o prazo acadêmico.

Como encaminhamento prático, recomenda-se manter as implementações em ciclos curtos, com validações frequentes e rastreabilidade entre solicitações de mudança e arquivos impactados.
