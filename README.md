# 💰 Gerenciador de Gastos Pessoais com Análise de IA  

> Backend para controle financeiro pessoal com integração à **Google Gemini API** para transformar seus gastos em **insights inteligentes**.  

---

## 📌 Descrição do Projeto  
Esse projeto é um **backend** feito em **Node.js + Express**, com foco em gerenciamento de finanças pessoais.  
O diferencial? A integração com a **Google Gemini API**, que pega seus gastos brutos e devolve uma análise detalhada com dicas de economia.  

- ✅ API robusta com autenticação de usuários  
- 🐳 Arquitetura em **Docker** para rodar em qualquer máquina  
- 🔒 Segurança com **JWT + bcrypt**  
- 📊 Banco de dados **MongoDB**  

---

## ✨ Tecnologias Utilizadas  

| Categoria       | Tecnologia         | Descrição |
|-----------------|--------------------|-----------|
| **Backend**     | Node.js            | Ambiente de execução JavaScript no servidor |
| **Framework**   | Express.js         | Framework web para construção da API |
| **Banco**       | MongoDB            | Banco NoSQL flexível para armazenar os dados |
| **Containers**  | Docker + Compose   | Para rodar aplicação e banco de forma portátil |
| **Segurança**   | JWT + bcryptjs     | Autenticação de usuários |
| **IA**          | Google Gemini API  | Geração de análises inteligentes |

---

## 🚀 Funcionalidades da API  

- **POST** `/api/expenses` → Adiciona um novo gasto/receita  
- **GET** `/api/expenses` → Lista todos os gastos/receitas do usuário  
- **DELETE** `/api/expenses/:id` → Remove um gasto/receita específico  
- **POST** `/api/expenses/analyze` → Envia dados para IA e retorna insights financeiros  

---

## ⚙️ Como Rodar o Projeto  

### 1️⃣ Clone o repositório  
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
### 2️⃣ Configure as variáveis de ambiente
```bash
Crie um arquivo .env na raiz:

MONGO_URI=mongodb://mongodb:27017/gastos-ia
JWT_SECRET=sua_chave_secreta_super_longa_e_aleatoria
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
GEMINI_API_KEY=SUA_CHAVE_DE_API_GEMINI
```
### 3️⃣ Suba o projeto com Docker
```bash
docker-compose up --build
```
### 🐳 Passo 4: Iniciar a Aplicação com Docker Compose
```bash
docker-compose up --build
```
👉 Na primeira execução, o processo pode levar alguns minutos para construir as imagens.


## 🧪 Testando a API
Com a aplicação rodando, você pode usar o Thunder Client, Postman ou Insomnia para testar.

### 🔹 Registro de Usuário

**POST http://localhost:5000/api/register**
```bash
json

{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "password": "senha123"
}
```
### 🔹 Login de Usuário

**POST http://localhost:5000/api/login**
```bash
json

{
  "email": "email@exemplo.com",
  "password": "senha123"
}
```
**➡️ Retorna um token JWT.**

### 🔹 Listar Gastos/Receitas

**GET http://localhost:5000/api/expenses**

*Headers:*
```bash
makefile

x-auth-token: SEU_TOKEN_JWT_AQUI
```
### 🔹 Analisar Gastos com IA

**POST http://localhost:5000/api/expenses/analyze**

*Headers:*
```bash
makefile

x-auth-token: SEU_TOKEN_JWT_AQUI
```

*Body (JSON):*
 ```bash
json

[
  {
    "description": "salário do mês",
    "amount": 10000,
    "type": "income",
    "category": "Salário"
  },
  {
    "description": "Conta de internet",
    "amount": 230.3,
    "type": "expense",
    "category": "Contas"
  }
]
 ```

---

## 👨‍💻 Autor

**LeandroSantx**
