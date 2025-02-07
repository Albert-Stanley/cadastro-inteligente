# Cadastro de Pessoas

Este projeto é uma aplicação React para cadastro de pessoas, desenvolvido como parte de um teste técnico. Ele permite que usuários insiram informações pessoais, valide o CPF, consulte o endereço via API do ViaCEP e visualize os dados cadastrados.

## 🚀 Tecnologias Utilizadas

- **React** com **TypeScript**
- **React Router DOM** para navegação
- **Zod** para validação de formulários
- **API do ViaCEP** para preenchimento automático do endereço
- **Vercel** para deploy

## 📂 Estrutura do Projeto
```
📦 projeto-cadastro
 ┣ 📂 public        # Arquivos estáticos (ex: logo.png)
 ┣ 📂 src           # Código-fonte principal
 ┃ ┣ 📂 components  # Componentes reutilizáveis
 ┃ ┣ 📂 pages       # Páginas da aplicação
 ┃ ┣ 📂 styles      # Estilos globais (se aplicável)
 ┃ ┣ 📂 utils       # Funções auxiliares (ex: validação de CPF)
 ┃ ┣ 📜 App.tsx     # Componente principal
 ┃ ┣ 📜 main.tsx    # Ponto de entrada
 ┣ 📜 package.json  # Dependências e scripts
 ┣ 📜 tsconfig.json # Configuração do TypeScript
 ┣ 📜 vercel.json   # Configuração do deploy (se aplicável)
```

## 🎯 Funcionalidades

✅ **Cadastro de pessoas** com validação de dados
✅ **Preenchimento automático de endereço** via CEP
✅ **Validação de CPF**
✅ **Cálculo automático da idade**
✅ **Edição dos campos preenchidos pelo ViaCEP**
✅ **Redirecionamento para exibição dos dados cadastrados**

## 🔧 Como Rodar o Projeto Localmente

1. **Clone o repositório**
```sh
git clone https://github.com/Albert-Stanley/cadastro-inteligente
cd projeto-cadastro
```
2. **Instale as dependências**
```sh
npm install
```
3. **Inicie o servidor de desenvolvimento**
```sh
npm run dev
```
4. **Acesse no navegador**
```
http://localhost:5173
```

## 🚀 Deploy na Vercel

O projeto foi implantado na Vercel. Você pode acessá-lo em:
🔗 [Link para o deploy](https://cadastro-inteligente.vercel.app)

