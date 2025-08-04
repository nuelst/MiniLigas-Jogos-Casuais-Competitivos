"use client"
import { useEffect, useRef } from 'react';

interface GameAssets {
  bird: {
    red: string;
    yellow: string;
    blue: string;
  };
  obstacle: {
    pipe: {
      green: {
        top: string;
        bottom: string;
      };
      red: {
        top: string;
        bottom: string;
      };
    };
  };
  scene: {
    width: number;
    background: {
      day: string;
      night: string;
    };
    ground: string;
    gameOver: string;
    restart: string;
    messageInitial: string;
  };
  scoreboard: {
    width: number;
    base: string;
    number0: string;
    number1: string;
    number2: string;
    number3: string;
    number4: string;
    number5: string;
    number6: string;
    number7: string;
    number8: string;
    number9: string;
  };
  animation: {
    bird: {
      red: {
        clapWings: string;
        stop: string;
      };
      blue: {
        clapWings: string;
        stop: string;
      };
      yellow: {
        clapWings: string;
        stop: string;
      };
    };
    ground: {
      moving: string;
      stop: string;
    };
  };
}

const assets: GameAssets = {
  bird: {
    red: 'bird-red',
    yellow: 'bird-yellow',
    blue: 'bird-blue'
  },
  obstacle: {
    pipe: {
      green: {
        top: 'pipe-green-top',
        bottom: 'pipe-green-bottom'
      },
      red: {
        top: 'pipe-red-top',
        bottom: 'pipe-red-bottom'
      }
    }
  },
  scene: {
    width: 144,
    background: {
      day: 'background-day',
      night: 'background-night'
    },
    ground: 'ground',
    gameOver: 'game-over',
    restart: 'restart-button',
    messageInitial: 'message-initial'
  },
  scoreboard: {
    width: 25,
    base: 'number',
    number0: 'number0',
    number1: 'number1',
    number2: 'number2',
    number3: 'number3',
    number4: 'number4',
    number5: 'number5',
    number6: 'number6',
    number7: 'number7',
    number8: 'number8',
    number9: 'number9'
  },
  animation: {
    bird: {
      red: {
        clapWings: 'red-clap-wings',
        stop: 'red-stop'
      },
      blue: {
        clapWings: 'blue-clap-wings',
        stop: 'blue-stop'
      },
      yellow: {
        clapWings: 'yellow-clap-wings',
        stop: 'yellow-stop'
      }
    },
    ground: {
      moving: 'moving-ground',
      stop: 'stop-ground'
    }
  }
};

export function FlipBird() {
  const gameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameRef.current) return;

    let game: Phaser.Game | null = null;
    let isGameDestroyed = false;

    const loadGame = async () => {
      if (isGameDestroyed || !gameRef.current) return;

    
      if (gameRef.current) {
        gameRef.current.innerHTML = '';
      }

      const Phaser = await import('phaser');

      if (isGameDestroyed || !gameRef.current) return;

      let gameOver = false;
      let gameStarted = false;
      let upButton: Phaser.Input.Keyboard.Key;
      let restartButton: Phaser.GameObjects.Image;
      let gameOverBanner: Phaser.GameObjects.Image;
      let messageInitial: Phaser.GameObjects.Image;
      let player: Phaser.Physics.Arcade.Sprite;
      let birdName: string;
      let framesMoveUp = 0;
      let backgroundDay: Phaser.GameObjects.Image;
      let backgroundNight: Phaser.GameObjects.Image;
      let ground: Phaser.Physics.Arcade.Sprite;
      let pipesGroup: Phaser.Physics.Arcade.Group;
      let gapsGroup: Phaser.Physics.Arcade.Group;
      let nextPipes = 0;
      let currentPipe: { top: string; bottom: string };
      let scoreboardGroup: Phaser.Physics.Arcade.StaticGroup;
      let score = 0;

      const preload = function (this: Phaser.Scene) {
        this.load.image(assets.scene.background.day, '/assets/flip-bird/background-day.png');
        this.load.image(assets.scene.background.night, '/assets/flip-bird/background-night.png');
        this.load.spritesheet(assets.scene.ground, '/assets/flip-bird/ground-sprite.png', {
          frameWidth: 336,
          frameHeight: 112
        });

        this.load.image(assets.obstacle.pipe.green.top, '/assets/flip-bird/pipe-green-top.png');
        this.load.image(assets.obstacle.pipe.green.bottom, '/assets/flip-bird/pipe-green-bottom.png');
        this.load.image(assets.obstacle.pipe.red.top, '/assets/flip-bird/pipe-red-top.png');
        this.load.image(assets.obstacle.pipe.red.bottom, '/assets/flip-bird/pipe-red-bottom.png');

        this.load.image(assets.scene.messageInitial, '/assets/flip-bird/message-initial.png');
        this.load.image(assets.scene.gameOver, '/assets/flip-bird/gameover.png');
        this.load.image(assets.scene.restart, '/assets/flip-bird/restart-button.png');

        this.load.spritesheet(assets.bird.red, '/assets/flip-bird/bird-red-sprite.png', {
          frameWidth: 34,
          frameHeight: 24
        });
        this.load.spritesheet(assets.bird.blue, '/assets/flip-bird/bird-blue-sprite.png', {
          frameWidth: 34,
          frameHeight: 24
        });
        this.load.spritesheet(assets.bird.yellow, '/assets/flip-bird/bird-yellow-sprite.png', {
          frameWidth: 34,
          frameHeight: 24
        });

        this.load.image(assets.scoreboard.number0, '/assets/flip-bird/number0.png');
        this.load.image(assets.scoreboard.number1, '/assets/flip-bird/number1.png');
        this.load.image(assets.scoreboard.number2, '/assets/flip-bird/number2.png');
        this.load.image(assets.scoreboard.number3, '/assets/flip-bird/number3.png');
        this.load.image(assets.scoreboard.number4, '/assets/flip-bird/number4.png');
        this.load.image(assets.scoreboard.number5, '/assets/flip-bird/number5.png');
        this.load.image(assets.scoreboard.number6, '/assets/flip-bird/number6.png');
        this.load.image(assets.scoreboard.number7, '/assets/flip-bird/number7.png');
        this.load.image(assets.scoreboard.number8, '/assets/flip-bird/number8.png');
        this.load.image(assets.scoreboard.number9, '/assets/flip-bird/number9.png');
      };

      const create = function (this: Phaser.Scene) {
        backgroundDay = this.add.image(assets.scene.width, 256, assets.scene.background.day).setInteractive();
        backgroundDay.on('pointerdown', moveBird);
        backgroundNight = this.add.image(assets.scene.width, 256, assets.scene.background.night).setInteractive();
        backgroundNight.visible = false;
        backgroundNight.on('pointerdown', moveBird);

        gapsGroup = this.physics.add.group();
        pipesGroup = this.physics.add.group();
        scoreboardGroup = this.physics.add.staticGroup();

        ground = this.physics.add.sprite(assets.scene.width, 458, assets.scene.ground);
        ground.setCollideWorldBounds(true);
        ground.setDepth(10);

        messageInitial = this.add.image(assets.scene.width, 156, assets.scene.messageInitial);
        messageInitial.setDepth(30);
        messageInitial.visible = false;

        upButton = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        this.anims.create({
          key: assets.animation.ground.moving,
          frames: this.anims.generateFrameNumbers(assets.scene.ground, {
            start: 0,
            end: 2
          }),
          frameRate: 15,
          repeat: -1
        });
        this.anims.create({
          key: assets.animation.ground.stop,
          frames: [{
            key: assets.scene.ground,
            frame: 0
          }],
          frameRate: 20
        });

        this.anims.create({
          key: assets.animation.bird.red.clapWings,
          frames: this.anims.generateFrameNumbers(assets.bird.red, {
            start: 0,
            end: 2
          }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: assets.animation.bird.red.stop,
          frames: [{
            key: assets.bird.red,
            frame: 1
          }],
          frameRate: 20
        });

        this.anims.create({
          key: assets.animation.bird.blue.clapWings,
          frames: this.anims.generateFrameNumbers(assets.bird.blue, {
            start: 0,
            end: 2
          }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: assets.animation.bird.blue.stop,
          frames: [{
            key: assets.bird.blue,
            frame: 1
          }],
          frameRate: 20
        });

        this.anims.create({
          key: assets.animation.bird.yellow.clapWings,
          frames: this.anims.generateFrameNumbers(assets.bird.yellow, {
            start: 0,
            end: 2
          }),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({
          key: assets.animation.bird.yellow.stop,
          frames: [{
            key: assets.bird.yellow,
            frame: 1
          }],
          frameRate: 20
        });

        prepareGame(this);

        gameOverBanner = this.add.image(assets.scene.width, 206, assets.scene.gameOver);
        gameOverBanner.setDepth(20);
        gameOverBanner.visible = false;

        restartButton = this.add.image(assets.scene.width, 300, assets.scene.restart).setInteractive();
        restartButton.on('pointerdown', restartGame);
        restartButton.setDepth(20);
        restartButton.visible = false;
      };

      const update = function (this: Phaser.Scene) {
        if (gameOver || !gameStarted) return;

        if (framesMoveUp > 0) {
          framesMoveUp--;
        } else if (Phaser.Input.Keyboard.JustDown(upButton)) {
          moveBird();
        } else {
          player.setVelocityY(120);

          if (player.angle < 90) {
            player.angle += 1;
          }
        }

        pipesGroup.children.iterate((child: Phaser.GameObjects.GameObject) => {
          if (child == undefined || !(child instanceof Phaser.Physics.Arcade.Sprite)) return true;

          if (child.x < -50) {
            child.destroy();
          } else {
            child.setVelocityX(-100);
          }
          return true;
        });

        gapsGroup.children.iterate((child: Phaser.GameObjects.GameObject) => {
          if (child && child.body) {
            (child.body as Phaser.Physics.Arcade.Body).setVelocityX(-100);
          }
          return true;
        });

        nextPipes++;
        if (nextPipes === 130) {
          makePipes(this);
          nextPipes = 0;
        }
      };

      const hitBird = function (this: Phaser.Scene) {
        this.physics.pause();

        gameOver = true;
        gameStarted = false;

        if (player) {
          player.anims.play(getAnimationBird(birdName).stop);
        }
        ground.anims.play(assets.animation.ground.stop);

        gameOverBanner.visible = true;
        restartButton.visible = true;
      };

      const updateScore = function (_: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile, gap: Phaser.Physics.Arcade.Body | Phaser.Physics.Arcade.StaticBody | Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile) {
        score++;
        if (gap && 'destroy' in gap && typeof gap.destroy === 'function') {
          gap.destroy();
        }

        if (score % 10 === 0) {
          backgroundDay.visible = !backgroundDay.visible;
          backgroundNight.visible = !backgroundNight.visible;

          if (currentPipe === assets.obstacle.pipe.green) {
            currentPipe = assets.obstacle.pipe.red;
          } else {
            currentPipe = assets.obstacle.pipe.green;
          }
        }

        updateScoreboard();
      };

      const makePipes = function (scene: Phaser.Scene) {
        if (!gameStarted || gameOver) return;

        const pipeTopY = Phaser.Math.Between(-120, 120);

        const gap = scene.add.zone(288, pipeTopY + 210, 20, 98);
        gapsGroup.add(gap);
        scene.physics.add.existing(gap);
        (gap.body as Phaser.Physics.Arcade.Body).allowGravity = false;
        gap.visible = false;

        const pipeTop = pipesGroup.create(288, pipeTopY, currentPipe.top);
        (pipeTop.body as Phaser.Physics.Arcade.Body).allowGravity = false;

        const pipeBottom = pipesGroup.create(288, pipeTopY + 420, currentPipe.bottom);
        (pipeBottom.body as Phaser.Physics.Arcade.Body).allowGravity = false;
      };

      const moveBird = function () {
        if (gameOver) return;

        if (!gameStarted) {
          const gameScene = player?.scene;
          if (gameScene) {
            startGame(gameScene);
          }
        }

        player.setVelocityY(-400);
        player.angle = -15;
        framesMoveUp = 5;
      };

      const getRandomBird = function (): string {
        switch (Phaser.Math.Between(0, 2)) {
          case 0:
            return assets.bird.red;
          case 1:
            return assets.bird.blue;
          case 2:
          default:
            return assets.bird.yellow;
        }
      };

      const getAnimationBird = function (birdColor: string) {
        switch (birdColor) {
          case assets.bird.red:
            return assets.animation.bird.red;
          case assets.bird.blue:
            return assets.animation.bird.blue;
          case assets.bird.yellow:
          default:
            return assets.animation.bird.yellow;
        }
      };

      const updateScoreboard = function () {
        scoreboardGroup.clear(true, true);

        const scoreAsString = score.toString();
        if (scoreAsString.length === 1) {
          const numberAsset = getNumberAsset(score);
          scoreboardGroup.create(assets.scene.width, 30, numberAsset).setDepth(10);
        } else {
          let initialPosition = assets.scene.width - ((score.toString().length * assets.scoreboard.width) / 2);

          for (let i = 0; i < scoreAsString.length; i++) {
            const digit = parseInt(scoreAsString[i]);
            const numberAsset = getNumberAsset(digit);
            scoreboardGroup.create(initialPosition, 30, numberAsset).setDepth(10);
            initialPosition += assets.scoreboard.width;
          }
        }
      };

      const getNumberAsset = function (digit: number): string {
        switch (digit) {
          case 0: return assets.scoreboard.number0;
          case 1: return assets.scoreboard.number1;
          case 2: return assets.scoreboard.number2;
          case 3: return assets.scoreboard.number3;
          case 4: return assets.scoreboard.number4;
          case 5: return assets.scoreboard.number5;
          case 6: return assets.scoreboard.number6;
          case 7: return assets.scoreboard.number7;
          case 8: return assets.scoreboard.number8;
          case 9: return assets.scoreboard.number9;
          default: return assets.scoreboard.number0;
        }
      };

      const restartGame = function () {
        pipesGroup.clear(true, true);
        gapsGroup.clear(true, true);
        scoreboardGroup.clear(true, true);
        player.destroy();
        gameOverBanner.visible = false;
        restartButton.visible = false;

        const gameScene = player?.scene || gapsGroup?.scene;
        if (gameScene) {
          prepareGame(gameScene);
          gameScene.physics.resume();
        }
      };

      const prepareGame = function (scene: Phaser.Scene) {
        framesMoveUp = 0;
        nextPipes = 0;
        currentPipe = assets.obstacle.pipe.green;
        score = 0;
        gameOver = false;
        backgroundDay.visible = true;
        backgroundNight.visible = false;
        messageInitial.visible = true;

        birdName = getRandomBird();
        player = scene.physics.add.sprite(60, 265, birdName);
        player.setCollideWorldBounds(true);
        player.anims.play(getAnimationBird(birdName).clapWings, true);
        (player.body as Phaser.Physics.Arcade.Body).allowGravity = false;

        scene.physics.add.collider(player, ground, hitBird, undefined, scene);
        scene.physics.add.collider(player, pipesGroup, hitBird, undefined, scene);

        scene.physics.add.overlap(player, gapsGroup, updateScore, undefined, scene);

        ground.anims.play(assets.animation.ground.moving, true);

        updateScoreboard();
      };

      const startGame = function (scene: Phaser.Scene) {
        gameStarted = true;
        messageInitial.visible = false;

        updateScoreboard();

        makePipes(scene);
      };

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameRef.current,
        width: 288,
        height: 512,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 300 },
            debug: false
          }
        },
        scene: {
          preload,
          create,
          update
        }
      };

      if (!isGameDestroyed) {
        game = new Phaser.Game(config);
      }
    };

    loadGame().catch((error) => {
      console.error('Error loading game:', error);
    });

    return () => {
      isGameDestroyed = true;
      if (game) {
        game.destroy(true);
        game = null;
      }
      if (gameRef.current) {
        gameRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-card/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-border max-w-sm mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
            🐦 Flip Bird
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Clique para fazer o pássaro voar e desvie dos obstáculos!
          </p>
        </div>
        <div
          ref={gameRef}
          className="border-2 border-primary/30 rounded-lg shadow-inner bg-background/50 mx-auto max-w-full"
          style={{
            width: '288px',
            height: '512px',
            maxHeight: '70vh',
            aspectRatio: '288/512'
          }}
        />
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Use <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground font-mono text-xs">ESPAÇO</kbd> ou <kbd className="px-2 py-1 bg-muted rounded text-muted-foreground font-mono text-xs">CLIQUE</kbd> para jogar
          </p>
        </div>
      </div>
    </div>
  );
}