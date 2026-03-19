# 🚀 User Interactions

Aplicação front-end desenvolvida com **React + TypeScript + Vite** para gerenciamento de usuários, permitindo **listar, cadastrar e editar** informações de forma simples e eficiente.

---

## ✨ Funcionalidades

* 📋 Listagem de usuários
* ➕ Cadastro de novos usuários
* ✏️ Edição de usuários existentes
* ✅ Validação de formulário
* 🔄 Integração com API REST (JSON Server)
* 🚦 Tratamento de erros nas requisições
* 🧠 Estrutura baseada em boas práticas (Clean Architecture)
* 🎨 Interface estilizada com TailwindCSS

---

## 🛠️ Tecnologias utilizadas

* ⚛️ React
* 🟦 TypeScript
* ⚡ Vite
* 🎨 TailwindCSS
* 🌐 Axios
* 🔀 React Router DOM
* 🧪 JSON Server (API mock)

---

## 📁 Estrutura do projeto

```
src/
├── components/
├── pages/
├── services/
├── routes/
├── contexts/
├── hooks/
├── types/
├── utils/
```

---

## ⚙️ Configuração do ambiente

Crie um arquivo `.env` com base no `.env.example`:

```
VITE_API_URL=http://localhost:3001
```

---

## ▶️ Como rodar o projeto

### 1. Instalar dependências

```
npm install
```

---

### 2. Rodar a API fake (JSON Server)

```
npm run dev:api
```

> A API será iniciada em: http://localhost:3001

---

### 3. Rodar a aplicação

```
npm run dev
```

> A aplicação estará disponível em: http://localhost:5173

---

## 🔌 Endpoints simulados

```
GET    /users
POST   /users
PUT    /users/:id
DELETE /users/:id
```

---

## 💡 Observações

* A aplicação utiliza o **JSON Server** para simular uma API REST completa.
* As variáveis de ambiente são gerenciadas via `.env`.
* Estrutura organizada visando escalabilidade e manutenção.

---

## 📌 Possíveis melhorias

* 📱 Responsividade completa
* 🧠 Gerenciamento de estado global mais robusto
* 🔐 Autenticação de usuários
* 🌍 Integração com API real

---
