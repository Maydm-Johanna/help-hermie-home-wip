namespace SpriteKind {
    export const ladder = SpriteKind.create()
    export const key = SpriteKind.create()
}
// more levels
// secret levels by teleportation
// r/l flip
// animations
// spikes/traps
// speed boost or speed changes
// healing
// monsters/enemies
// collectables, chests, keys
scene.onOverlapTile(SpriteKind.Player, assets.tile`Door`, function (sprite, location) {
    if (hasKey == true) {
        game.showLongText("Great job! You have made it to the door. But what is behind the door??", DialogLayout.Bottom)
        level2()
    } else {
        game.showLongText("Hmm, this door is locked...", DialogLayout.Bottom)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ladder, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    game.showLongText("Yay we found a ladder! What can we climb with this?", DialogLayout.Bottom)
    for (let value of tiles.getTilesByType(assets.tile`fence`)) {
        tiles.setWallAt(value, false)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    info.setScore(12)
    hasKey = true
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Hermie.setImage(assets.image`hermieLeft`)
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Hermie)
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, Hermie)
})
function level2 () {
    info.setScore(0)
    tiles.setCurrentTilemap(tilemap`level2`)
    tiles.placeOnRandomTile(Hermie, sprites.dungeon.collectibleInsignia)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Hermie.setImage(assets.image`Right`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`fence`, function (sprite, location) {
    tiles.setTileAt(location, sprites.castle.tileDarkGrass3)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.UntilDone)
    sprites.destroy(otherSprite)
    info.changeScoreBy(1)
    if (info.score() >= 12) {
        music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.UntilDone)
        tiles.setTileAt(tiles.getTileLocation(5, 8), sprites.castle.tilePath5)
        tiles.setWallAt(tiles.getTileLocation(5, 8), false)
        game.showLongText("You have all the points. Let's go get the key!", DialogLayout.Bottom)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.key, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    hasKey = true
    game.showLongText("Let's open the door with this key!", DialogLayout.Bottom)
})
let crabFood: Sprite = null
let Hermie: Sprite = null
let hasKey = false
hasKey = false
info.setScore(0)
Hermie = sprites.create(assets.image`Right`, SpriteKind.Player)
tiles.setCurrentTilemap(tilemap`level1`)
tiles.placeOnRandomTile(Hermie, sprites.builtin.forestTiles0)
controller.moveSprite(Hermie, 100, 100)
scene.cameraFollowSprite(Hermie)
for (let value of tiles.getTilesByType(assets.tile`CrabFood`)) {
    crabFood = sprites.create(assets.image`Crab food`, SpriteKind.Food)
    tiles.placeOnTile(crabFood, value)
    tiles.setTileAt(value, sprites.castle.tilePath5)
}
let ladder = sprites.create(assets.image`ladder`, SpriteKind.ladder)
tiles.placeOnRandomTile(ladder, assets.tile`step`)
let key = sprites.create(assets.image`key`, SpriteKind.key)
tiles.placeOnRandomTile(key, assets.tile`key`)
