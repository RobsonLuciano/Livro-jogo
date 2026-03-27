import Game from "./js/Game.js";
import UI from "./js/UI.js";
 
 // referências globais do DOM
 const texto = document.getElementById("texto");
 const refBtn = document.getElementById("refBtn");
 const menu = document.getElementById("menu");
 
 
 // inicializa UI
 UI.init({ texto, menu, refBtn });
 
 // inicializa jogo
 const game = new Game(UI);
 
 // começa no menu inicial
 game.iniciar();