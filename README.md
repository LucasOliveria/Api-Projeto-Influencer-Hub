# Api-Projeto-Influencer-Hub

## Sobre o projeto:

Esse projeto foi desenvolvido para auxiliar na criação de uma aplicação de gerenciamento de contatos de influenciadores digitais. Com esse servidor é possível listar, cadastrar, atualizar e excluir registros de influenciadores.

A API também permite a criação e login de usuários autenticados para acessar e manipular os registros de influenciadores.

## URL da API:
```
https://api-projeto-influencer-hub.cyclic.app

URL alternativa: https://api-projeto-influencer-hub-alternative.onrender.com
```
## Como utilizar os códigos desse repositório:

Antes de começar instale o Node.js e o postgreSQL na sua máquina caso ainda não possua.

Node.js: <a href="https://nodejs.org/en" target="_blank">"https://nodejs.org/en</a> 

postgreSQL: <a href="https://www.postgresql.org/download/" target="_blank">https://www.postgresql.org/download/</a> 

A API pode ser acessada por meio da URL acima e já possui conexão com um banco de dados externo. Mas caso queira utilizar os códigos desse repositório, execute os passos a seguir:

1. Faça um fork desse repositório para a sua coleção de repositórios no GitHub
2. Clone o repositório para sua máquina
3. Abra o projeto no seu editor de códigos (IDE) e no terminal digite o comando "npm install" para instalar as dependências. OBS.:É necessário possuir o Node.js instalado em sua maquina
4. Nos arquivos index.js, users.js, connection.js e validateToken.js existem variáveis de ambiente "process.env" e essas devem ser configuradas. Para isso duplique o arquivo ```.env.example``` no diretório raiz, renomeie para ```.env``` e preencha as variáveis com as configurações de conexão que costuma utilizar. OBS.: A conexão com o banco de dados está sendo feita pela biblioteca ```knex```. Em uma conexão local retire a propriedade ```ssl: { rejectUnauthorized: false }``` do arquivo connection.js

#### .env (exemplo)
```javascript
PORT=3000

HOST=localhost
USER=seuUsuario
PASS=suaSenha
DATABASE=nomeDoBancoDeDados

PASS_JWT=umaSenhaSegura
```

#### database > connection.js
```javascript
const knex = require("knex")({
  client: 'pg',
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
  }
});

module.exports = knex
```
5. Utilize o arquivo dump.sql para criar o banco de dados e as tabelas necessárias com o auxilio da ferramenta que você utiliza para criar e manipular banco de dados (Ex.: Oracle SQL Developer,MySQL Workbench, Beekeeper Studio...). OBS.: Esse projeto utiliza o postgreSQL para gerenciamento de banco de dados por isso você também deve ter instalado em sua máquina.
6. Após realizar todas as configurações rode o script "npm run dev" no terminal do projeto

---

## Endpoints

Utilize a URL da API com os endpoints a seguir para acessar as Rotas


1. POST /user

Essa rota é para cadastro de usuários que irão poder acessar outras rotas para manipular registros de influenciadores.

### Exemplo de requisição

```json
{
    "name": "Lucas",
    "email": "lucas@email.com",
    "password": "123",
    "authorized": true
}
```

### Exemplo de resposta

```json
{
    "Este e-mail já está sendo utilizado."
}
```
```json
{
    "Usuário cadastrado com sucesso!"
}
```

2. POST /login

Essa rota é para login de usuários cadastrados.

### Exemplo de requisição

```json
{
    "email": "lucas@email.com",
    "password": "123"
}
```

### Exemplo de resposta

```json
{
    "E-mail ou senha incorreta!"
}
```
```json
{
    "usuario": {
        "id": 1,
        "name": "Lucas",
        "email": "lucas@email.com",
        "authorized": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjg5MDE5ODAyLCJleHAiOjE2ODkwNDg2MDJ9.Jpd0o2K7-02l-midG6VfWNIgPV6uslQnxc2AH3eO6VA"
}
```
---
## ATENÇÃO: Todos os endpoints a seguir exigem token de autenticação gerado ao logar um usuário. O token dever ser colocado no headers da requisição e deve ter o formato Bearer Token. O usuário logado precisa ter a propriedade ```authorized``` com valor ```true``` para manipular todos os dados de influenciadores, caso contrário só conseguirá ver a lista de influenciadores cadastrados. Essa propriedade é definida no cadastro do usuário.
---

3. GET /profile

Essa rota é para obter os dados do usuário logado.

### Exemplo de requisição

Sem corpo de requisição, apenas o token no headers.

### Exemplo de resposta

```json
{
    "Usuário não autorizado!"
}
```
```json
{
    "id": 1,
    "name": "Lucas",
    "email": "lucas@email.com",
    "authorized": true
}
```
4. GET /categories 

Essa rota é para listar as categorias de conteúdo.

### Exemplo de requisição

Sem corpo de requisição, apenas o token no headers.

### Exemplo de resposta

```json
{
    "Usuário não autorizado!"
}
```
```json
[
    {
        "id": 1,
        "category": "Vlog"
    },
    {
        "id": 2,
        "category": "Review"
    },
    {
        "id": 3,
        "category": "Moda e Estilo"
    },
    {
        "id": 4,
        "category": "Beleza"
    }
]
```

5. POST /influencers 

Essa rota é para cadastrar influenciadores

### Exemplos de requisição

```json
{
    "name": "Pato Papão",
    "email":"patopa@email.com",
    "age": 31,
    "subscribers": 1200000,
    "at_channel": "paptopapao_oficial2",
    "platform": "YouTube",
    "id_category": 13
}
```
```json
{
    "name": "Peter L",
    "subscribers": 1200000,
    "at_channel": "@nerdchannel",
    "platform": "YouTube",
    "id_category": 10
}
```

### Exemplos de resposta

```json
{
    "Este e-mail já foi cadastrado."
}
```
```json
{
    "O @ do canal já possui registro."
}
```
```json
{
    "id": 5,
    "name": "Pato Papão",
    "email": "patopa@email.com",
    "age": 31,
    "subscribers": 1200000,
    "at_channel": "paptopapao_oficial2",
    "platform": "YouTube",
    "id_user": 1,
    "id_category": 13,
    "category": "Games"
}
```

6. GET /influencers

Essa Rota é para listar todos os influenciadores cadastrados

### Exemplo de requisição

Sem corpo de requisição, apenas o token no headers.

### Exemplo de resposta

```json
{
    "Usuário não autorizado!"
}
```
```json
[
    {
        "id": 1,
        "name": "Pato Papão",
        "email": "pato@email.com",
        "age": 31,
        "subscribers": 1200000,
        "at_channel": "paptopapao_oficial",
        "platform": "YouTube",
        "id_user": 1,
        "id_category": 13,
        "category": "Games"
    },
    {
        "id": 2,
        "name": "Nyvi",
        "email": "nyvi@st.com",
        "age": 29,
        "subscribers": 500000,
        "at_channel": "nyvieoficial",
        "platform": "YouTube",
        "id_user": 1,
        "id_category": 10,
        "category": "Entretenimento"
	},
]
```

7. GET /influencers/:id

Essa Rota é para encontrar um influenciador pelo número do id. O ```id``` do influenciador que se quer encontrar deve ser passado como parâmetro de rota ```req.params```.

### Exemplo de requisição

Sem corpo de requisição, apenas o token no headers.

### Exemplo de resposta

```json
{
    "Usuário não autorizado!"
}
```
```json

{
    "id": 1,
    "name": "Pato Papão",
    "email": "pato@email.com",
    "age": 31,
    "subscribers": 1200000,
    "at_channel": "paptopapao_oficial",
    "platform": "YouTube",
    "id_user": 1,
    "id_category": 13,
    "category": "Games"
}

```

8. PUT /influencers/:id 

Essa rota é para atualizar um influenciador. O ```id``` do influenciador que se quer atualizar deve ser passado como parâmetro de rota ```req.params```.

### Exemplos de requisição

```json
{
    "name": "Pato Papão",
    "email":"patopa@email.com",
    "age": 31,
    "subscribers": 1200000,
    "at_channel": "paptopapao_oficial2",
    "platform": "YouTube",
    "id_category": 13
}
```
```json
{
    "name": "Peter L",
    "subscribers": 1200000,
    "at_channel": "@nerdchannel",
    "platform": "YouTube",
    "id_category": 10
}
```

### Exemplos de resposta

```json
{
    "Influencer não encontrado!"
}
```

```json
{
    "Este e-mail já foi cadastrado."
}
```
```json
{
    "O @ do canal já possui registro."
}
```
```json
{
    "id": 5,
    "name": "Pato Papão",
    "email": "patopa@email.com",
    "age": 31,
    "subscribers": 1200000,
    "at_channel": "paptopapao_oficial2",
    "platform": "YouTube",
    "id_user": 1,
    "id_category": 13,
    "category": "Games"
}
```

9. DELETE /influencers/:id

Essa rota é para excluir um influenciador. O ```id``` do influenciador que se quer excluir deve ser passado como parâmetro de rota ```req.params```.

### Exemplo de requisição

Sem corpo de requisição, apenas o token no headers.

### Exemplo de resposta

```json
{
    "Usuário não autorizado!"
}
```
```json
{
    "Influencer não encontrado!"
}
```
```json
{
    "Influenciador excluído com sucesso"
}
```

## Autor:
#### Lucas Oliveira

## Links
<a href="https://www.linkedin.com/in/lucas-oliveira-5b8a5532/" target="_blank">LinkedIn</a>

<a href="https://github.com/LucasOliveria/Projeto-Influencer-Hub" target="_blank">Repositório Front-end</a>
