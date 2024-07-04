# All-Paradise-In 🃏
Autores: Bruno Konzen e Arthur Kochem.

# Blackjack Game 🎲
Bem-vindo ao projeto All-Paradise-In! Este é um jogo de Blackjack interativo construído usando HTML, CSS e JavaScript. O objetivo do jogo é vencer o dealer alcançando uma pontuação o mais próximo possível de 21 sem ultrapassar.

# Funcionalidades ✨
**Jogo de Blackjack Clássico:** Jogue uma partida de Blackjack contra o dealer.  
**Escolha de Rounds:** Opte por jogar melhor de 1, 3 ou 7 rounds.  
**Sequência de Vitórias:** Veja quantas vitórias consecutivas você consegue obter.  
**Leaderboard:** Veja as melhores sequências de vitórias armazenadas no Local Storage.  
**Interface Intuitiva:** Uma interface amigável com um design visualmente atraente.  
**Responsivo:** Adaptável para diversos tamanhos de tela.  

# Tecnologias Utilizadas 📄
_- HTML_  
_- CSS_  
_- JavaScript_  
_- Electron (para criar aplicativos desktop)_  

# Como Jogar 🎮
**Página de Login:** Faça login para começar a jogar.  
**Menu Principal:** Escolha entre iniciar um novo jogo ou visualizar o leaderboard.  
**Escolha de Rounds:** Selecione o número de rounds (melhor de 1, 3 ou 7).  
**Jogo:** Utilize os botões "Pedir" para pedir uma carta e "Segurar" para manter sua mão.  
**Resultado:** Veja se você venceu ou perdeu contra o dealer.  
**Próxima Rodada:** Caso esteja jogando melhor de 3 ou 7, continue para a próxima rodada até decidir o vencedor da série.  

# Instalação 🚀
Siga os passos abaixo para configurar o projeto localmente e criar executáveis para macOS, Linux e Windows:

# **_Pré-requisitos_**
Node.js (v12 ou superior)  
npm (v6 ou superior)

# _Passos_
**1 -** Clone o repositório:

![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/9b94d584-528c-4451-ad0e-e40572648331)
git clone https://github.com/seu-usuario/blackjack-game.git  


**2 -** Navegue até o diretório do projeto:

![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/ec26bb0b-1c60-4874-891e-76897a07ce04)
cd blackjack-game  


**3 -** Instale as dependências:

![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/2380120d-c752-4039-8f69-8ac081718624)
npm install  


# Desenvolvimento
Para rodar o aplicativo em modo de desenvolvimento:

![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/5eb3be5a-745b-4ba6-965d-7a148d27da2a)
npm start  


# Construção
Para criar os executáveis para todas as plataformas:

**1 -** Instale o Electron Packager:

![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/49188e53-1ebf-4170-bce0-afc0fc1a2b4c)
npm install -g electron-packager  


**2 -** Execute o seguinte comando para empacotar o aplicativo:

![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/80115ef6-af73-4ccb-a86d-b1c41b913925)
electron-packager . BlackjackGame --platform=darwin,linux,win32 --arch=x64 --out=dist --overwrite


_Isso criará executáveis para macOS, Linux e Windows no diretório dist._  

_Executando os Executáveis_  
**macOS:** Navegue até dist/BlackjackGame-darwin-x64 e abra BlackjackGame.app.  
**Linux:** Navegue até dist/BlackjackGame-linux-x64 e execute ./BlackjackGame.  
**Windows:** Navegue até dist/BlackjackGame-win32-x64 e execute BlackjackGame.exe.  

# Estrutura do Projeto 📂
![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/be50bd3b-6561-496f-83c7-fe3126027032)  


# Licença 📄
Este projeto está licenciado sob a MIT License.

# Agradecimentos 🙌
Agradecemos ao prof. Roberson (antes coordenador) e a prof. Fran (agora coordenadora)! Espero que se divirtam jogando tanto quanto eu e Arthur nos divertimos desenvolvendo.

# Capturas de Tela 
# Menu Principal

# Jogo

