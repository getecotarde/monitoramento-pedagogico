// api/login.js
// Autentica consultando a tabela "usuarios" no Supabase.
// A comparação bcrypt roda no servidor — senhas nunca chegam ao navegador.

import bcrypt from 'bcryptjs';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY; // service_role key (secreta)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ erro: 'Usuário e senha são obrigatórios' });
  }

  const usuarioNorm = usuario.trim().toLowerCase();

  // Busca o usuário no Supabase usando a service_role key
  const resp = await fetch(
    `${SUPABASE_URL}/rest/v1/usuarios?usuario=eq.${encodeURIComponent(usuarioNorm)}&ativo=eq.true&select=senha_hash,role&limit=1`,
    {
      headers: {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const rows = await resp.json();

  // Mesmo atraso para credenciais erradas ou usuário inexistente
  // (evita revelar se o usuário existe ou não)
  const delay = () => new Promise(r => setTimeout(r, 600));

  if (!Array.isArray(rows) || rows.length === 0) {
    await delay();
    return res.status(401).json({ erro: 'Usuário ou senha incorretos' });
  }

  const { senha_hash, role } = rows[0];

  const senhaCorreta = await bcrypt.compare(senha, senha_hash);

  if (!senhaCorreta || !role) {
    await delay();
    return res.status(401).json({ erro: 'Usuário ou senha incorretos' });
  }

  // Retorna apenas o role — nunca devolve senha ou hash
  return res.status(200).json({ role: role.trim() });
}
