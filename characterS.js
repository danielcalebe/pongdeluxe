


//selecionar personagens e 'inseri-los' no jogo



var wid = '150%'
//Musica de fundo
var zelda = document.getElementById("zelda");

function som(){

    zelda.pause()
}
function somd(){
    zelda.play()
}

//inserindo os personagens no jogo e definindo sua posição e localização
//escondendo e exibindo corpos
function luigi(){

    const imagem=  document.querySelector('.imagem')
    imagem.style.display = 'block'
    imagem.style.marginTop = '200px'
    imagem.style.marginLeft = '200px'
    imagem.style.width = 'wid'
    const corpo2=  document.querySelector('.corpo2')
    corpo2.style.display = 'flex'

    const corpo=  document.querySelector('.corpo')
    corpo.style.display = 'none'

    document.getElementById('resultado1').innerHTML = 'C. Iwakami'
   
    var go = getElementById('go')

}
function mario(){

    const imagem=  document.querySelector('.imagem2')
    imagem.style.display = 'block'
    
    imagem.style.marginTop = '200px'
    imagem.style.marginLeft = '200px'

    const corpo2=  document.querySelector('.corpo2')
    corpo2.style.display = 'flex'

    const corpo=  document.querySelector('.corpo')
    corpo.style.display = 'none'


    document.getElementById('resultado1').innerHTML = 'Will'
    var go = getElementById('go2')
}

function yoshi(){

    const imagem=  document.querySelector('.imagem3')
    imagem.style.display = 'block'
    
    imagem.style.marginTop = '200px'
    imagem.style.marginLeft = '200px'

    const corpo2=  document.querySelector('.corpo2')
    corpo2.style.display = 'flex'

    const corpo=  document.querySelector('.corpo')
    corpo.style.display = 'none'

    document.getElementById('resultado1').innerHTML = 'R. Mourão'
    var go = getElementById('go3')
}
function marcel(){

    const imagem=  document.querySelector('.imagem7')
    imagem.style.display = 'block'
    
    imagem.style.marginTop = '200px'
    imagem.style.marginLeft = '200px'

    const corpo2=  document.querySelector('.corpo2')
    corpo2.style.display = 'flex'

    const corpo=  document.querySelector('.corpo')
    corpo.style.display = 'none'

    document.getElementById('resultado1').innerHTML = 'Marcel'
    var go = getElementById('go4')
}




function luigi2(){

    const imagema=  document.querySelector('.imagem4')
    imagema.style.display = 'block'
    imagema.style.marginLeft = '80.5%'
    imagema.style.marginTop = '200px'

    const corpo3=  document.querySelector('.corpo3')
    corpo3.style.display = 'block'
    zelda.play();

    document.getElementById('resultado2').innerHTML = 'C. Iwakami'

    const corpo2 =  document.querySelector('.corpo2')
    corpo2.style.display ='none'
    const corpo =  document.querySelector('.corpo')
    corpo.style.display ='none'
    var go = getElementById('go5')
}

function mario2(){

    const imagema=  document.querySelector('.imagem5')
    imagema.style.display = 'block'
    imagema.style.marginLeft = '80.5%'
    imagema.style.marginTop = '200px'

    const corpo3=  document.querySelector('.corpo3')
    corpo3.style.display = 'block'
    zelda.play();

    document.getElementById('resultado2').innerHTML = 'Will'

    const corpo2 =  document.querySelector('.corpo2')
    corpo2.style.display ='none'
    const corpo =  document.querySelector('.corpo')
    corpo.style.display ='none'
    var go = getElementById('go6')
}

function yoshi2(){

    const imagema=  document.querySelector('.imagem6')
    imagema.style.display = 'block'
    imagema.style.marginLeft = '80.5%'
    imagema.style.marginTop = '200px'

    const corpo3=  document.querySelector('.corpo3')
    corpo3.style.display = 'block'
    zelda.play();

    document.getElementById('resultado2').innerHTML = 'R. Mourão'

    const corpo2 =  document.querySelector('.corpo2')
    corpo2.style.display ='none'
    const corpo =  document.querySelector('.corpo')
    corpo.style.display ='none'
    var go = getElementById('go7')
    poha()
   
}
function marcel2(){

    const imagema=  document.querySelector('.imagem8')
    imagema.style.display = 'block'
    imagema.style.marginLeft = '80.5%'
    imagema.style.marginTop = '200px'

    const corpo3=  document.querySelector('.corpo3')
    corpo3.style.display = 'block'
    zelda.play();

    document.getElementById('resultado2').innerHTML = 'Marcel'

    const corpo2 =  document.querySelector('.corpo2')
    corpo2.style.display ='none'
    const corpo =  document.querySelector('.corpo')
    corpo.style.display ='none'
    var go = getElementById('go8')
   
}


//fim da definição de persongens


//confirma personagens
function Nao(){
    location.reload()
}

function Sim(){
   
    
         inicializa()
         
}

//inicia

function inicializa(){
   
    const corpo=  document.querySelector('.corpo')
    corpo.style.display = 'none'
    const corpo2=  document.querySelector('.corpo2')
    corpo2.style.display = 'none'
    const corpo3=  document.querySelector('.corpo3')
    corpo3.style.display = 'none'

    const l = document.querySelector('.l')
    l.style.display = 'block'
    
    const bod = document.querySelector('body')
    bod.style.backgroundColor ='ghostwhite'
    
 

}

