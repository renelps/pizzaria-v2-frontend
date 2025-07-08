# 🍕 Pizzaria Oliveira - Painel Web (Admin)

Este repositório contém o **painel administrativo** da Pizzaria Oliveira, desenvolvido com **Next.js (App Router)**. Ele permite que funcionários gerenciem categorias, produtos e pedidos recebidos do app mobile, com autenticação segura via **JWT**.

## 🚀 Tecnologias Utilizadas

- **Next.js (App Router)**
- **TypeScript**
- **TailwindCSS**
- **Axios**
- **JWT (via cookies)**
- **Context API**

## 🎯 Funcionalidades

- Login e cadastro de usuários
- Logout com limpeza de sessão
- Cadastro e listagem de categorias
- Cadastro de produtos com upload de imagem
- Visualização de pedidos em aberto (recebidos do app mobile)
- Visualização de detalhes dos pedidos
- Marcar pedidos como finalizados

## 📁 Estrutura do Projeto

```text
src/
├── app/               # Rotas e páginas (App Router)
│   ├── signup/        # Página de cadastro
│   └── dashboard/     # Área protegida do sistema
├── context/           # Contexto de autenticação
├── lib/               # Helpers e cookies
├── services/          # Axios configurado
├── utils/             # Utilitários diversos
```

## 🔐 Autenticação

A aplicação utiliza **JWT via cookies HttpOnly**, garantindo segurança. Usuários não autenticados são redirecionados para a tela de login.

## ▶️ Como Rodar o Projeto

```bash
npm install
npm run dev
```

> 💡 Configure a URL da API no arquivo: `/src/services/api.ts`

## 📦 Backend da Aplicação

👉 [Pizzaria API](https://github.com/renelps/pizzaria-v2-api)

---

Feito com 💛 por [@renelps](https://github.com/renelps)

