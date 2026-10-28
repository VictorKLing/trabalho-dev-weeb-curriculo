# Gestão de Currículos

Aplicação web para cadastrar, organizar e consultar currículos. O projeto foi desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

## Requisitos

- Node.js 20 ou superior
- npm

## Executar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Funcionalidades

- Listagem, busca e visualização de currículos
- Cadastro de dados pessoais, formação, experiência e habilidades
- Máscaras de entrada e validação de formulário
- Adição e remoção de itens de formação, experiência e habilidades
- Pré-visualização de foto
- Confirmação antes de excluir um currículo
- Persistência local no navegador com `localStorage`

Os dados ficam no navegador utilizado. A foto selecionada é armazenada como dados locais para a pré-visualização; não há envio para um serviço remoto.

## Rotas

- `/` — página inicial
- `/sistema/paginas/curriculos` — lista de currículos
- `/sistema/paginas/curriculos/novo` — cadastro
- `/sistema/paginas/curriculos/:id` — detalhes

## Verificação

```bash
npm run lint
npm run build
```
