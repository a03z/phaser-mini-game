import Phaser from 'phaser'
import logoImg from './assets/logo.png'
import GameScene from './GameScene/GameScene'
import { MenuScene } from './MenuScene'

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: false,
		},
	},
	scene: [MenuScene, GameScene],
}

const game = new Phaser.Game(config)
