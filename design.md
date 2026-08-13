# Design do ExpenseFlow

## Direção do produto

O ExpenseFlow será um aplicativo móvel corporativo para transformar recibos em despesas prontas para aprovação, com transparência sobre conformidade, orçamento e sincronização contábil. A experiência prioriza decisões rápidas em telas compactas, linguagem clara e feedback imediato.

A navegação será em **orientação retrato**, com alvos de toque confortáveis para uso com uma mão. O visual seguirá padrões de interface do iOS: hierarquia tipográfica forte, cartões com cantos moderados, barras de navegação limpas, sheets para ações rápidas, estados vazios explicativos e confirmação explícita para ações irreversíveis.

## Lista de telas

| Tela | Conteúdo principal | Função | Ação primária |
|---|---|---|---|
| Visão geral | Total do mês, pendências, alertas de política, orçamento por centro de custo e atividade recente | Dar visão operacional imediata | Registrar despesa |
| Minhas despesas | Lista filtrável por status, período, categoria e valor | Consultar e localizar despesas | Abrir uma despesa |
| Nova despesa | Formulário com valor, data, categoria, centro de custo, projeto, observação e recibo | Criar um lançamento manual ou a partir de recibo | Digitalizar recibo |
| Scanner de recibo | Área de captura, enquadramento e prévia do documento | Capturar ou escolher imagem do recibo | Usar recibo |
| Revisão do recibo | Campos extraídos, confiança do OCR, fornecedor, data, subtotal, impostos e total | Corrigir extrações antes de salvar | Confirmar dados |
| Detalhe da despesa | Dados completos, recibo, resultado de política, trilha de aprovação e histórico | Revisar, editar e acompanhar | Enviar para aprovação |
| Aprovações | Fila de despesas aguardando o usuário, agrupada por urgência | Aprovar, solicitar ajuste ou rejeitar | Revisar pendência |
| Orçamento | Progresso por departamento/categoria, comprometido versus realizado e alertas | Acompanhar consumo e limites | Ver detalhes do orçamento |
| Análises | Gráficos simples de gastos por categoria, fornecedor e período | Identificar tendência e desvios | Alterar período |
| Integrações | Status do conector contábil, última sincronização, fila de exportação e mapeamentos | Conferir integração com ERP/contabilidade | Sincronizar agora |
| Perfil e políticas | Perfil do usuário, papel, limites e resumo das políticas aplicáveis | Contextualizar permissões e regras | Consultar política |

## Fluxos principais

### Registrar e enviar uma despesa

1. O usuário toca em **Registrar despesa** na visão geral.
2. Escolhe **Digitalizar recibo** ou **Inserir manualmente**.
3. Ao digitalizar, o aplicativo apresenta uma prévia e preenche os campos reconhecidos.
4. O usuário confirma ou corrige fornecedor, data, categoria, centro de custo e total.
5. O ExpenseFlow executa a verificação de política e mostra estados como **Conforme**, **Revisar** ou **Fora da política**, com explicação curta.
6. O usuário salva a despesa e a envia para aprovação; o status passa a **Em aprovação**.

### Aprovar em vários níveis

1. O aprovador abre a aba **Aprovações**.
2. Seleciona uma despesa e revisa valor, recibo, política e orçamento disponível.
3. Pode aprovar o nível atual, solicitar ajuste com comentário ou rejeitar com justificativa.
4. Quando há segundo nível, a aprovação avança para o próximo aprovador; caso contrário, fica pronta para sincronização contábil.
5. Cada decisão aparece na trilha de aprovação com pessoa, data, nível e comentário.

### Sincronizar com a contabilidade

1. O usuário abre **Integrações** e visualiza o conector contábil em estado conectado/demonstração.
2. O aplicativo mostra quantas despesas estão prontas para exportação e quais têm erro de mapeamento.
3. Ao tocar em **Sincronizar agora**, as despesas demonstrativas são marcadas como exportadas e o horário da última sincronização é atualizado.
4. O histórico informa sucesso, itens enviados e eventuais falhas para correção.

## Identidade visual

| Elemento | Escolha |
|---|---|
| Cor primária | Azul petróleo `#0B5C66`, transmitindo controle e confiança |
| Acento de ação | Coral `#F26B5B`, reservado para registrar despesa e chamadas importantes |
| Fundo | Marfim suave `#F7F8F6` |
| Superfície | Branco `#FFFFFF` |
| Texto principal | Grafite `#172326` |
| Texto secundário | Cinza ardósia `#647277` |
| Sucesso | Verde `#2D8A68` |
| Atenção | Âmbar `#C88719` |
| Erro | Vermelho queimado `#C6534C` |
| Tipografia | Sistema nativo, com títulos semibold e números tabulares/fortes |
| Forma | Cards com raio 18, botões com raio 14, divisores discretos e sombras suaves |

O ícone do aplicativo será um recibo branco estilizado dentro de um escudo azul petróleo, com um pequeno ponto coral indicando validação. O símbolo deve preencher o quadrado inteiro, sem cantos arredondados desenhados no arquivo, para que o sistema aplique a máscara da plataforma.

## Estados e acessibilidade

Todos os fluxos terão estados de carregamento, vazio, sucesso e erro. A conformidade não dependerá apenas de cor: cada estado usará rótulo textual e ícone. Os controles terão rótulos acessíveis, contraste suficiente e feedback de toque discreto. Despesas acima do limite, sem recibo ou com categoria incompatível mostrarão a causa da revisão diretamente no contexto.
