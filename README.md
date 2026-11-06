# <img width="128" height="128" alt="image" src="https://github.com/user-attachments/assets/4008a89a-b816-49ea-b4a6-7d5bf6e3c810" /> GuaraClub

Uma comunidade digital para estudantes e profissionais de tecnologia compartilharem conhecimento, acompanharem oportunidades e desenvolverem projetos juntos.

O GuaraClub é um protótipo de interface web responsiva, criado com HTML, CSS e JavaScript puro. A experiência apresenta páginas de comunidade, vagas, novidades e interação entre membros.

🔗 **Acesse o site:** [devanbatista35-cpu.github.io/SQL_site](https://devanbatista35-cpu.github.io/GuaraClub/)
## Funcionalidades

- Páginas de login e cadastro para explorar os fluxos da interface.
- Área inicial com destaques e oportunidades.
- Seções de comunidade, desenvolvedores, novidades e vagas.
- Chat demonstrativo com envio de mensagens na própria página.
- Alternância de tema nas páginas que exibem o controle correspondente.
- Layout adaptável a diferentes tamanhos de tela.

> **Nota:** este projeto é um protótipo front-end. Os formulários não autenticam nem criam contas, e as mensagens do chat não são salvas ou compartilhadas com outros usuários.

## Tecnologias

- HTML5
- CSS3
- JavaScript

Não é necessário instalar dependências ou executar um processo de build.

## Executar localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/devanbatista35-cpu/GuaraClub.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd GuaraClub
   ```

3. Abra `index.html` no navegador ou inicie um servidor estático local, por exemplo, com a extensão **Live Server** do Visual Studio Code.

## Publicar no GitHub Pages

1. Envie o projeto para um repositório no GitHub.
2. No repositório, acesse **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch principal e a pasta **/(root)** e salve.

O arquivo `index.html` está na raiz e funciona como página inicial do site.

## Estrutura do projeto

```text
GuaraClub/
├── index.html              # Página inicial / login
├── images/                 # Logos do projeto
├── js/
│   └── script.js           # Tema e interações do chat
├── pages/
│   ├── cadastro.html
│   ├── chat.html
│   ├── comunidade.html
│   ├── devs.html
│   ├── home.html
│   ├── mutirao.html
│   ├── novidades.html
│   ├── sobre.html
│   └── vagas.html
└── styles/
    └── style.css           # Estilos compartilhados
```

## Licença

Distribuído sob a licença [MIT](./LICENSE).
