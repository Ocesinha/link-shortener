# 🔗 Encurta - Encurtador de URLs Moderno

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=white)

**Encurtador de URLs profissional e moderno com autenticação, estatísticas e design elegante.**

[Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📋 Sobre o Projeto

**Encurta** é um encurtador de URLs moderno e completo, desenvolvido com Node.js, Express e MongoDB. O projeto oferece uma interface elegante e responsiva, autenticação segura de usuários, e funcionalidades avançadas como aliases personalizados, estatísticas de cliques e gerenciamento de links.

### ✨ Features Principais

- 🔐 **Autenticação Completa** - Sistema de login e registro com JWT e bcrypt
- 🔗 **Encurtamento de URLs** - Geração automática ou aliases personalizados
- 📊 **Estatísticas** - Contador de cliques para cada link encurtado
- 👤 **Dashboard Pessoal** - Visualize e gerencie todos os seus links
- 🗑️ **Gerenciamento** - Delete links com confirmação de segurança
- 🔒 **Proteção CSRF** - Segurança contra ataques Cross-Site Request Forgery
- 📱 **Design Responsivo** - Interface moderna que funciona em qualquer dispositivo
- 🎨 **UI/UX Premium** - Design com gradientes, animações e Bootstrap Icons
- 🍪 **Notificações** - Sistema de feedback visual com cookies
- ⚡ **Performance** - Redirecionamentos rápidos e eficientes

---

## 🛠️ Stack Tecnológica

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web minimalista
- **Prisma** - ORM moderno para MongoDB
- **MongoDB** - Banco de dados NoSQL
- **JWT** - Autenticação via JSON Web Tokens
- **bcrypt** - Hash de senhas
- **csurf** - Proteção CSRF
- **nanoid** - Geração de IDs únicos
- **validator** - Validação de dados

### Frontend
- **EJS** - Template engine
- **CSS3** - Estilização moderna com gradientes e animações
- **Bootstrap Icons** - Ícones vetoriais
- **JavaScript Vanilla** - Interatividade no cliente

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ instalado
- MongoDB Atlas ou instância local do MongoDB
- npm ou yarn

### Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/encurta.git
   cd encurta
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   PORT=3000
   JWT_SECRET=seu_jwt_secret_super_seguro_aqui
   DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/Encurta?appName=Users"
   ```

   > **Dica:** Para gerar um JWT_SECRET seguro, use:
   > ```bash
   > node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   > ```

4. **Configure o banco de dados**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Inicie o servidor**
   ```bash
   npm start
   ```

6. Acesse em: **http://localhost:3000**

---

## 📂 Estrutura do Projeto

```
encurta/
├── frontend/
│   ├── assets/
│   │   └── css/              # Estilos CSS modulares
│   │       ├── base.css
│   │       ├── header.css
│   │       ├── auth.css
│   │       ├── components.css
│   │       ├── notifications.css
│   │       └── links.css
│   └── views/
│       ├── includes/          # Componentes reutilizáveis
│       │   ├── header.ejs
│       │   ├── header-auth.ejs
│       │   ├── navbar.ejs
│       │   ├── footer.ejs
│       │   ├── footer-auth.ejs
│       │   └── notifications.ejs
│       ├── index.ejs          # Página principal
│       ├── login.ejs          # Página de login
│       └── register.ejs       # Página de registro
├── prisma/
│   └── schema.prisma          # Schema do Prisma (MongoDB)
├── src/
│   ├── controllers/           # Lógica de negócio
│   │   ├── home.js
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── logout.js
│   │   ├── shorten.js
│   │   ├── link.js
│   │   └── deleteLink.js
│   ├── middlewares/           # Middlewares customizados
│   │   ├── auth.js
│   │   ├── checkUser.js
│   │   └── notifications.js
│   ├── routes/                # Definição de rotas
│   │   ├── public.js
│   │   └── private.js
│   ├── app.js                 # Configuração do Express
│   └── server.js              # Inicialização do servidor
├── .env                       # Variáveis de ambiente (não versionado)
├── .gitignore
├── package.json
└── README.md
```

---

## 🎯 Como Usar

### 1. **Registro de Usuário**
- Acesse `/register`
- Preencha: Nome, Email e Senha (mínimo 6 caracteres)
- Clique em "Criar Conta"

### 2. **Login**
- Acesse `/login`
- Entre com seu email e senha
- Redirecionamento automático para a home

### 3. **Encurtar uma URL**
- Na página principal, cole a URL desejada
- (Opcional) Defina um alias personalizado
- Clique em "Encurtar Link"
- Copie e compartilhe seu link curto!

### 4. **Gerenciar Links**
- Visualize todos os seus links na seção "Meus Links Encurtados"
- Veja quantas visitas cada link teve
- Copie links rapidamente com o botão de clipboard
- Delete links que não precisa mais

### 5. **Acessar Link Curto**
- Use o formato: `http://localhost:3000/link/seu-alias`
- Redirecionamento automático para a URL original
- Contador de cliques atualizado

---

## 🔐 Segurança

O projeto implementa diversas camadas de segurança:

- ✅ **Senhas hasheadas** com bcrypt (salt rounds: 10)
- ✅ **JWT** para sessões autenticadas (expiração: 7 dias)
- ✅ **Proteção CSRF** em todos os formulários
- ✅ **Validação de dados** no backend
- ✅ **Cookies HttpOnly** para tokens
- ✅ **Validação de propriedade** antes de deletar links
- ✅ **Sanitização de inputs** com validator.js

---

## 🎨 Design

O projeto possui um design moderno e profissional:

- **Gradientes vibrantes** em elementos-chave
- **Animações suaves** para melhor UX
- **Bootstrap Icons** para iconografia consistente
- **Layout responsivo** para mobile, tablet e desktop
- **Dark mode friendly** com paleta de cores moderna
- **Notificações toast** para feedback visual
- **Cards elegantes** com hover effects

### Paleta de Cores

```css
--primary-purple: #8b5cf6
--primary-purple-light: #a78bfa
--primary-purple-dark: #7c3aed
--success: #10b981
--error: #ef4444
```

---

## 📊 Banco de Dados

### Schema Prisma

```prisma
model User {
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  email    String @unique
  name     String
  password String
  links    Link[]
}

model Link {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  url       String
  shortUrl  String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  clicks    Int      @default(0)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
}
```

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Isso significa que você pode:

- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Usar em projetos privados

Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**César**

- GitHub: [@Ohcesinha](https://github.com/Ohcesinha)

---

## 🙏 Agradecimentos

- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [nanoid](https://github.com/ai/nanoid)

---

<div align="center">
  
**⭐ Se este projeto foi útil para você, considere dar uma estrela!**

</div>
