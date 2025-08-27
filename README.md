Gerenciador de Gastos Pessoais com Análise de IA 💰
Descrição do Projeto
Este projeto é um backend para um aplicativo de gerenciamento de finanças pessoais, construído com Node.js e Express. O diferencial é a poderosa integração com a API do Google Gemini, que transforma dados brutos de gastos em insights financeiros inteligentes e personalizados.

O projeto demonstra a criação de uma API robusta, com funcionalidades de autenticação de usuários, e uma arquitetura baseada em Docker para garantir um ambiente de desenvolvimento portátil e consistente, facilitando a execução do projeto em qualquer máquina.

Tecnologias Utilizadas ✨
Categoria	Tecnologia	Descrição
Backend	Node.js	Ambiente de execução JavaScript do lado do servidor.
Framework	Express.js	Framework web para a construção da API.
Banco de Dados	MongoDB	Banco de dados NoSQL flexível para armazenar os dados de gastos.
Containerização	Docker, Docker Compose	Para empacotar e rodar a aplicação e o banco de dados.
Segurança	jsonwebtoken, bcryptjs	Para autenticação segura de usuários.
Integração de IA	Google Gemini API	Para análise de dados financeiros.

Exportar para as Planilhas
Funcionalidades da API 🚀
POST /api/expenses: Adiciona um novo registro de gasto ou receita.

GET /api/expenses: Lista todos os gastos e receitas do usuário autenticado.

DELETE /api/expenses/:id: Exclui um registro de gasto ou receita.

POST /api/expenses/analyze: Envia os dados de gastos para a API de IA e retorna uma análise detalhada, com resumo, áreas de maior gasto e dicas de economia.

Como Rodar o Projeto ⚙️
Este guia irá te ajudar a configurar e rodar o projeto em sua máquina local em poucos passos. O único pré-requisito é ter o Docker e o Git instalados.

Passo 1: Pré-requisitos
Certifique-se de que você tem o Docker e o Git instalados em sua máquina.

Passo 2: Clonar o Repositório
Abra o terminal e execute o comando abaixo para clonar o projeto:

Bash

git clone https://github.com/seu-usuario/seu-repositorio.git
Em seguida, entre na pasta do projeto:

Bash

cd seu-repositorio
Passo 3: Configurar as Variáveis de Ambiente
O projeto usa variáveis de ambiente para gerenciar informações sensíveis, como a chave de API da IA. Por segurança, o arquivo .env não está no repositório.

Na raiz do projeto, crie um novo arquivo chamado .env e adicione o seguinte conteúdo:

Snippet de código

MONGO_URI=mongodb://mongodb:27017/gastos-ia
JWT_SECRET=sua_chave_secreta_super_longa_e_aleatoria
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
GEMINI_API_KEY=SUA_CHAVE_DE_API_GEMINI
Substitua sua_chave_secreta_super_longa_e_aleatoria e SUA_CHAVE_DE_API_GEMINI pelos seus valores.

Passo 4: Iniciar a Aplicação com Docker Compose
Com um único comando, o Docker Compose irá construir a imagem da sua aplicação Node.js, baixar a imagem do MongoDB e iniciar ambos os serviços, interligando-os.

No terminal, na raiz do projeto, execute:

Bash

docker-compose up --build
O docker-compose pode demorar alguns minutos para construir as imagens e iniciar os serviços na primeira vez.

Testando a API 🧪
Com a aplicação rodando, você pode usar uma ferramenta como o Thunder Client ou Postman para testar os endpoints:

POST http://localhost:5000/api/register

Body: raw (JSON)

JSON

{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "password": "senha123"
}
POST http://localhost:5000/api/login

Body: raw (JSON)

JSON

{
  "email": "email@exemplo.com",
  "password": "senha123"
}
A resposta será um JSON contendo o token JWT.

GET http://localhost:5000/api/expenses

Headers:

Key: x-auth-token

Value: Cole o token JWT obtido no login aqui

POST http://localhost:5000/api/expenses/analyze

Headers:

Key: x-auth-token

Value: Cole o token JWT obtido no login aqui

Body: raw (JSON)

JSON

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
Contribuições
Contribuições, sugestões e melhorias são sempre bem-vindas! Siga o fluxo padrão de fork, branch, commit e pull request.

Autor: [Seu Nome ou Nome de Usuário do GitHub]
