import BulletGroup from './BulletGroup'

class GameScene extends Phaser.Scene {
	constructor() {
		super({
			key: 'GAME',
		})
	}

	shoot() {
		this.score -= 1
		this.scoreText.text = 'Score: ' + this.score
		this.bulletGroup.fireBullet(
			this.player.x,
			this.player.y,
			this.game.input.mousePointer
		)
	}

	collectStar(player, star) {
		star.disableBody(true, true)
		this.score += 1
		this.scoreText.text = 'Score: ' + this.score
		this.bulletGroup = new BulletGroup(this)
		if (this.stars.countActive(true) === 0) {
			this.stars.children.iterate(function (child) {
				child.enableBody(true, child.x, 0, true, true)
			})

			var x =
				player.x < 400
					? Phaser.Math.Between(400, 800)
					: Phaser.Math.Between(0, 400)

			this.bomb = this.bombs.create(x, 16, 'bomb')
			this.bomb.setBounce(1)
			this.bomb.setCollideWorldBounds(true)
			this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
		}
	}

	addStars() {
		this.stars = this.physics.add.group({
			key: 'star',
			repeat: 10,
			setXY: { x: 20, y: 0, stepX: 70 },
		})

		this.stars.children.iterate(function (child) {
			child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
		})
	}

	hitBomb(player, bomb) {
		this.gameOver = true
	}

	addEvents() {
		this.input.on('pointerdown', () => {
			if (this.score > 0) {
				this.shoot(this.player)
			}
		})
	}

	preload() {
		this.load.image('sky', require('../assets/sky.png'))
		this.load.image('ground', require('../assets/platform.png'))
		this.load.image('star', require('../assets/star.png'))
		this.load.image('bomb', require('../assets/bomb.png'))
		this.load.image('bullet', require('../assets/bullet.png'))
		this.load.spritesheet('dude', require('../assets/dude.png'), {
			frameWidth: 32,
			frameHeight: 48,
		})
	}

	create() {
		this.bulletGroup = new BulletGroup(this)

		// creating gameOver and score variables
		this.gameOver = false
		this.score = 0

		// adding a background
		this.add.image(400, 300, 'sky')

		// creating platforms group for flying platforms and ground
		this.platforms = this.physics.add.staticGroup()

		// creating ground inside a platforms group
		this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()

		// creating flying platforms inside a platforms group
		this.platforms.create(600, 400, 'ground')
		this.platforms.create(50, 250, 'ground')
		this.platforms.create(750, 220, 'ground')

		// creating a player and adding a sprite to it
		this.player = this.physics.add.sprite(100, 450, 'dude')

		// adding physics, collidings and animations to a player
		this.player.setBounce(0.2)
		this.player.setCollideWorldBounds(true)

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', {
				start: 0,
				end: 3,
			}),
			frameRate: 10,
			repeat: -1,
		})

		this.anims.create({
			key: 'turn',
			frames: [{ key: 'dude', frame: 4 }],
			frameRate: 20,
		})

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', {
				start: 5,
				end: 8,
			}),
			frameRate: 10,
			repeat: -1,
		})
		this.player.body.setGravityY(300)
		this.physics.add.collider(this.player, this.platforms)

		// creating stars to earn point
		this.addStars()

		// adding collidings to stars
		this.physics.add.collider(this.stars, this.platforms)

		this.physics.add.overlap(
			this.player,
			this.stars,
			this.collectStar,
			null,
			this
		)

		// creating a score text
		this.scoreText = this.add.text(16, 16, 'Score: 0', {
			fontSize: '32px',
			fill: '#000',
		})

		this.bombs = this.physics.add.group()
		this.bullets = this.physics.add.group()

		this.physics.add.collider(this.bombs, this.platforms)

		this.physics.add.collider(
			this.player,
			this.bombs,
			this.hitBomb,
			null,
			this
		)
		this.addEvents()
	}
	update() {
		this.cursors = this.input.keyboard.createCursorKeys()

		if (this.cursors.left.isDown) {
			this.player.setVelocityX(-160)

			this.player.anims.play('left', true)
		} else if (this.cursors.right.isDown) {
			this.player.setVelocityX(160)

			this.player.anims.play('right', true)
		} else {
			this.player.setVelocityX(0)

			this.player.anims.play('turn')
		}

		if (this.cursors.up.isDown && this.player.body.touching.down) {
			this.player.setVelocityY(-500)
		}
		if (this.gameOver === true) {
			this.physics.pause()

			this.player.setTint(0xff0000)

			this.player.anims.play('turn')
			setTimeout(() => {
				this.scene.start('MENU')
			}, 750)
		}
	}
}

export default GameScene
