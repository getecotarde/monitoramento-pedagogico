// api/login.js
// Esta função roda no servidor do Vercel — as senhas NUNCA chegam ao navegador.

export default function handler(req, res) {
  // Só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ erro: 'Usuário e senha são obrigatórios' });
  }

  // ── Lê as credenciais das variáveis de ambiente do Vercel ──────────────
  // Cada variável segue o padrão:  USER_<NOME>=senha|role
  // Exemplo:  USER_COORDPED=minhasenha|coord-ped
  //
  // As variáveis são configuradas no painel do Vercel (Settings → Environment Variables)
  // e NUNCA ficam visíveis no código ou no navegador.

  const usuarioNorm = usuario.trim().toLowerCase();
  let roleEncontrado = null;

  for (const [chave, valor] of Object.entries(process.env)) {
    if (!chave.startsWith('USER_')) continue;

    const [senhaEnv, role] = (valor || '').split('|');
    const nomeUsuario = chave.replace('USER_', '').toLowerCase().replace(/_/g, '.');

    if (nomeUsuario === usuarioNorm && senhaEnv === senha) {
      roleEncontrado = role;
      break;
    }
  }

  if (!roleEncontrado) {
    // Pequeno atraso para dificultar ataques de força bruta
    return setTimeout(() => {
      res.status(401).json({ erro: 'Usuário ou senha incorretos' });
    }, 600);
  }

  // Retorna apenas o role — nunca devolve a senha
  return res.status(200).json({ role: roleEncontrado });
}
