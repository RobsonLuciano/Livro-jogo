# Aventuras em Tandanun — O Enigma das Ervas Antigas

Projeto de livro-jogo digital desenvolvido em JavaScript puro, inspirado nos clássicos *Fighting Fantasy*, RPG Maker e RPGs narrativos de fantasia.

O jogo faz parte do universo **Tandanun**, um mundo de fantasia ambientado em tempos imemoriais, durante o surgimento das primeiras civilizações após a reconstrução do mundo.

---

## 📖 Sobre o Projeto

**Aventuras em Tandanun — O Enigma das Ervas Antigas** é um RPG narrativo interativo onde o jogador toma decisões, administra recursos e enfrenta combates baseados em atributos.

O projeto foi desenvolvido com foco em:

* arquitetura orientada a dados (Data-Driven Design)
* separação entre lógica, interface e conteúdo
* expansão futura do universo Tandanun

---

## ⚙️ Tecnologias Utilizadas

* HTML5
* CSS3
* JavaScript (ES Modules)
* JSON para dados do jogo
* Manipulação direta do DOM (sem frameworks)

---

## 🧩 Funcionalidades Atuais

* Sistema de personagem com atributos
* Inventário e provisões
* Equipamentos com bônus dinâmicos
* Sistema de itens consumíveis
* Invocação de monstros via JSON
* Combate baseado em rolagens de dados (d6 / d12)
* Bloco de notas do jogador
* Interface modular (UI separada da lógica)

---

## 🗂 Estrutura do Projeto

```
/
├── index.html
├── style.css
├── main.js
│
├── js/
|   ├── Arma.js
|   ├── Armadura.js
|   ├── blocoNotas.js
|   ├── D6_D12.js
|   ├── Equipamentos.js
|   ├── fabricaEquipamentos.js
│   ├── Game.js
|   ├── Heroi.js
│   ├── Inventario.js
│   ├── invocarMonstro.js
│   ├── Itens.js
│   ├── Monstro.js
│   └── UI.js
│
└── dados/
    ├── equipamentos.json
    ├── itens.json
    └── monstros.json
```

---

## ▶️ Como Executar o Projeto

Devido ao uso de `fetch()` para carregar arquivos JSON, o projeto precisa ser executado em um servidor local.

### Opção 1 — VS Code (Recomendado)

1. Instale a extensão **Live Server**
2. Clique com botão direito em `index.html`
3. Selecione **Open with Live Server**

---

### Opção 2 — Node.js

```bash
npx serve
```

ou

```bash
python -m http.server
```

Depois abra no navegador:

```
http://localhost:3000
```

(ou porta exibida no terminal)

---

## 🧠 Arquitetura

O projeto segue separação em três camadas principais:

* **Game** → regras e fluxo do jogo
* **UI** → renderização da interface
* **Dados (JSON)** → conteúdo configurável

Essa abordagem permite expandir o jogo sem alterar a lógica principal.

---

## 🚧 Roadmap (Planejado)

* Sistema universal de eventos narrativos
* IA configurável para monstros
* Salvamento avançado
* Expansão do mundo de Tandanun
* Integração com futuros jogos e HQs do universo

---

## 👤 Autor

Robson Luciano

Projeto independente do universo **Aventuras em Tandanun**.
Blogger do projeto: https://robsonlucianoartes.blogspot.com/p/aventuras-em-tandanun.html

---

## 📜 Licença

Projeto desenvolvido para fins educacionais e autorais.
Todos os direitos reservados ao autor.
