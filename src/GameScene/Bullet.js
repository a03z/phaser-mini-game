class Bullet extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x, y) {
		super(scene, x, y, 'bullet')
		this.gameScene = scene
	}

	bulletHitBomb(bullet, bomb) {
		bomb.destroy()
	}

	fire(x, y, pointer) {
		this.body.reset(x, y)

		this.setActive(true)
		this.setVisible(true)
		this.gameScene.physics.moveToObject(this, pointer, 1500)

		this.gameScene.physics.add.collider(
			this,
			this.gameScene.bombs,
			this.bulletHitBomb,
			null,
			this
		)
		this.gameScene.time.addEvent({
			delay: 2000,
			callback: () => {
				this.destroy()
			},
			callbackScope: this,
			loop: false,
		})
	}
}

export default Bullet
