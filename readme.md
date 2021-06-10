# VTEX-LOCAL / VTEX-SPEED

Proxy reverso e automatizador de tarefas, totalmente simples e personalizável.

## Pre-requisitos

- Node - http://nodejs.org/
- Webpack - https://webpack.js.org/

## Instalação

Clone este repositório

## Início

**Antes de continuar**, insira o nome da loja em `accountName` no arquivo `package.json`. Exemplo:

```json
{
  "accountName": "minhaloja"
}
```

Entre no diretório do arquivo que foi clonado e execute os seguintes comandos respectivamente:

```shell
    npm install
    npm run dev

    ou

    yarn install
    yarn dev
```

Para gerar os arquivos minificados para produção, basta digitar no terminal

```shell
    npm run prod

    ou

    yarn prod
```

Sua loja abrirá automaticamente com a url correta `minhaloja.vtexlocal.com.br`

## Recursos

Todos os arquivos `src/` são compilados, otimizados e copiados para a pasta `build/arquivos`.

Você pode alterar este processo alterando o arquivo `webpack.config.js`.

Suportado atualmente:

- LiveReload
- Css minify
- JS Bundler
- Autoprefixer
- Sass

Esse repositório é uma réplica do mesmo processo mas com Gulp. Criado pelo CaioCFV. Você pode ver o repo aqui - https://github.com/CaioCFV/vtex-local
