import WallBlock from "../objects/play/WallBlock"
import ILevelData from "../interfaces/ILevelData"
import SpotLight from "../objects/play/SpotLight"
import SpriteKey from "../configs/SpriteKey"
import FileLookUp from "../configs/FileLookUp"
import Painting from "../objects/play/Painting"
import Convert from "../utilities/Convert"
import Boundary from "../objects/play/Boundary"
import Constants from "../configs/Constants"
import SceneKey from "../configs/SceneKey"
import {GameEvent} from "../utilities/Event"
import Phaser from "phaser"
import JsonKey from "../configs/JsonKey"
import Vector2 = Phaser.Math.Vector2
import Color = Phaser.Display.Color

class PlayScene extends Phaser.Scene
{
    public paintingLit: GameEvent = new GameEvent()
    public paintingUnlit: GameEvent = new GameEvent()
    public gameWon: GameEvent = new GameEvent()

    public currentLevel: ILevelData

    public allBlocks: WallBlock[]
    public allWorldCorners: Vector2[]
    public allPaintings: Painting[]
    public blockFlags: boolean[][]
    public light: SpotLight
    private boundary: Boundary
    private paintingUnlitCount: number = 0

    constructor() {
        super({
            key: SceneKey.PLAY
        })
    }

    private init(data: any): void {
        this.currentLevel = FileLookUp[JsonKey.LEVEL_DATA][data.selectedLevelIndex] as ILevelData
    }

    private preload(): void {
        this.load.image(SpriteKey.LIGHT, FileLookUp[SpriteKey.LIGHT])
        this.load.image(SpriteKey.DEFAULT_BUTTON, FileLookUp[SpriteKey.DEFAULT_BUTTON])
    }

    private create(): void {
        this.adjustCamera()
        this.initializeWallsAndBoundaries()
        this.initializePaintings()
        this.initializeLights()
        this.initializeEvents()
    }

    private adjustCamera(): void {
        this.cameras.main.zoom = 0.5
        this.cameras.main.centerOn(this.currentLevel.levelSize.x * Constants.CELL_SIZE / 2,
            this.currentLevel.levelSize.y * Constants.CELL_SIZE / 2)
        this.cameras.main.backgroundColor = Color.HexStringToColor(this.currentLevel.groundColor)
    }

    private initializeWallsAndBoundaries(): void {
        this.allBlocks = []
        this.allWorldCorners = []
        this.blockFlags = []

        for (let x = 0; x < this.currentLevel.levelSize.x; x++)
        {
            this.blockFlags.push([])
            for (let y = 0; y < this.currentLevel.levelSize.y; y++)
            {
                this.blockFlags[x].push(false)
            }
        }

        for (let i = 0; i < this.currentLevel.wallLayout.length; i++)
        {
            const wallBlock = new WallBlock(this, this.currentLevel.wallLayout[i], this.currentLevel.cornerLayout[i], this.currentLevel.wallColor)
            this.allBlocks.push(wallBlock)

            this.allWorldCorners = this.allWorldCorners.concat(wallBlock.worldCornerPositions)

            for (let j = 0; j < this.currentLevel.wallLayout[i].length; j++)
            {
                const wallUnit = this.currentLevel.wallLayout[i][j]
                this.blockFlags[wallUnit.x][wallUnit.y] = true
            }
        }

        this.boundary = new Boundary(this, Convert.ToVector2(this.currentLevel.levelSize), this.currentLevel.wallColor)
    }

    private initializePaintings(): void {
        this.allPaintings = []

        for (let i = 0; i < this.currentLevel.paintingLayout.length; i++)
        {
            const paintingPosition = Convert.ToVector2(this.currentLevel.paintingLayout[i].position)
            const paintingSize = Convert.ToVector2(this.currentLevel.paintingLayout[i].size)
            const painting = new Painting(this, paintingPosition, paintingSize, new Color(255, 0, 0))
            this.allPaintings.push(painting)
        }

        this.paintingUnlitCount = this.currentLevel.paintingLayout.length
    }

    private initializeLights(): void {
        this.light = new SpotLight(this)
        this.input.setDraggable(this.light)
    }

    private initializeEvents(): void {
        this.input.on(Phaser.Input.Events.POINTER_MOVE, () => {
            const pointerScreenPosition = this.input.activePointer.position.clone()
            this.light.handlePointerMove(this.cameras.main.getWorldPoint(pointerScreenPosition.x, pointerScreenPosition.y))
        })

        this.input.on(Phaser.Input.Events.POINTER_UP, () => {
            this.light.handlePointerUp()
        })

        this.paintingLit.subscribe(this.paintingLitHandler.bind(this))
        this.paintingUnlit.subscribe(this.paintingUnlitHandler.bind(this))
        this.gameWon.subscribe(this.gameWonHandler.bind(this))
    }

    private paintingLitHandler(): void {
        this.paintingUnlitCount--
        if (this.paintingUnlitCount === 0) this.gameWon.invoke()
    }

    private paintingUnlitHandler(): void {
        this.paintingUnlitCount++
    }

    private gameWonHandler(): void {
        console.log("WON")
    }
}

export default PlayScene