import Bullet from './Bullet'

class BulletGroup extends Phaser.Physics.Arcade.Group {
	constructor(scene) {
		super(scene.physics.world, scene)

		this.createMultiple({
			classType: Bullet,
			frameQuantity: scene.score,
			active: false,
			visible: false,
			key: 'bullet',
			setScale: {
				x: 0.2,
				y: 0.2,
			},
		})
	}

	fireBullet(x, y, pointer) {
		const bullet = this.getFirstDead(false)

		if (bullet) {
			bullet.fire(x, y, pointer)
		}
	}
}

export default BulletGroup
