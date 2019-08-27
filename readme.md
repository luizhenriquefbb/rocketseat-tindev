# Tindev

## Sobre

- Este app é um aaplicação full stack desenvolvida em react/reactNative e node e funciona como um espécie de "Tinder" para desenvoldedores.
- Ela se comunica com a api do github e basta informar o userName usado nesta plataforma para poder logar no tindev. (informacoes como BIO, avatar e nome sao obtidas automaticamente).
- Dando os devidos creditos, foi desenvolvida durante a omnistack 8 promovida pela RocketSeat (**TODO: colocar link**)

## Prints

![](imagens_readme/login_1.png)
<!-- ![](imagens_readme/login_2.png) -->
![](imagens_readme/home.png)

# Features Implementadas

- Fullstack completa: conta tanto com backend, como com frontend, mobile e banco de dados remoto (mongoDB)
- Comunicação com API de terceiros (github)
- **TODO: match em tempo real com socket**


# Instalacao

## Front e Back

- Instalar Node

```sh
sudo apt-get install -y curl
```

```sh
sudo curl -sL https://deb.nodesource.com/setup_8.x |sudo -E bash
```

```sh
sudo apt-get install -y nodejs
```

- instalar yarn

[instalação do yarn](https://yarnpkg.com/pt-BR/docs/install#debian-stable)


- OBS: se você, como eu veio do NPM, taí um [link](https://yarnpkg.com/lang/pt-br/docs/migrating-from-npm/) para ajudar na transição


## BackEnd

- Basta ir para o diretório do backend
```sh
cd backend
```

e instalar as dependências
```sh
yarn install
```

e depois é só colocar o servidor para "ouvir" as requisições
```sh
node src/index.js
```


## FrontEnd

<!-- - [react](https://reactjs.org/docs/getting-started.html) -->

- Basta ir para o diretório do frontend
```sh
cd frontend
```

e instalar as dependências
```sh
yarn install
```

Rodar no browser
```sh
yarn start
```

<!-- ## Mobile

Instalar as dependencias

```sh
cd mobile
yarn install
```

Primeira instalacao (precisa do celular conectado via USB)

```sh
react-native run-android

ou

react-native run-ios
``` -->

# TODO:

- Readme versao ingles
- aplicacao mobile
- match
