// api/login.js
// Sem dependências externas — usa apenas crypto (nativo do Node) e fetch.
// As senhas são comparadas via SHA-256 no servidor; nunca chegam ao navegador.

import crypto from 'crypto';

const SUPABASE_URL        = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ erro: 'Usuário e senha são obrigatórios' });
  }

  const usuarioNorm = usuario.trim().toLowerCase();
  const senhaHash   = sha256(senha);

  // Busca o usuário no Supabase usando a service_role key
  const resp = await fetch(
    `${SUPABASE_URL}/rest/v1/usuarios?usuario=eq.${encodeURIComponent(usuarioNorm)}&ativo=eq.true&select=senha_hash,role&limit=1`,
    {
      headers: {
        'apikey':        SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type':  'application/json',
      },
    }
  );

  const rows = await resp.json();

  const delay = () => new Promise(r => setTimeout(r, 600));

  if (!Array.isArray(rows) || rows.length === 0) {
    await delay();
    return res.status(401).json({ erro: 'Usuário ou senha incorretos' });
  }

  const { senha_hash, role } = rows[0];

  if (senhaHash !== senha_hash || !role) {
    await delay();
    return res.status(401).json({ erro: 'Usuário ou senha incorretos' });
  }

  return res.status(200).json({ role: role.trim() });
}
