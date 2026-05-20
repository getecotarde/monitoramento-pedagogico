# Monitoramento Pedagógico — Guia de Publicação no Vercel

Este guia explica, passo a passo, como colocar o sistema online com login seguro.

---

## O que você vai precisar

- Conta no **GitHub** (já tem ✓)
- Conta gratuita no **Vercel** (vamos criar)
- Os arquivos desta pasta

---

## PASSO 1 — Criar o repositório no GitHub

1. Acesse **github.com** e faça login
2. Clique no botão verde **"New"** (canto superior esquerdo)
3. Em **"Repository name"**, digite: `monitoramento-pedagogico`
4. Deixe marcado **"Private"** (repositório privado — mais seguro)
5. Clique em **"Create repository"**
6. Na página seguinte, clique em **"uploading an existing file"**
7. Arraste **todos os arquivos e pastas** desta pasta para a área de upload:
   - pasta `api/`  → arquivo `api/login.js`
   - pasta `public/` → arquivo `public/index.html`
   - arquivo `vercel.json`
8. Clique em **"Commit changes"**

---

## PASSO 2 — Criar conta gratuita no Vercel

1. Acesse **vercel.com**
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel a acessar seu GitHub
5. Na pergunta sobre tipo de conta, escolha **"Hobby"** (gratuita)

---

## PASSO 3 — Publicar o projeto no Vercel

1. No painel do Vercel, clique em **"Add New Project"**
2. Encontre o repositório `monitoramento-pedagogico` e clique em **"Import"**
3. Não mude nada nas configurações — clique direto em **"Deploy"**
4. Aguarde cerca de 1 minuto
5. Quando aparecer "Congratulations!", seu site está no ar!
6. Clique em **"Continue to Dashboard"**

---

## PASSO 4 — Cadastrar os usuários e senhas (a parte mais importante!)

As senhas ficam guardadas aqui, no painel do Vercel — nunca no código.

1. No painel do seu projeto, clique em **"Settings"** (menu superior)
2. No menu lateral esquerdo, clique em **"Environment Variables"**
3. Para cada usuário do sistema, adicione uma variável:

### Como preencher cada variável:

| Campo | O que digitar |
|-------|--------------|
| **Name** | `USER_` + nome do usuário (sem espaços, sem acento) |
| **Value** | `a senha escolhida\|o perfil` |

### Exemplos prontos para copiar:

**Coordenador Pedagógico:**
- Name: `USER_COORDPED`
- Value: `SuaSenhaAqui|coord-ped`

**Coordenação de Turno:**
- Name: `USER_COORDTURNO`
- Value: `SuaSenhaAqui|coord-turno`

**PIP (Prof. João):**
- Name: `USER_PIP`
- Value: `SuaSenhaAqui|pip`

**AEE:**
- Name: `USER_AEE`
- Value: `SuaSenhaAqui|aee`

> ⚠️ **Atenção:** o `|` (barra vertical) entre a senha e o perfil é obrigatório.
> No teclado, geralmente fica na tecla `\` com Shift, ou Alt Gr + `|`.

4. Após adicionar **todas** as variáveis, clique em **"Save"**

---

## PASSO 5 — Reeditar o deploy para aplicar as senhas

1. Vá até a aba **"Deployments"**
2. Clique nos três pontinhos `···` do deploy mais recente
3. Clique em **"Redeploy"** → confirme com **"Redeploy"**
4. Aguarde 1 minuto

---

## PASSO 6 — Acessar o sistema

1. Volte para a aba **"Overview"**
2. Clique no link do site (algo como `monitoramento-pedagogico.vercel.app`)
3. Teste o login com um dos usuários cadastrados

---

## Como trocar a senha de um usuário

1. Vá em **Settings → Environment Variables** no Vercel
2. Encontre a variável do usuário e clique no lápis ✏️
3. Altere o valor para a nova senha (mantendo o `|perfil` no final)
4. Salve e faça um **Redeploy**

---

## Perfis disponíveis (não altere estes valores)

| Perfil | Valor a usar após o `|` |
|--------|------------------------|
| Coordenador Pedagógico | `coord-ped` |
| Coordenação de Turno | `coord-turno` |
| PIP | `pip` |
| AEE | `aee` |

---

## Dúvidas frequentes

**O site vai ficar disponível para sempre?**
Sim, o plano gratuito do Vercel não tem prazo de expiração para projetos pessoais/educacionais.

**Qual será o endereço do site?**
O Vercel vai gerar automaticamente algo como `monitoramento-pedagogico.vercel.app`. Você pode acessar este link de qualquer computador ou celular com internet.

**Posso adicionar mais usuários depois?**
Sim! É só adicionar mais variáveis `USER_` no painel e fazer um Redeploy.

**E se eu esquecer a senha de um usuário?**
Você vê e altera pelo painel do Vercel (Settings → Environment Variables) a qualquer momento.
