import Arma from "./Arma.js";
import Armadura from "./Armadura.js";
import Item from "./Item.js";
 
let dadosEquip = null;
let dadosItens = null;
 
export async function carregarDados() {
    const respEquip = await fetch(".dados/equipamentos.json");
    if (!respEquip.ok) throw new Error("Erro ao carregar equipamentos.json");
    dadosEquip = await respEquip.json();
    
    const respItens = await fetch(".dados/itens.json");
    if (!respItens.ok) throw new Error("Erro ao carregar itens.json");
    dadosItens = await respItens.json();
}
 
export function criarArma(id) {
    const data = dadosEquip.armas[id];
    if (!data) return null;
 
    return new Arma( data.nome, data.bonus);
}
 
export function criarArmadura(id) {
    const data = dadosEquip.armaduras[id];
    if (!data) return null;
 
    return new Armadura( data.nome, data.bonus, data.slot);
}
 
export function criarItem(id) {
    const data = dadosItens.itens[id];
    if (!data) return null;
 
    return new Item(
    id,
    data.nome,
    data.tipo,
    data.efeito,
    data.bonus
    
    );
 }
