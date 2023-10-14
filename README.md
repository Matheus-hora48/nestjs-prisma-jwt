<p align="center">

<a href="https://topsoft.inf.br/logo.png" target="blank"><img src="https://topsoft.inf.br/logo.png" width="100" alt="Topsoft Logo" /></a>

</p>

# API Monitor

- [Descrição](#descrição)
- [Instalação](#instalação)
  - [Clone o Repositório](#clone-o-repositório)
  - [Instale as Dependências](#instale-as-dependências)
  - [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
  - [Migrações do Prisma](#migrações-do-prisma)
- [Principais Comandos do Prisma](#principais-Comandos-do-prisma)
- [Scripts](#scripts)
  - [Rodar o Projeto](#rodar-o-projeto)
  - [Verificação de Lint](#verificação-de-lint)
  - [Executar Testes](#executar-testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Dependências Principais](#dependências-principais)
- [Licença](#licença)

## Descrição

Este é um projeto que utiliza o framework Nest.js juntamente com o Prisma para criar uma a API do Top Monitor.

## Instalação

Para começar, certifique-se de ter o Node.js e o npm instalados em sua máquina. Em seguida, siga os passos abaixo:

1. Clone o repositório:

```bash
git clone url aqui bash
```

2. Instale as dependências:

```bash
  cd api-monitor
```

```bash
  npm install
```

3. **Configuração do Banco de Dados:**

Crie um arquivo `.env` na raiz do seu projeto e adicione as seguintes configurações:

```bash
DATABASE_URL="postgresql://seu-usuario:senha@localhost:5432/nome-do-banco"
```

Substitua `seu-usuario`, `senha`, `localhost`, `5432` e `nome-do-banco` com suas próprias credenciais e informações do banco de dados.

Certifique-se de não compartilhar o arquivo `.env` publicamente, pois ele contém informações sensíveis. Adicione-o ao seu arquivo `.gitignore` para evitar que seja incluído em repositórios versionados.

4. Migrações do Prisma:

```bash
  npx prisma migrate dev
```

Depois

```bash
  npx prisma db push
```

## Acessar a documentação

Após abrir a aplicação para ter acesso à documentação do Swagger, acesse:

```bash
  http://localhost:3000/api
```

## Principais Comandos do Prisma

O Prisma oferece uma série de comandos úteis para gerenciar o banco de dados e o esquema. Abaixo estão os comandos mais comuns:

- `npx prisma init`: Configura o Prisma para o seu aplicativo.
- `npx prisma generate`: Gera artefatos, como o Prisma Client.
- `npx prisma db pull`: Puxa o esquema de um banco de dados existente para atualizar o esquema do Prisma.
- `npx prisma db push`: Atualiza o estado do esquema Prisma no banco de dados.
- `npx prisma migrate dev`: Cria e aplica migrações no banco de dados com base nas definições do seu esquema Prisma.
- `npx prisma studio`: Abre o Prisma Studio para navegar e interagir com os dados do seu banco.

## Scripts

### Rodar o projeto

- `npm run build`: Compilação do projeto Nest.js.
- `npm run format`: Formatação automática do código usando Prettier.
- `npm run start`: Inicia a aplicação em modo de produção.
- `npm run start:dev`: Inicia a aplicação em modo de desenvolvimento com auto-reload.
- `npm run start:debug`: Inicia a aplicação em modo de depuração com auto-reload.

### Rodar verificação de lint

- `npm run lint`: Executa a verificação de linting com ESLint.

### Rodar testes

- `npm test`: Executa os testes usando Jest.
- `npm run test:watch`: Executa os testes em modo de observação.
- `npm run test:cov`: Executa os testes com cobertura de código.
- `npm run test:debug`: Executa os testes em modo de depuração.
- `npm run test:e2e`: Executa os testes de integração.

## Dependências Principais

- `@nestjs/common`
- `@nestjs/core`
- `@nestjs/jwt`
- `@nestjs/mapped-types`
- `@nestjs/passport`
- `@nestjs/platform-express`
- `@nestjs/platform-socket.io`
- `@nestjs/swagger`
- `@nestjs/websockets`
- `@prisma/client`
- `bcrypt`
- `bcryptjs`
- `class-validator`
- `passport`
- `passport-jwt`
- `pg`
- `prisma`
- `reflect-metadata`
- `rxjs`

## Licença

Este projeto está sob a licença UNLICENSED - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

---
