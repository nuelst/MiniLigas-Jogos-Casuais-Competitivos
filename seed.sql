-- ================================
-- SEED DATA PARA MINILIGAS
-- ================================
-- Limpar dados existentes (cuidado em produção!)
DELETE FROM game_sessions;

DELETE FROM users
WHERE
  email LIKE '%@miniligas.com'
  OR email LIKE '%@example.com';

DELETE FROM games;

-- ================================
-- INSERIR JOGOS
-- ================================
INSERT INTO
  games (id, name, description)
VALUES
  (
    'flip-bird',
    'Flip Bird',
    'Jogo estilo Flappy Bird - navegue o pássaro entre os obstáculos'
  ),
  (
    'jokenpo-game',
    'Jokenpo',
    'Clássico Pedra, Papel e Tesoura contra a IA'
  ),
  (
    'uno-game',
    'Uno Game',
    'Jogo de cartas Uno simplificado contra o computador'
  ),
  (
    'car-racing',
    'Car Racing',
    'Corrida infinita - desvie dos obstáculos e alcance a maior distância'
  );

-- ================================
-- INSERIR USUÁRIOS DE TESTE
-- ================================
-- Admin para testes
INSERT INTO
  users (id, email, username, name, role, avatar)
VALUES
  (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'admin@miniligas.com',
    'admin',
    'Administrador MiniLigas',
    'admin',
    '👑'
  );

-- Jogadores regulares
INSERT INTO
  users (id, email, username, name, role, avatar)
VALUES
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'joao.silva@example.com',
    'joaosilva',
    'João Silva',
    'player',
    '🎮'
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'maria.santos@example.com',
    'mariasantos',
    'Maria Santos',
    'player',
    '🌟'
  ),
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'pedro.costa@example.com',
    'pedrocosta',
    'Pedro Costa',
    'player',
    '🚀'
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'ana.oliveira@example.com',
    'anaoliveira',
    'Ana Oliveira',
    'player',
    '⭐'
  ),
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'carlos.pereira@example.com',
    'carlospereira',
    'Carlos Pereira',
    'player',
    '🏆'
  ),
  (
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'lucia.martins@example.com',
    'luciamartins',
    'Lúcia Martins',
    'player',
    '💎'
  ),
  (
    'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'rodrigo.fernandes@example.com',
    'rodrigofernandes',
    'Rodrigo Fernandes',
    'player',
    '🔥'
  ),
  (
    'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'sofia.almeida@example.com',
    'sofiaalmeida',
    'Sofia Almeida',
    'player',
    '💫'
  ),
  (
    'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'miguel.rodrigues@example.com',
    'miguelrodrigues',
    'Miguel Rodrigues',
    'player',
    '⚡'
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'beatriz.cunha@example.com',
    'beatrizcunha',
    'Beatriz Cunha',
    'player',
    '🌈'
  );

-- ================================
-- INSERIR PARTIDAS DE EXEMPLO
-- ================================
-- Flip Bird Scores (pontuação: número de obstáculos superados)
INSERT INTO
  game_sessions (user_id, game_id, score, duration)
VALUES
  -- João Silva - bom jogador
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    45,
    140
  ),
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    38,
    118
  ),
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    52,
    165
  ),
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    41,
    128
  ),
  -- Maria Santos - expert
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    67,
    210
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    72,
    225
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    58,
    185
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    63,
    195
  ),
  -- Pedro Costa - iniciante
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    12,
    38
  ),
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    18,
    55
  ),
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    25,
    78
  ),
  -- Ana Oliveira - intermediate
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    34,
    105
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    41,
    128
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    29,
    92
  );

-- ================================
-- Car Racing Scores (pontuação: distância percorrida)
-- ================================
INSERT INTO
  game_sessions (user_id, game_id, score, duration)
VALUES
  -- Carlos Pereira - speed demon
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    2580,
    210
  ),
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    3100,
    250
  ),
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    2890,
    235
  ),
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    3350,
    272
  ),
  -- Lúcia Martins
  (
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    1920,
    155
  ),
  (
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    2150,
    175
  ),
  (
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    1785,
    145
  ),
  -- Rodrigo Fernandes
  (
    'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    2750,
    220
  ),
  (
    'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    3020,
    245
  ),
  (
    'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    2450,
    198
  );

-- ================================
-- Jokenpo Scores (pontuação: vitórias consecutivas)
-- ================================
INSERT INTO
  game_sessions (user_id, game_id, score, duration)
VALUES
  -- Sofia Almeida - strategy queen
  (
    'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    15,
    47
  ),
  (
    'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    22,
    68
  ),
  (
    'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    18,
    55
  ),
  (
    'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    25,
    78
  ),
  -- Miguel Rodrigues
  (
    'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    12,
    38
  ),
  (
    'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    16,
    50
  ),
  (
    'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    9,
    29
  ),
  -- Beatriz Cunha
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    20,
    62
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    14,
    45
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    27,
    85
  );

-- ================================
-- Uno Game Scores (pontuação: partidas vencidas)
-- ================================
INSERT INTO
  game_sessions (user_id, game_id, score, duration)
VALUES
  -- João Silva (cross-game player)
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    8,
    480
  ),
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    12,
    720
  ),
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    6,
    360
  ),
  -- Maria Santos (multi-talented)
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    15,
    900
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    11,
    660
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    18,
    1080
  ),
  -- Ana Oliveira
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    9,
    540
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    13,
    780
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    7,
    420
  );

-- ================================
-- Partidas adicionais para criar mais dados no ranking
-- ================================
INSERT INTO
  game_sessions (user_id, game_id, score, duration)
VALUES
  -- Mais partidas de Flip Bird
  (
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    48,
    150
  ),
  (
    'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    55,
    172
  ),
  (
    'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    39,
    122
  ),
  (
    'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    44,
    138
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'flip-bird',
    31,
    98
  ),
  -- Mais partidas de Car Racing
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    2200,
    180
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    2950,
    240
  ),
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    1650,
    135
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'car-racing',
    2380,
    195
  ),
  -- Mais partidas de Jokenpo
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    11,
    35
  ),
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    19,
    58
  ),
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    13,
    41
  ),
  (
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'jokenpo-game',
    8,
    26
  ),
  -- Mais partidas de Uno
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    10,
    600
  ),
  (
    'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    14,
    840
  ),
  (
    'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    16,
    960
  ),
  (
    'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'uno-game',
    5,
    300
  );

-- ================================
-- VERIFICAR DADOS INSERIDOS
-- ================================
-- Mostrar estatísticas
SELECT
  'RESUMO DOS DADOS INSERIDOS:' as info;

SELECT
  'Games' as tabela,
  COUNT(*) as total_registros
FROM
  games
UNION ALL
SELECT
  'Users' as tabela,
  COUNT(*) as total_registros
FROM
  users
UNION ALL
SELECT
  'Game Sessions' as tabela,
  COUNT(*) as total_registros
FROM
  game_sessions;

-- Mostrar rankings por jogo
SELECT
  'RANKINGS POR JOGO:' as info;

SELECT
  g.name as jogo,
  u.name as jogador,
  r.best_score as melhor_score,
  r.games_played as partidas_jogadas,
  r.rank as posicao
FROM
  rankings r
  JOIN games g ON r.game_id = g.id
  JOIN users u ON r.user_id = u.id
ORDER BY
  g.name,
  r.rank
LIMIT
  20;

-- ================================
-- COMANDOS ÚTEIS PARA TESTES
-- ================================
/*
-- Para limpar todos os dados:
DELETE FROM game_sessions;
DELETE FROM users WHERE email LIKE '%@miniligas.com' OR email LIKE '%@example.com';
DELETE FROM games;

-- Para verificar rankings:
SELECT * FROM rankings ORDER BY game_id, rank;

-- Para ver estatísticas gerais:
SELECT 
COUNT(DISTINCT user_id) as total_players,
COUNT(*) as total_games_played,
AVG(score) as average_score
FROM game_sessions;

-- Para ver top 10 geral (soma de todos os best_scores):
SELECT 
u.name,
u.avatar,
SUM(r.best_score) as total_score,
SUM(r.games_played) as total_games,
COUNT(DISTINCT r.game_id) as different_games_played
FROM rankings r
JOIN users u ON r.user_id = u.id
GROUP BY u.id, u.name, u.avatar
ORDER BY total_score DESC
LIMIT 10;
*/