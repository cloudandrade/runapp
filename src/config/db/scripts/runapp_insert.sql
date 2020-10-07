-- inserindo perfis
INSERT INTO
  perfil (id, tipo)
VALUES
  ('1', 'Administrador');

INSERT INTO
  perfil (id, tipo)
VALUES
  ('2', 'Padrão');

-- inserindo dificuldade
INSERT INTO
  dificuldade(id, description)
VALUES
  ('1', 'Iniciante');

INSERT INTO
  dificuldade(id, description)
VALUES
  ('2', 'Intermediário');

INSERT INTO
  dificuldade(id, description)
VALUES
  ('3', 'Avançado');

INSERT INTO
  dificuldade(id, description)
VALUES
  ('4', 'Profissional');

-- inserindo usuario admin
-- senha: adminrunapp
INSERT INTO
  usuario (
    id,
    perfil_id,
    nome,
    email,
    senha,
    level,
    dificuldade_id
  )
VALUES
  (
    1,
    1,
    'Administrador',
    'admin@runapp.com',
    '$2a$08$sCOnIxe5X.fbWtMWCGylW.zAyFGspND2BDZTqtJ9zoUeEb/DQIJCK',
    999,
    4
  );

-- inserindo desafios básicos
-- desafios iniciais iniciante
INSERT INTO
  desafios (
    id,
    level_max,
    nome,
    descricao,
    distancia,
    duracao,
    alternancia,
    is_complete,
    dificuldade_id
  )
VALUES
  (
    1,
    2,
    'Com o Pé Direito',
    'Pra começar com o pé direito porque não fazer uma corrida inicial hein? vamos lá?',
    2,
    '00:30:00',
    '6 min de caminhada e 1 min de corrida leve',
    0,
    1
  );

-- desafios iniciais intermediario
INSERT INTO
  desafios (
    id,
    level_max,
    nome,
    descricao,
    distancia,
    duracao,
    alternancia,
    is_complete,
    dificuldade_id
  )
VALUES
  (
    2,
    2,
    'Com o Pé Direito',
    'Pra começar com o pé direito porque não fazer uma corrida inicial hein? vamos lá?',
    3,
    '00:30:00',
    '5 min de caminhada e 2 min de corrida leve',
    0,
    2
  );

-- desafios iniciais avancado
INSERT INTO
  desafios (
    id,
    level_max,
    nome,
    descricao,
    distancia,
    duracao,
    alternancia,
    is_complete,
    dificuldade_id
  )
VALUES
  (
    3,
    2,
    'Com o Pé Direito',
    'Pra começar com o pé direito porque não fazer uma corrida inicial hein? vamos lá?',
    4,
    '00:30:00',
    '3 min de caminhada e 2 min de corrida leve',
    0,
    3
  );

-- desafios iniciais profissional
INSERT INTO
  desafios (
    id,
    level_max,
    nome,
    descricao,
    distancia,
    duracao,
    alternancia,
    is_complete,
    dificuldade_id
  )
VALUES
  (
    4,
    2,
    'Com o Pé Direito',
    'Pra começar com o pé direito porque não fazer uma corrida inicial hein? vamos lá?',
    6,
    '00:30:00',
    '3 min de caminhada e 2 min de corrida leve',
    0,
    4
  );