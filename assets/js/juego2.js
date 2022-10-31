

let deck=[]; //baraja
const tipos=['C','D','H','S'];
const especiales=['A','J','Q','K'];

const crearDeck=()=>{
    deck=[];
    for(let i=2;i<=10;i++){
        for(let tipo of tipos)
           deck.push(i+tipo);
    }

    for(let tipo of tipos){
        for(let especial of especiales)
            deck.push(especial+tipo);
    }


   deck= _.shuffle(deck); // lo mezclo
    
}





const valorCarta=(carta)=>{
    let valor=carta.substring(0,carta.length-1);
    return isNaN(valor)? ((valor==='A') // si no es un númemro
                            ?0  // retorno cero si es un A
                            :10)
                        :(valor*1);
}

const divCentro=document.createElement('div');
function imprimir(mensaje){
    //<div class="position-absolute top-50 start-50 translate-middle"></div>
    
    divCentro.id="dicCentro";
    divCentro.classList.add("position-absolute");   
    divCentro.classList.add('top-50');
    divCentro.classList.add('start-50');
    divCentro.classList.add('translate-middle');
    divCentro.classList.add('bg-primary');
    
    const h1Centro=document.createElement('h1');
    h1Centro.id="h1Centro";
    h1Centro.innerText=mensaje;
    divCentro.append(h1Centro);
   const padreDivCentro=document.querySelector('body');
   padreDivCentro.append(divCentro);

}

const smalls=document.querySelectorAll('small')
const pedirCarta=()=> (deck.length!=0)?deck.pop():null;
const ganaJugador=()=>"Jugador ganó";
const pierdeJugador=()=>"Jugador perdió"
const blackjack=()=>"Black jack";
//let cartasJugador=[pedirCarta(),pedirCarta()];
let puntosJugador=0;
let contadorAss=0;
let puntosCrupier=0;



function agregarImg(divId, imgsrc){
    const divPadre=document.querySelector(divId);
    const imgEtiqueta=document.createElement('img');
    imgEtiqueta.src=`../assets/cartas/${imgsrc}.png`;
    imgEtiqueta.classList.add("carta");
    divPadre.append(imgEtiqueta);
}

const pedirCartaFront=()=>{
    const carta= pedirCarta();
    agregarImg('#jugador-cartas',carta);
    if(valorCarta(carta)!=0)
        puntosJugador+=valorCarta(carta);
    else {contadorAss++;
        puntosJugador+=11;
    }
    if(puntosJugador>21){
        if(contadorAss==0){
            imprimir(pierdeJugador()); 
            btnPedir.disabled=true; 
            btnPlantarme.disabled=true;
        }
        else{
            puntosJugador-=10;            
            contadorAss--;
            if(puntosJugador>21){
                imprimir(pierdeJugador()); 
               btnPedir.disabled=true; 
               btnPlantarme.disabled=true;
            }   
        }
    }
    smalls[0].innerText=puntosJugador;
}

    let cartasCrupier=[];
    
    const divCartasCrupier=document.querySelector('#crupier-cartas');
    const divCartasJugador= document.querySelector('#jugador-cartas');
    const inicializarCrupier=()=>{  
        cartasCrupier=[];       
        cartasCrupier.push(pedirCarta());
        cartasCrupier.push(pedirCarta());
        agregarImg('#crupier-cartas',cartasCrupier[0]);
        puntosCrupier=valorCarta(cartasCrupier[0]);
        if(puntosCrupier===0)
          puntosCrupier=11;
        smalls[1].innerText=puntosCrupier;
    }    

function main(){
    crearDeck();
    inicializarCrupier();
    for(let i=0;i<2;i++){
        pedirCartaFront();    
    }
    if(puntosJugador===21)
       imprimir(blackjack());

       
}
/////////////////////////                               EVENNTOS
const btnPedir=document.querySelector("#btnPedir");
const btnPlantarme=document.querySelector("#btnPlantarme");
btnPedir.addEventListener('click',()=>{ pedirCartaFront()});
btnPlantarme.addEventListener('click',()=>{
    agregarImg('#crupier-cartas',cartasCrupier[1]);
    if(valorCarta(cartasCrupier[1])===0){
      puntosCrupier+=11;
      if(puntosCrupier>21)
        puntosCrupier-=10;
    }
    else 
       puntosCrupier+=valorCarta(cartasCrupier[1]);
     
    smalls[1].innerText=puntosCrupier;

    while(puntosCrupier<17){
        cartasCrupier.push(pedirCarta());
        agregarImg('#crupier-cartas',cartasCrupier[cartasCrupier.length-1]);
        if(valorCarta(cartasCrupier[cartasCrupier.length-1])===0){
            puntosCrupier+=11;
            if(puntosCrupier>21)
                puntosCrupier-=10;
           }
        else   
        puntosCrupier+=valorCarta(cartasCrupier[cartasCrupier.length-1]);
       
        smalls[1].innerText=puntosCrupier;
        if(puntosCrupier>21){
            imprimir(ganaJugador());
            btnPedir.disabled=true; 
               btnPlantarme.disabled=true;
             return;
            }
    }
    if(puntosJugador>puntosCrupier)
         imprimir(ganaJugador());
    else imprimir(pierdeJugador());  
    btnPedir.disabled=true; 
    btnPlantarme.disabled=true;
});



const btnNuevo=document.querySelector("#btnNuevo");
btnNuevo.addEventListener('click',()=>{
    deck=[];
    puntosCrupier=0;
    puntosJugador=0;
    btnPlantarme.disabled=false;
    btnPedir.disabled=false;
    divCartasCrupier.innerHTML="";
    divCartasJugador.innerHTML="";
    divCentro.innerHTML="";
    smalls[1].innerText="";
    smalls[0].innerText="";
    main();
})


main();