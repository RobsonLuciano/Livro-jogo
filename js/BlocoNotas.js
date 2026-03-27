const MAX_NOTAS = 10;
function BlocoNotas() {
        this.notas = [];
    }
    
    // Mostrar anotações
    BlocoNotas.prototype.getNotas = function () {
        return this.notas;
    };
    
    // Anotar
    BlocoNotas.prototype.anotar = function (texto) {
        if (this.notas.length >= MAX_NOTAS) {
        return false;
    }
    
    this.notas.push(texto);
        return true;
    };
    
    // Remover
    BlocoNotas.prototype.remover = function (indice) {
        if (this.notas.length === 0) {
        return false; // não há o que remover
    }
    
    if (indice < 0 || indice >= this.notas.length) {
        return false; // índice inválido
    }
    
    this.notas.splice(indice, 1);
        return true; // remoção bem-sucedida
    };
export default BlocoNotas;