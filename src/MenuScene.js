class MenuScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'MENU',
		})
	}
	init() {}
	preload() {
		this.load.image('sky_menu', require('./assets/sky_menu.jpg'))
		this.load.image('play_btn', require('./assets/play_btn.png'))
		this.load.image('control_arrows', require('./assets/arrows.png'))
		this.load.image('left_mouse_button', require('./assets/lmb.png'))
	}

	create() {
		this.add
			.image(
				this.game.renderer.width / 2,
				this.game.renderer.height / 2,
				'sky_menu'
			)
			.setScale(3)
		let playButton = this.add.image(
			this.game.renderer.width / 2,
			this.game.renderer.height / 4,
			'play_btn'
		)
		this.add
			.image(
				this.game.renderer.width / 2,
				this.game.renderer.height / 1.5,
				'control_arrows'
			)
			.setScale(0.25)
		this.add
			.image(
				this.game.renderer.width / 2,
				this.game.renderer.height / 1.1,
				'left_mouse_button'
			)
			.setScale(0.5)

		this.add.text(
			this.game.renderer.width / 2 - 275,
			this.game.renderer.height / 1.5 + 20,
			'Move Left',
			{
				fontSize: '32px',
				fill: '#000',
			}
		)
		this.add.text(
			this.game.renderer.width / 2 + 100,
			this.game.renderer.height / 1.5 + 20,
			'Move Right',
			{
				fontSize: '32px',
				fill: '#000',
			}
		)
		this.add.text(
			this.game.renderer.width / 2 - 40,
			this.game.renderer.height / 1.5 - 100,
			'Jump',
			{
				fontSize: '32px',
				fill: '#000',
			}
		)
		this.add.text(
			this.game.renderer.width / 2 - 150,
			this.game.renderer.height / 1.1 - 20,
			'Shoot',
			{
				fontSize: '32px',
				fill: '#000',
			}
		)
		playButton.setInteractive()
		playButton.on('pointerdown', () => {
			this.scene.start('GAME')
		})
	}
	update() {}
}

export { MenuScene }
