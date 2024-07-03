# All-Paradise-In 🃏
Autores: Bruno Konzen e Arthur Kochem

# Blackjack Game 🎲
Bem-vindo ao projeto All-Paradise-In! Este é um jogo de Blackjack interativo construído usando HTML, CSS e JavaScript. O objetivo do jogo é vencer o dealer alcançando uma pontuação o mais próximo possível de 21 sem ultrapassar.

# Funcionalidades ✨
Jogo de Blackjack Clássico: Jogue uma partida de Blackjack contra o dealer.
Escolha de Rounds: Opte por jogar melhor de 1, 3 ou 7 rounds.
Sequência de Vitórias: Veja quantas vitórias consecutivas você consegue obter.
Leaderboard: Veja as melhores sequências de vitórias armazenadas no Local Storage.
Interface Intuitiva: Uma interface amigável com um design visualmente atraente.
Responsivo: Adaptável para diversos tamanhos de tela.

# Tecnologias Utilizadas 📄
- HTML
- CSS
- JavaScript
- Electron (para criar aplicativos desktop)

# Como Jogar 🎮
Página de Login: Faça login para começar a jogar.
Menu Principal: Escolha entre iniciar um novo jogo ou visualizar o leaderboard.
Escolha de Rounds: Selecione o número de rounds (melhor de 1, 3 ou 7).
Jogo: Utilize os botões "Pedir" para pedir uma carta e "Segurar" para manter sua mão.
Resultado: Veja se você venceu ou perdeu contra o dealer.
Próxima Rodada: Caso esteja jogando melhor de 3 ou 7, continue para a próxima rodada até decidir o vencedor da série.

# Instalação 🚀
Siga os passos abaixo para configurar o projeto localmente e criar executáveis para macOS, Linux e Windows:

# Pré-requisitos
Node.js (v12 ou superior)
npm (v6 ou superior)

# Passos
1 - Clone o repositório:
![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/9b94d584-528c-4451-ad0e-e40572648331)

2 - Navegue até o diretório do projeto:
![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/ec26bb0b-1c60-4874-891e-76897a07ce04)

3 - Instale as dependências:
![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/2380120d-c752-4039-8f69-8ac081718624)

# Desenvolvimento
I - Para rodar o aplicativo em modo de desenvolvimento:
![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/5eb3be5a-745b-4ba6-965d-7a148d27da2a)

# Construção
Para criar os executáveis para todas as plataformas:
1 - Instale o Electron Packager:
![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/49188e53-1ebf-4170-bce0-afc0fc1a2b4c)

2 - Execute o seguinte comando para empacotar o aplicativo:
![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/80115ef6-af73-4ccb-a86d-b1c41b913925)
electron-packager . BlackjackGame --platform=darwin,linux,win32 --arch=x64 --out=dist --overwrite

Isso criará executáveis para macOS, Linux e Windows no diretório dist.

Executando os Executáveis
macOS: Navegue até dist/BlackjackGame-darwin-x64 e abra BlackjackGame.app.
Linux: Navegue até dist/BlackjackGame-linux-x64 e execute ./BlackjackGame.
Windows: Navegue até dist/BlackjackGame-win32-x64 e execute BlackjackGame.exe.

# Estrutura do Projeto 📂
![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/3d91af5e-05f9-40d1-95c7-912ab7e5be86)

├── public
│   ├── cards              # Imagens das cartas
│   ├── background.jpeg    # Imagem de fundo
│   └── icon.png           # Ícone do jogo
├── dist                   # Diretório de saída para os executáveis
├── index.html             # Página inicial do jogo
├── menu.html              # Página do menu principal
├── login.html             # Página de login
├── leaderboard.html       # Página do leaderboard
├── style.css              # Arquivo de estilos
├── main.js                # Script principal do Electron
├── renderer.js            # Script de renderização do jogo
├── preload.js             # Script de pré-carregamento
├── menu.js                # Script do menu principal
├── login.js               # Script de login
├── leaderboard.js         # Script do leaderboard
├── package.json           # Arquivo de configuração do npm
└── README.md              # Este arquivo

# Licença 📄
Este projeto está licenciado sob a MIT License.

# Agradecimentos 🙌
Agradecemos ao prof. Roberson (antes coordenador) e a prof. Fran (agora coordenadora)! Espero que se divirtam jogando tanto quanto eu e Arthur nos divertimos desenvolvendo.

Capturas de Tela 📸
Menu Principal

Jogo

