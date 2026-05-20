// api/login.js
// Esta função roda no servidor do Vercel — as senhas NUNCA chegam ao navegador.

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ erro: 'Usuário e senha são obrigatórios' });
  }

  // ── Mapa: login digitado na tela → Key da variável no Vercel ─────────────
  // Se quiser adicionar novos usuários, inclua aqui e crie a variável no Vercel.
  const MAPA_USUARIOS = {
    'everton.correa': 'USER_COORDPED',
    'coord.turno':    'USER_COORDTURNO',
    'pip':            'USER_PIP',
    'aee':            'USER_AEE',
  };

  const usuarioNorm = usuario.trim().toLowerCase();
  const chaveEnv    = MAPA_USUARIOS[usuarioNorm];

  if (!chaveEnv) {
    // Usuário não existe — mesmo atraso para não revelar isso
    return setTimeout(() => {
      res.status(401).json({ erro: 'Usuário ou senha incorretos' });
    }, 600);
  }

  const valorEnv = process.env[chaveEnv] || '';
  const [senhaEnv, role] = valorEnv.split('|');

  if (!senhaEnv || senhaEnv !== senha || !role) {
    return setTimeout(() => {
      res.status(401).json({ erro: 'Usuário ou senha incorretos' });
    }, 600);
  }

  // Retorna apenas o role — nunca devolve a senha
  return res.status(200).json({ role: role.trim() });
}
