# 🎮 Desafio Técnico Frontend – MiniLigas: Jogos Casuais Competitivos

## 🎯 Objetivo

Crie uma plataforma de jogos casuais curtos e interativos onde jogadores possam competir por pontuações em tempo real, visualizar rankings e interagir com uma interface divertida e intuitiva. A aplicação deve ser construída com **React.js (Next.js, Vite ou Gatsby)** e oferecer uma experiência fluida e responsiva.

---

## 🧱 O que deve ser construído

### 1. 🎯 Landing Page
- Nome do projeto e apresentação simples.
- Lista de jogos disponíveis com botão “Jogar”.
- Destaques da semana (jogadores com melhor desempenho).
- Ranking geral e por jogo.

---

### 2. 🕹️ Mínimo 1 jogo interativo entre os abaixo:

#### 🚗 Car Racing
- O jogador controla um carro que deve desviar de obstáculos em uma pista infinita.
- Utiliza setas do teclado (ou swipe no mobile) para mover lateralmente.
- A pontuação é baseada na distância percorrida antes de colidir.

🔗 [Design no Figma](https://www.figma.com/design/QSm6Y09UuibyOerIZVWoUt/Car-Racing-%7C-Interactive-Components--Community---Copy-?node-id=11-531&t=VmSFuNESMoq45ccb-1)

---

#### 🐦 Flip Bird (Clássico estilo Flappy Bird)
- Jogador clica ou toca para manter o personagem no ar, desviando de obstáculos verticais.
- O jogo termina ao colidir com um obstáculo.
- Pontuação baseada na quantidade de obstáculos superados.

🔗 [Design no Figma](https://www.figma.com/design/s3GpGlc0p0CXcoDWASwZ4j/Flappy-Bird-%7C-Interactive-Components?node-id=0-1&t=JfOJgVADHOReiI2w-1)

---

#### 🃏 Uno Game (modo simples)
- Jogo de cartas em que o jogador enfrenta o computador.
- Jogabilidade básica: descartar cartas que combinem por cor ou número.
- Ganha quem terminar as cartas primeiro.

🔗 [Design no Figma](https://www.figma.com/design/Jdx06BmO89eWnpbSm8XGMS/Uno-Game---Design?node-id=1-2&t=iOHicwKkAO6Vaqj9-1)

---

#### ✊🖐✌ Pedra, Papel, Tesoura
- Jogador escolhe entre pedra, papel ou tesoura.
- Partida rápida contra o computador ou outro jogador.
- Sistema de pontuação por vitória.

🔗 [Design no Figma](https://www.figma.com/design/stpol6ZAEQ2rwIVLT93VVK/Rock---Paper---Scissor?node-id=7-3&t=VbfIPiFKH7VLXKpK-1)

---

### 3. 🧑‍💼 Dashboard Administrativa (Simples)
- Lista de jogadores com pontuação.
- Número total de partidas jogadas por jogo.
- Rankings por jogo.
- Tela acessível apenas por usuários com permissão de “admin”.

---

### 4. 🔐 Permissões e Controle de Acesso
- Dois tipos de usuários:
  - **Jogador padrão**: pode jogar e ver rankings
  - **Administrador**: pode acessar a dashboard e ver métricas
- Implementar controle de rotas protegidas com base em permissões

---

### 5. 💤 Inatividade & Dino Game
- Se o utilizador ficar **mais de 2 minutos inativo**, mostrar um **modal com o Dino Game** como forma de entretenimento enquanto está ausente.
- O jogo pode ser encerrado ao clicar em "Voltar para a aplicação".

🔗 [Design do Dino Game](https://www.figma.com/design/fRlMTzFfW4M7P8gETf08hf/Chrome-Dino---Variables---Community-?node-id=0-1&t=ku6LwUhaJHCxjsiu-1)

---

## ✅ Avaliação

| Critério            | O que será avaliado                                                                 |
|---------------------|--------------------------------------------------------------------------------------|
| UI/UX               | Fidelidade visual, responsividade e experiência intuitiva                            |
| Interação           | Uso de eventos, animações, controles acessíveis e fluidez nos jogos                 |
| Organização         | Estrutura modular de componentes, boas práticas de React                            |
| Criatividade        | Melhorias além do solicitado, efeitos visuais, som, modo escuro                      |
| Dashboard           | Funcionalidade básica de administração e controle por permissões                    |
| Inatividade         | Detecção e ação apropriada (exibir Dino Game)                                        |
| Documentação        | README com instruções claras e arquitetura explicada                                 |

---

## 🛠 Tecnologias

### Obrigatórias
- React.js (Next.js, Vite ou Gatsby)
- Tailwind CSS (ou outro framework moderno de UI)

### Recomendadas
- Backend opcional com:
  - Node.js + Express/NestJS
  - Firebase Authentication, Realtime ou Firestore (opcional)
  - Qualquer outro backend que permita ranking ou persistência

---

## 📦 Entrega

- Repositório público (GitHub ou GitLab)
- README com:
  - Descrição do projeto
  - Tecnologias utilizadas
  - Instruções de instalação e execução
  - Link para o design base
- Link de deploy (opcional, mas recomendado)

---

## 💬 Observação final

> Este projeto não é apenas um teste. É também um campo de criação livre. Demonstre sua personalidade através do código, do design, da forma como pensa o produto. Se quiser transformar esta plataforma num MVP de startup, você já tem um excelente ponto de partida.
