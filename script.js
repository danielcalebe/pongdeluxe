


const somComer = document.getElementById("somComer");
const somColisao = document.getElementById("somColisao");

// Variaveis globais
var DIRECTION = {
    IDLE: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
    UP2: 5,
    DOWN2: 6,
   
};
 
var rounds = [5, 5, 3, 3, 2];
var colors = ['#1abc9c', '#2ecc71', '#3498db', '#8c52ff', '#9b59b6'];

//O objeto da bola (The cube that bounces back and forth)
var Ball = {
    new: function (incrementedSpeed) {
        return {
            width: 18,
            height: 18,
            x: (this.canvas.width / 2) - 9,
            y: (this.canvas.height / 2) - 9,
            moveX: DIRECTION.IDLE,
            moveY: DIRECTION.IDLE,
            speed: incrementedSpeed || 15
        };
    }
};
 
// O objeto do jogador a direita da tela = Ai
var Ai = {
    new: function (side) {
        return {
            width: 18,
            height: 180,
            x: side === 'left' ? 150 : this.canvas.width - 150,
            y: (this.canvas.height / 2) - 35,
            score:  0,
            move: DIRECTION.IDLE,
            speed: 15,
            roundsiai: 0,
            roundsplayer:0,
           
        };
    }
};

  //Inicio do jogo, dinânimica e definição de valores      
var Game = {
    initialize: function () {
       
        
        
        this.canvas = document.querySelector('canvas');
        this.context = this.canvas.getContext('2d');



        this.canvas.width = 1400;
        this.canvas.height = 1000;

  
 
        this.canvas.style.width = (this.canvas.width / 2) + 'px';
        this.canvas.style.height = (this.canvas.height / 2) + 'px';
        
        
        
        this.player = Ai.new.call(this, 'left');
        this.ai = Ai.new.call(this, 'right');
        this.ball = Ball.new.call(this);
 
        
        this.running = this.over = false;
        this.turn = this.ai;
        this.timer = this.round = 0;
        this.color = '#015CA5';
        
 
        Pong.menu();
        Pong.listen();

        
    },


  
 
    endGameMenu: function (text) {
        // mudando a fonte e cor de fonte do canvas
       
        
        Pong.context.font = '45px Courier New';
        Pong.context.fillStyle = this.color;
 
        //Desenhando o retângulo escrito 'Press any key to begin' text.
        Pong.context.fillRect(
            Pong.canvas.width / 2 - 350,
            Pong.canvas.height / 2 - 48,
            700,
            100
        );
 
        //mudando a cor do canvas ;
        Pong.context.fillStyle = '#ffffff';
        
 
        // Desenhando o menu de end game ('Right win' e 'Left win')
        Pong.context.fillText(text,
            Pong.canvas.width / 2,
            Pong.canvas.height / 2 + 15
        );
    
 

       
        setTimeout(function () {
            Pong = Object.assign({}, Game);
            Pong.initialize();
        }, 3000);
       
    },

 
    menu: function () {
        //Desenhando os objetos pong nos seu estado atual
        Pong.draw();
 
        // Change the canvas font size and color
        this.context.font = '50px Courier New';
        this.context.fillStyle = this.color;
 
        //Desenhando o retângulo escrito 'Press any key to begin' .
        this.context.fillRect(
            this.canvas.width / 2 - 350,
            this.canvas.height / 2 - 48,
            700,
            100
        );
 
        //Mudando a cor d canvas
        this.context.fillStyle = '#ffffff';
 
        // colocando o texto 'press any key to begin' 
        this.context.fillText('Press any key to begin',
            this.canvas.width / 2,
            this.canvas.height / 2 + 15
        );
    },
 
    // Atualizando os movimentos (mover o jogador, jogador2, bola, score, etc.)
    update: function () {
        if (!this.over) {
            // limites na cordernada x e y para não atravessar o gameboard
            if (this.ball.x <= 0) Pong._resetTurn.call(this, this.ai, this.player);
            if (this.ball.x >= this.canvas.width - this.ball.width) Pong._resetTurn.call(this, this.player, this.ai);
            if (this.ball.y <= 0) this.ball.moveY = DIRECTION.DOWN;
            if (this.ball.y >= this.canvas.height - this.ball.height) this.ball.moveY = DIRECTION.UP;
 
            // mudar valor do player de acordo com a leitura de eventos no teclado
            if (this.player.move === DIRECTION.UP) this.player.y -= this.player.speed;
            else if (this.player.move === DIRECTION.DOWN) this.player.y += this.player.speed;
               //  // mudar valor do ai de acordo com a leitura de eventos no teclado
               if (this.ai.move === DIRECTION.UP) this.ai.y -= this.ai.speed;
               else if (this.ai.move === DIRECTION.DOWN) this.ai.y += this.ai.speed;
   

            // em um novo saque (início de cada turno) mova a bola para o lado correto
            //Aleatorizar a direção para adicionar algum desafio.
            if (Pong._turnDelayIsOver.call(this) && this.turn) {
                this.ball.moveX = this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT;
                this.ball.moveY = [DIRECTION.UP, DIRECTION.DOWN][Math.round(Math.random())];
                this.ball.y = Math.floor(Math.random() * this.canvas.height - 200) + 200;
                this.turn = null;
            
            }
 
            //  Se o jogador colidir com os limites vinculados, atualize os coords x e y.
            if (this.player.y <= 0) this.player.y = 0;
            else if (this.player.y >= (this.canvas.height - this.player.height)) this.player.y = (this.canvas.height - this.player.height);
            
        
            // Mover bola na direção pretendida com base nos valores moveY e moveX
            if (this.ball.moveY === DIRECTION.UP) this.ball.y -= (this.ball.speed / 1.5);
            else if (this.ball.moveY === DIRECTION.DOWN) this.ball.y += (this.ball.speed / 1.5);
            if (this.ball.moveX === DIRECTION.LEFT) this.ball.x -= this.ball.speed;
            else if (this.ball.moveX === DIRECTION.RIGHT) this.ball.x += this.ball.speed;
 
          
 
            // Lidar com a colisão de parede ai (AI)
            if (this.ai.y >= this.canvas.height - this.ai.height) this.ai.y = this.canvas.height - this.ai.height ;
            else if (this.ai.y <= 0) this.ai.y = 0;
 

            //  Lidar com a colisão de parede ai (player)
            if (this.ball.x - this.ball.width <= this.player.x && this.ball.x >= this.player.x - this.player.width) {
              
                if (this.ball.y <= this.player.y + this.player.height && this.ball.y + this.ball.height >= this.player.y) {
                    somComer.play();
                    this.ball.x = (this.player.x + this.ball.width);
                    this.ball.moveX = DIRECTION.RIGHT;
 
                }
            }
 
            // Lidar com a colisão ai-ball
            if (this.ball.x - this.ball.width <= this.ai.x && this.ball.x >= this.ai.x - this.ai.width) {
                
                if (this.ball.y <= this.ai.y + this.ai.height && this.ball.y + this.ball.height >= this.ai.y) {
                    somComer.play();
                    this.ball.x = (this.ai.x - this.ball.width);
                    this.ball.moveX = DIRECTION.LEFT;
 
                }
            }
        }
 
        // Lidar com o fim da transição de rodada
        // Verifique se o jogador ganhou a rodada.
        if (this.player.score === rounds[this.round]) {
            // Verifique se restam mais rodadas/níveis e exiba a tela de vitória se
            // não há
            if (!rounds[this.round + 1]){
                zelda.pause()
                go.play()
                this.over = true;

                if (this.player.roundsplayer < 3){
                    setTimeout(function () { Pong.endGameMenu('Right Win'); }, 1000);
                }
                else{
                    setTimeout(function () { Pong.endGameMenu('Left Win'); }, 1000);
                }
                
               
            } else {
                // Se houver outra rodada, redefina todos os valores e incremente o número ao round.
                this.color = this._generateRoundColor();
                this.player.score = this.ai.score = 0;
                this.player.speed += 0.5;
                this.ai.speed += 1;
                this.ball.speed += 1;
                this.round += 1;
                this.player.roundsplayer  += 1;
 
            }
       
    
    

            
        }
        //IA
        if (this.ai.score === rounds[this.round]) {
            // Verifique se restam mais rodadas/níveis e exiba a tela de vitória se
            // não há
            
            if (!rounds[this.round + 1]) {
                zelda.pause()
                go.play()
                this.over = true;
                if (this.player.roundsplayer > 2){
                    setTimeout(function () { Pong.endGameMenu('Left Win'); }, 1000);
                }
                else{
                    setTimeout(function () { Pong.endGameMenu('Right Win'); }, 1000);
                }
        
            } else {
                // Se houver outra rodada, redefina todos os valores e incremente o número redondo.
                this.color = this._generateRoundColor();
                this.ai.score = this.player.score = 0 ;
             
                this.ai.speed += 0.5;
                this.player.speed += 1;
                this.ball.speed += 1;
                this.round += 1;
                this.ai.roundsiai  += 1;
 
               
            }
          
    
    
        }
      
       
    },

    




 
    // Desenhar os objetos no elemento canvas
    draw: function () {
        // Clear the Canvas
        this.context.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
 
        // Definir o estilo de preenchimento como preto
        this.context.fillStyle = this.color;
 
        // desenhando o fundi
        this.context.fillRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
 
        //   Defina o estilo de preenchimento como branco (Para as pás e a bola)
        this.context.fillStyle = '#ffffff';
 
        // Desenhe o jogador
        this.context.fillRect(
            this.player.x,
            this.player.y,
            this.player.width,
            this.player.height
        );
 
        // Desenhe o Ai
        this.context.fillRect(
            this.ai.x,
            this.ai.y,
            this.ai.width,
            this.ai.height 
        );
 
        // Desenhe a bola
        if (Pong._turnDelayIsOver.call(this)) {
            this.context.fillRect(
                this.ball.x,
                this.ball.y,
                this.ball.width,
                this.ball.height
            );
        }
 
        // DDesenhe a rede (Linha no meio)
        this.context.beginPath();
        this.context.setLineDash([7, 15]);
        this.context.moveTo((this.canvas.width / 2), this.canvas.height - 140);
        this.context.lineTo((this.canvas.width / 2), 140);
        this.context.lineWidth = 10;
        this.context.strokeStyle = '#ffffff';
        this.context.stroke();
 
        // Definir a fonte de tela padrão e alinhá-la ao centro
        this.context.font = '100px Courier New';
        this.context.textAlign = 'center';
 
        // Desenhar a pontuação do jogador (esquerda)
        this.context.fillText(
            this.player.score.toString(),
            (this.canvas.width / 2) - 300,
            200
        );
        // Desenhe o placar ai (à direita)
        this.context.fillText(
            this.ai.score.toString(),
            (this.canvas.width / 2) + 300,
            200
        );
        //fonte mudando
        this.context.font = '200px Courier New';
        
        // Sorteie as rodadas dos jogadores (à direita)
        this.context.fillText(
            this.player.roundsplayer.toString(),
            (this.canvas.width / 2) - 600,
            200
        );
        // Desenhe as rodadas ai (à direita)
        this.context.fillText(
            this.ai.roundsiai.toString(),
            (this.canvas.width / 2) + 620,
            200
        );



 
        //         Alterar o tamanho da fonte do texto da pontuação central
        this.context.font = '30px Courier New';
 
        // Sorteio do placar vencedor (centro) 
        this.context.fillText(
            'Round ' + (Pong.round + 1),
            (this.canvas.width / 2),
            35
        );
 
        // Alterar o tamanho da fonte para o valor da pontuação central
        this.context.font = '40px Courier';
 
        //numero de round atual
        this.context.fillText(
            rounds[Pong.round] ? rounds[Pong.round] : rounds[Pong.round - 1],
            (this.canvas.width / 2),
            100
        );
    },
 
    loop: function () {
        Pong.update();
        Pong.draw();
 
        // Se o jogo não terminar, desenhe o próximo quadro.
        if (!Pong.over) requestAnimationFrame(Pong.loop);
    },
 
    listen: function () {
        document.addEventListener('keydown', function (key) {
            // Manipule a função 'Pressione qualquer tecla para começar' e inicie o jogo.
            if (Pong.running === false) {
                Pong.running = true;
                window.requestAnimationFrame(Pong.loop);
            }
 
            //   Manipular eventos de  w key
            if (key.keyCode === 87 ) Pong.player.move = DIRECTION.UP;
 
            //   Manipular eventos de s key
            if (key.keyCode === 83) Pong.player.move = DIRECTION.DOWN;

                    //   Manipular eventos de up key  
            if (key.keyCode === 38 ) Pong.ai.move = DIRECTION.UP;
 
            // manipular eventos up key events
            if (key.keyCode === 40 ) Pong.ai.move = DIRECTION.DOWN;

        });
 
        // para movimento se não pressionado(buga)
     //  document.addEventListener('keyup', function (key) { Pong.player.move = DIRECTION.IDLE; });
       // document.addEventListener('keyup', function (key) { Pong.ai.move = DIRECTION.IDLE; });
    },
 
    // Redefina a localização da bola
    _resetTurn: function(victor, loser) {
        this.ball = Ball.new.call(this, this.ball.speed);
        this.turn = loser;
        this.timer = (new Date()).getTime();
 
        victor.score++;
    },
 
    // Espere que um atraso tenha passado após cada turno.
    _turnDelayIsOver: function() {
        return ((new Date()).getTime() - this.timer >= 1000);
    },
 
    // Selecione uma cor aleatória como plano de fundo de cada nível/rodada.
    _generateRoundColor: function () {
        var newColor = colors[Math.floor(Math.random() * colors.length)];
        if (newColor === this.color) return Pong._generateRoundColor();
        return newColor;
    }
};
 
var Pong = Object.assign({}, Game);
Pong.initialize();



