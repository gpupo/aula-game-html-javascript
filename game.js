// Cena de Introdução
class IntroScene extends Phaser.Scene {
    constructor() {
      super('introScene');
    }
  
    create() {
      // Adicione o texto do Lore na tela
      const loreText = this.add.text(400, 300, 'Lore do Jogo\n\nNo mundo encantado de Frutopia...', {
        fontSize: '24px',
        fill: '#ffffff',
        align: 'center'
      });
      loreText.setOrigin(0.5);
  
      // Aguarde alguns segundos e depois inicie a próxima cena
      this.time.delayedCall(5000, () => {
        this.scene.start('scene1'); // Inicie a primeira cena do jogo após a introdução
      });
    }
  }
  
  // Cena 1 - Rua
  class Scene1 extends Phaser.Scene {
    constructor() {
      super('scene1');
      this.playerMoney = 5000; // Dinheiro do jogador
      this.inventory = {
        bananas: 0,
        macas: 0
      }; // Inventário do jogador
      this.inventoryText = null; // Referência ao texto do inventário
      this.logBox = null; // Caixa de log no rodapé do jogo
      this.dialogBox = null; // Caixa de diálogo
    }
  
    preload() {}
  
    create() {
      // Adicione o personagem azul à cena usando um emoji
      this.character = this.add.text(50, 50, '🧍', { fontSize: '32px' });
  
      // Adicione o personagem vermelho à cena usando um emoji
      this.npc = this.add.text(400, 300, '🧍‍♀️', { fontSize: '32px' });
      this.npc.setInteractive(); // Permite interação com o personagem vermelho
  
      // Adicione um evento de clique no personagem vermelho
      this.npc.on('pointerdown', this.startDialog, this);
  
      // Exiba a barra superior fixa com o dinheiro e o inventário
      this.createFixedBar();
  
      // Defina as teclas de atalho para as frutas e a opção de não querer nada
      this.input.keyboard.on('keydown', this.handleShortcutKeys, this);
  
      // Adicione a área que representa a loja
      this.storeArea = this.add.rectangle(400, 300, 200, 200, 0x00ff00, 0.3);
  
      // Crie a caixa de log no rodapé do jogo
      this.logBox = this.add.graphics();
      this.logBox.fillStyle(0x000000, 0.8);
      this.logBox.fillRect(0, 550, this.sys.game.config.width, 50);
    }
  
    createFixedBar() {
      // Crie uma barra superior fixa
      const bar = this.add.graphics();
      bar.fillStyle(0x000000, 0.8);
      bar.fillRect(0, 0, this.sys.game.config.width, 50);
  
      // Adicione o texto do dinheiro à barra superior
      this.moneyText = this.add.text(20, 15, 'Dinheiro: ' + this.playerMoney, {
        fontSize: '24px',
        fill: '#ffffff'
      });
  
      // Adicione o texto do inventário à barra superior
      this.inventoryText = this.add.text(220, 15, '🎒 Mochila: 🍌 ' + this.inventory.bananas + ' 🍎 ' + this.inventory.macas, {
        fontSize: '24px',
        fill: '#ffffff'
      });
      //TODO: A contabilidade de maçãs não está funcionando
    }
  
    startDialog() {
      // Verifique se o personagem azul está dentro da área da loja
      if (!Phaser.Geom.Rectangle.ContainsPoint(this.storeArea.getBounds(), this.character.getBounds())) {
        return;
      }
  
      // Pare o personagem azul
      this.character.setTint(0xff0000);
  

    
      // Crie uma caixa de diálogo
      this.dialogBox = this.add.graphics();
      this.dialogBox.fillStyle(0x000000, 0.8);
      this.dialogBox.fillRect(100, 100, 600, 200);
  
      //TODO: acrescentar saudações do NPC
      // Adicione texto à caixa de diálogo
      this.dialogText = this.add.text(150, 150, 'O que você quer comprar?\nDinheiro: ' + this.playerMoney, {
        fontSize: '24px',
        fill: '#ffffff'
      });
  
      // Adicione as opções de compra usando emojis
      this.option1 = this.add.text(150, 200, '🍌 Bananas (50)', { fontSize: '24px', fill: '#ffffff' });
      this.option2 = this.add.text(150, 250, '🍎 Maçãs (100)', { fontSize: '24px', fill: '#ffffff' });
      this.option3 = this.add.text(150, 300, '❌ Não quero nada mais', { fontSize: '24px', fill: '#ffffff' });
      //TODO: Não quero nada mais não está fechando o dialogo.
  
      // Permita interação com as opções de compra
      this.option1.setInteractive();
      this.option2.setInteractive();
      this.option3.setInteractive();
  
      // Adicione eventos de clique às opções de compra
      this.option1.on('pointerdown', () => this.buyItem('Bananas', 50), this);
      this.option2.on('pointerdown', () => this.buyItem('Maçãs', 100), this);
      this.option3.on('pointerdown', this.closeDialog, this);
    }
  
    buyItem(item, price) {
      // Verifique se o jogador tem dinheiro suficiente
      if (this.playerMoney >= price) {
        console.log('Opção selecionada: ' + item);
        this.playerMoney -= price; // Abate o valor das frutas do dinheiro do jogador
        console.log('Dinheiro restante: ' + this.playerMoney);
  
        // Atualize o dinheiro na barra superior
        this.moneyText.setText('Dinheiro: ' + this.playerMoney);
  
        // Atualize o inventário
        this.inventory[item.toLowerCase()]++;
        this.updateInventoryText();
  
        // Exiba a mensagem de compra na caixa de log
        this.logMessage('Você comprou ' + item);
      } else {
        console.log('Você não tem dinheiro suficiente para comprar ' + item);
      }
    }
  
    updateInventoryText() {
      // Atualize o texto do inventário com a quantidade de frutas
      this.inventoryText.setText(
        '🎒 Mochila: 🍌 ' + this.inventory.bananas + ' 🍎 ' + this.inventory.macas
      );
    }
  
    closeDialog() {
        //TODO: A caixa de dialogo que não está fechando ao sair da area da loja deve fechar
        console.log("Fecha a caixa de diálogo")
      // Retome o personagem azul
      this.character.clearTint();
        
      // Remova a caixa de diálogo e as opções
      if (this.dialogBox) {
        this.dialogBox.clear();
      
      }

      if (this.dialogText) {
      this.dialogText.destroy();
      this.option1.destroy();
      this.option2.destroy();
      this.option3.destroy();
      }
  
    }
  
    handleShortcutKeys(event) {
      if (event.key === '1') {
        this.buyItem('Bananas', 50);
      } else if (event.key === '2') {
        this.buyItem('Maçãs', 100);
      } else if (event.key === '3') {
        this.closeDialog();
      }
    }
  
    logMessage(message) {
      const logText = this.add.text(20, 570, message, {
        fontSize: '18px',
        fill: '#ffffff'
      });
      logText.setAlpha(0);
  
      this.tweens.add({
        targets: logText,
        alpha: 1,
        duration: 500,
        ease: 'Linear',
        delay: 0,
        yoyo: true,
        repeat: 0,
        onComplete: () => {
          logText.destroy();
        }
      });
    }
  
    update() {
      // Movimente o personagem azul com as teclas de seta
      const cursorKeys = this.input.keyboard.createCursorKeys();
      if (cursorKeys.left.isDown) {
        this.character.x -= 5;
      } else if (cursorKeys.right.isDown) {
        this.character.x += 5;
      } else if (cursorKeys.up.isDown) {
        this.character.y -= 5;
      } else if (cursorKeys.down.isDown) {
        this.character.y += 5;
      }
  
      // Verifique se o personagem azul está dentro da área da loja
      if (!Phaser.Geom.Rectangle.ContainsPoint(this.storeArea.getBounds(), this.character.getBounds())) {
        this.closeDialog();
      }
  
      // Verifique a proximidade entre os personagens
      const distance = Phaser.Math.Distance.Between(this.character.x, this.character.y, this.npc.x, this.npc.y);
      if (distance < 150) {
        this.startDialog();
      }
      else if (distance > 200 && distance < 220 && this.dialogBox)  {
        this.closeDialog();
      }
    }
  }
  
  // Configuração do jogo
  const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [IntroScene, Scene1] // Inclua a cena de introdução e a primeira cena do jogo
  };
  
  // Inicialização do jogo
  window.addEventListener('DOMContentLoaded', () => {
    const game = new Phaser.Game(config);
  });
  