# All-Paradise-In 🃏
Autores: Bruno Konzen e Arthur Kochem.

# Blackjack Game 🎲
Bem-vindo ao projeto All-Paradise-In! Este é um jogo de Blackjack interativo construído usando HTML, CSS e JavaScript. O objetivo do jogo é vencer o dealer alcançando uma pontuação o mais próximo possível de 21 sem ultrapassar.

# Funcionalidades ✨
**Jogo de Blackjack Clássico:** Jogue uma partida de Blackjack contra o dealer.  
**Escolha de Rounds:** Opte por jogar melhor de 1, 3 ou 7 rounds.  
**Sequência de Vitórias:** Veja quantas vitórias consecutivas você consegue obter.  
**Interface Intuitiva:** Uma interface amigável com um design visualmente atraente.  
**Responsivo:** Adaptável para diversos tamanhos de tela.  

# Tecnologias Utilizadas 📄
_- HTML_  
_- CSS_  
_- JavaScript_  
_- Electron (para criar aplicativos desktop)_

# Plano de Testes
**Testes da Funcionalidade do Jogo de BlackJack**

● Objetivo: Garantir que o jogo de poker funcione conforme esperado.
● Casos de Teste:

1. Criação e entrada em mesas de jogo.
2. Distribuição correta das cartas.
3. Turnos de jogo.
4. Cálculo correto dos vencedores.
5. Funcionalidade das ações de jogo.
6. Alteração de modo de jogo
7. aleatoriedade do Sistema
   
**Testes de Registro de Usuários**

● Objetivo: Verificar se o sistema permite o registro de novos usuários de
forma correta e segura.
● Casos de Teste:

1. Registro com dados válidos.
2. Registro com email já existente.
3. Registro com campos obrigatórios vazios.
   
**Testes de Login e Autenticação**

● Objetivo: Verificar o processo de login e autenticação de usuários.
● Casos de Teste:

1. Login com credenciais corretas.
2. Login com senha incorreta.
3. Login com email não registrado.
   
**Testes da Interface do Usuário**

● Objetivo: Avaliar a usabilidade e a responsividade da interface do usuário.
● Casos de Teste:

1. Exibição correta em diferentes dispositivos e sistemas.
2. Navegação intuitiva.
3. Feedbacks visuais em caso de erros
4. Feedback sobre funcionalidade do jogo
5. Reporte de bugs
6. Fluidez do aplicativo

# Metodologia

      A metodologia ágil aplicada neste projeto teve base na metodologia SCRUM,
onde os membros do grupo dividiram de forma inteligente o projeto em pequenos
ciclos de tarefas entre si, sendo executados de forma contínua e flexível conforme a
disponibilidade de cada membro durante o projeto, mantendo troca de informações
sobre andamento e estratégias de desenvolvimento semanalmente, assim como o
estabelecimento de prazos para cada tarefa, garantindo um ritmo de
desenvolvimento contínuo e uma garantia maior de entrega do projeto no prazo
estabelecido.

      Para obtermos um controle mais organizado das tarefas a serem realizadas,
assim como prazos e andamento geral do projeto, utilizamos o aplicativo trello para
criar um modelo Kanban para nosso projeto, onde separamos cada etapa de
desenvolvimento em colunas com cartões representando as tarefas necessária a
serem realizadas, juntamente com suas especificações e um prazo pré
estabelecido, juntamente com uma comunicação dinâmica onde cada membro
adicionava frequentemente atualizações sobre o projeto, tornando assim muito mais
fluido o organizado o andamento do projeto.


![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460109/0722080a-d6d5-492f-902f-ca00f3286e39)


![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460109/f4c89a40-8361-46ea-9453-0a01436427f0)


# Como Jogar 🎮
**Página de Login:** Faça login para começar a jogar.  
**Menu Principal:** Escolha entre iniciar um novo jogo ou fazer logout.  
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
git clone https://github.com/_seu-usuario/nome-do-game_.git  


**2 -** Navegue até o diretório do projeto:

![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/ec26bb0b-1c60-4874-891e-76897a07ce04)
cd _seurepositorio_


**3 -** Instale as dependências:

![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/2380120d-c752-4039-8f69-8ac081718624)
npm install  


# Desenvolvimento
Para rodar o aplicativo em modo de desenvolvimento:

![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/5eb3be5a-745b-4ba6-965d-7a148d27da2a)
npm start  


# Construção
Para criar os executáveis para todas as plataformas:

**1 -** Instale o Electron Builder:

![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/a692ec92-885c-4d73-ad6a-263e0c933878)

npm install --save-dev electron-builder


**2 -** Execute o seguinte comando para empacotar o aplicativo:

![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/920bb568-dfc8-4d9b-98a5-e766ab34b4cd)

npm run build



_Isso criará executáveis para macOS, Linux e Windows no diretório dist._  

_Executando os Executáveis_  
**macOS:** Navegue até dist/mac e abra BlackjackGame.app.
**Linux:** Navegue até dist/linux-unpacked e execute ./BlackjackGame.
**Windows:** Navegue até dist/win-unpacked e execute BlackjackGame.exe.

# Estrutura do Projeto 📂
![image](https://github.com/brunogkonzen/All-Paradise-In/assets/129460092/e780d4e7-a113-4cae-870a-6b22aaa8f02a)
  

# Licença 📄
Este projeto está licenciado sob a MIT License.

# Agradecimentos 🙌
Agradecemos ao prof. Roberson (antes coordenador) e a prof. Fran (agora coordenadora)! Espero que se divirtam jogando tanto quanto eu e Arthur nos divertimos desenvolvendo.

# Capturas de Tela 

# Menu Principal

# Jogo

