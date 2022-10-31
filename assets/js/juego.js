/*
2C=2 de clubs
2D= 2 de diamonds
2h= heart
2s= spades
*/

let deck=[]; //baraja
const tipos=['C','D','H','S'];
const especiales=['A','J','Q','K'];
const crearDeck=()=>{
    for(let i=2;i<=10;i++){
        for(let tipo of tipos)
           deck.push(i+tipo);
    }

    for(let tipo of tipos){
        for(let especial of especiales)
            deck.push(especial+tipo);
    }


   deck= _.shuffle(deck);
    
}


crearDeck();
// funncion que regresa una carta
//la ultimma carta del arreglo es la que voy a quitar
const pedirCarta=()=> (deck.length!=0)?deck.pop():null;

//
/*const valorCarta=(carta)=>isNaN(carta.substring(0,carta.length-1))
                                ? ((carta.substring(0,carta.length-1)==='A')
                                            ?11
                                            :10)
                                :(carta.substring(0,carta.length-1)*1);


*/

const valorCarta=(carta)=>{
    let valor=carta.substring(0,carta.length-1);
    return isNaN(valor)? ((valor==='A')
                            ?11
                            :10)
                        :(valor*1);
}


//turno de la computadora
let puntosComputadora=0;
const divCartasComputadora=document.querySelector('#computadora-cartas');
const turnoComputadora=(puntosMinimos)=>{
   
    do{
        const carta=pedirCarta();
        puntosComputadora+=valorCarta(carta);// poner la sumatoria en el small
        console.log(`valor carta ${valorCarta(carta)}`);
        console.log(puntosComputadora);
        smalls[1].innerText=puntosComputadora;
        //hacer q aparezcan las cartas
        const imgCompu=document.createElement('img');
        imgCompu.src=`../assets/cartas/${carta}.png`;
        imgCompu.classList.add("carta");
        divCartasComputadora.append(imgCompu);
        if(puntosMinimos>21)
             break;
    }while((puntosComputadora<puntosMinimos) && (puntosMinimos<21));
}

//referencias a los elementos del html
const btnDetener=document.querySelector("#btnDetener");
const btnPedir=document.querySelector("#btnPedir");
const smalls=document.querySelectorAll('small');
const divCartasJugador=document.querySelector('#jugador-cartas');
const contenedorCartasJ=document.querySelector('#contenedorCartasJ');
let puntosJugador=0;
let putosComputadora;
let cartasJugador=[pedirCarta(),pedirCarta()];
if((cartasJugador[0].substring(0,carta.length-1)==='A' &&
   cartasJugador[1].substring(0,carta.length-1)==='K')||
   (cartasJugador[1].substring(0,carta.length-1)==='A' &&
   cartasJugador[0].substring(0,carta.length-1)==='K')
   )
    ganaJugador();


// EVENTOS
btnPedir.addEventListener('click',()=>{
    
    const carta=pedirCarta();
    puntosJugador+=valorCarta(carta);// poner la sumatoria en el small
    console.log(`valor carta ${valorCarta(carta)}`);
    console.log(puntosJugador);
    smalls[0].innerText=puntosJugador;
    //hacer q aparezcan las cartas
    const imgJugador=document.createElement('img');
    imgJugador.src=`../assets/cartas/${carta}.png`;
    imgJugador.classList.add("carta");
    divCartasJugador.append(imgJugador);
 if(puntosJugador>=21)
    perder();

    if(puntosJugador==21){
       console.warn('21,genial');
       btnPedir.disabled=true; 
       btnDetener.disabled=true;
      turnoComputadora(puntosJugador);    
    }

});



btnDetener.addEventListener('click',()=>{
    btnDetener.disabled=true;
    btnPedir.disabled=true;
    turnoComputadora(puntosJugador);
})


//implementar ganaJugador y perder