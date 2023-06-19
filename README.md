Game simples que explora o javascript como linguagem de programação para jogo interativo usando como biblioteca o [Phaser](https://phaser.io)
Título: Jogo de Exploração de Frutopia

Aqui está um caso de uso em texto plano para o jogo proposto:

Cenário: Rua de Frutopia

O jogador pode comprar frutas, controlar o personagem e explorar o ambiente da rua.

Descrição:
1. O jogador controla um personagem humanoide  (🧍) que pode se movimentar pela rua de Frutopia.
2. O jogador encontra outro personagem humanoide NPC (🧍‍♀️) na rua.
3. Quando o personagem azul se aproxima do personagem vermelho, uma caixa de diálogo é exibida.
4. Na caixa de diálogo, o personagem vermelho pergunta ao jogador: "O que você quer comprar?".
5. O jogador pode escolher entre comprar bananas ou maçãs.
6. O jogador pode escolher a opção "Não quero nada mais" para não comprar nada.
7. Se o jogador escolher comprar, o valor das frutas é abatido dos 500 dinheiros que o jogador possui.
8. O jogador pode usar as teclas do teclado (1 para bananas, 2 para maçãs e 3 para não comprar nada) como atalhos para escolher as opções.
9. O jogo exibe o quanto de dinheiro o jogador possui em uma barra superior fixa.
10. O jogo exibe o inventário do jogador, indicando quantas bananas e maçãs o jogador possui na mochila.
11. O jogo exibe uma caixa de log no rodapé do jogo para exibir mensagens, como a compra de frutas.
12. Se o jogador sair da área da loja, a caixa de diálogo é fechada.
13. O jogador pode interagir com outros elementos do cenário, como se movimentar pela rua.

`game.js` contém o código do jogo.
