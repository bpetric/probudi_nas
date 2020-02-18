const holes = document.querySelectorAll('.hole');			//deklaracija
const scoreBoard = document.querySelector('.score');		//deklaracija
const rezultat = document.querySelector('.rezultat');		//deklaracija
const moles = document.querySelectorAll('.mole');			//deklaracija
let lastHole;												//deklaracija
let timeUp = false;											//deklaracija
let score = 0;												//deklaracija
var tekst

//funkcija koja nam daje random vrijeme za koje se slika iskociti
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
//funkcija koja odabire nasumicnu rupu iz koje ce slika iskociti
function randomHole(holes){
    const index  = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    //dio koda koji ne dozvoljava da slika iskoci sa istog mjesta dva puta
    if (hole === lastHole){
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(700, 1000); //postavljamo moguce vrijeme koje ce slika biti vani
    const hole = randomHole(holes); //dohvacamo nasumicnu rupu iz funkcije od prije
    hole.classList.add('up'); //funkcija koja pomice sliku gore nakon isteka vremena
    setTimeout(() => {
        hole.classList.remove('up'); //funkcija koja pomice sliku dolje nakon isteka vremena
        if(!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;  		//score vracamo na nulu
    timeUp = false;						//ako je vrijeme isteklo score resetiraj
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000) //vrijeme koliko ce se nasa igra odvijati
}

function wack(e){
    if(!e.isTrusted) return; 	//funkcija koja otkrica da li smo stisnuli na sliku
    score++;					//ako smo stisnuili na sliku uvecaj score za jedan
    this.parentNode.classList.remove('up'); 
    scoreBoard.textContent = score;		//ispisi score u pregledniku
	if (score > 12) {
  tekst = "Bravo!";
  rezultat.textContent = tekst;	
	}
	else if (score > 5) {
  tekst = "Moze to bolje!";
  rezultat.textContent = tekst;	
	}
	else {
  tekst = "Udri jace!";
  rezultat.textContent = tekst;	
	}

}

moles.forEach(mole => mole.addEventListener('click', wack))



