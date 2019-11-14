<template>
    <div class="home info lighten-2">
        <v-row class="d-flex flex-wrap">
            <v-col cols="12"
                   class="d-flex justify-center my-4">
                snake game
            </v-col>

            <v-col cols="12"
                   class="d-flex justify-center align-center my-2 board-container">
                <div ref="board" class="d-flex flex-row flex-wrap ">
                    <div v-for="y in boardHeight"
                         :key="y">
                        <div v-for="x in boardWidth"
                             :key="x">
                            <div :ref="`${x}-${y}`"
                                 :id="`${x}-${y}`"
                                 class="cell d-flex justify-center align-center "
                                 :style="{width:`${cellWidth}px`, height: `${cellHeight}px`}">
                                <div class="food"
                                     :class="randomBackground()">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import boardMixin from '../mixins/board'

    export default {
        name: 'playground',
        components: {},
        data: () => ({
            snake: {
                isRunning: true,
                initLength: 4,
                speed: 800,
                direction: 'right',
                body: []
            },
            scores: 0,
            interval: null
        }),
        mixins: [boardMixin],
        methods: {

            initSnake() {
                return new Promise((resolve => {
                    let [xHead, yHead] = [8, 10];
                    let body;
                    for (let i = 0; i < this.snake.initLength; i++) {
                        body = this.cells[`${xHead}-${yHead - i}`];
                        this.snake.body.push(body)
                    }
                    this.$log.debug(this.snake);
                    setTimeout(() => {
                        this.drawSnake();
                        resolve()
                    }, 2000)
                }))

            },
            drawSnake() {
                for (let i = 0; i < this.snake.body.length; i++) {
                    if (i > 0) {
                        this.getSnakeBodyPart(i).appendChild(this.makeSnakeBody('snake-body'))
                    } else {
                        this.getSnakeBodyPart(i).appendChild(this.makeSnakeBody('snake-head'))
                    }
                }

                // if (this.canSnakeEatFood()) {
                //     this.increaseSnakeScore();
                //     this.addSnakeBody();
                // }

                if (this.isSnakeOnItself()) {
                    this.stopTheGame()
                }
            },
            isHittingTheWall() {
                let head = this.snake.body[0];
                this.$log.debug('head', this.snake.body);
                if (head.x > this.boardWidth || head.x < 1) return true;
                if (head.y > this.boardHeight || head.y < 1) return true;
                return false
            },
            startGameLoop() {
                if (!this.snake.isRunning) return false;
                this.interval = setInterval(() => {
                    this.moveSnake()
                }, this.snake.speed)
            },
            moveSnake() {
                this.changeSnakeBodyPositions();
                if (this.isHittingTheWall()) {
                    this.$log.debug('hitting the wall');
                    this.stopTheGame()
                }
                if (this.canSnakeEatFood()) {
                    this.snakeEatFood()
                } else {
                    this.decreaseSnakeLength()
                }
                this.drawSnake()

            },
            changeSnakeBodyPositions() {
                const oldSnakeCoords = this.getOldSnakeCells();
                for (let i = 0; i < this.snake.body.length; i++) {
                    if (i === 0) {
                        /* if it's head, just increment/decrement X or Y depending on moving direction */
                        this.removeHeadSnakeCell();
                        this.moveSnakeHead()
                    } else {
                        this.$log.debug('i', i);
                        const oldBodyCell = this.getSnakeBodyPart(i);
                        this.removeSnakeBodyCell(oldBodyCell);
                        this.snake.body[i].x = oldSnakeCoords[i - 1].x;
                        this.snake.body[i].y = oldSnakeCoords[i - 1].y;
                    }
                }
            },
            decreaseSnakeLength() {
                this.snake.body.pop()
            },
            moveSnakeHead() {
                switch (this.snake.direction) {
                    case 'up':
                        this.$log.debug('**** move up ****');
                        this.snake.body[0].x += 1;
                        break;
                    case 'down':
                        this.$log.debug('***** move down *****');
                        this.snake.body[0].x -= 1;
                        break;
                    case 'right':
                        this.$log.debug('***** move right *****');
                        this.snake.body[0].y += 1;
                        break;
                    case 'left':
                        this.$log.debug('***** move left ******');
                        this.snake.body[0].y -= 1;
                        break;
                    default:
                        break;
                }
            },
            removeSnakeBodyCell(oldSnakeBody) {
                oldSnakeBody.removeChild(oldSnakeBody.children[1]);
            },
            removeHeadSnakeCell() {
                let oldSnakeHead = this.getSnakeBodyPart(0);
                this.removeSnakeBodyCell(oldSnakeHead)
            },
            getOldSnakeCells() {
                const oldParts = [];
                this.snake.body.forEach((part) => {
                    oldParts.push({
                        x: part.x,
                        y: part.y,
                        food: part.food
                    })
                });
                return oldParts
            },
            stopTheGame() {
                this.snake.isRunning = false;
                clearInterval(this.interval);
                this.$log.debug('stop game');
                window.alert('game over')
            },
            getSnakeHeadCell() {
                // return cell which head snake is in it
                return this.getSnakeBodyPart(0)
            },
            isSnakeOnItself() {
                const snakeHead = this.getSnakeHeadCell();
                let isItsBodyOnHead = false;
                for (let i = 0; i < snakeHead.children.length; i++) {
                    // if snake head has children with snake-body class it means that snake head eat its body
                    if (snakeHead.classList.value.includes('snake-body')) {
                        isItsBodyOnHead = true
                    }
                }
                return isItsBodyOnHead

            },
            addSnakeBody() {
                //     TODO : how to add snake body
                this.$log.debug('add snake body')
            },
            snakeEatFood() {
                this.$log.debug('eat x', this.snake.body[0].x, 'eat y', this.snake.body[0].y, 'length', this.snake.body.length)
            },
            increaseSnakeScore() {
                const c = 5;
                let score = this.snake.body[0].food;
                this.$log.debug(this.snake.body[0]);
                this.scores = c * score + 1
            },
            canSnakeEatFood() {
                // snake can meat food when its body length is one
                return this.snake.body.length === 1
            },
            getSnakeBodyPart(index) {
                let cell = this.snake.body[index];
                return this.$refs[`${cell.x}-${cell.y}`][0]
            },
            makeSnakeBody(snakeClass) {
                let snakeBody = document.createElement('div');
                snakeBody.classList.add(snakeClass);
                return snakeBody
            }
        },
        mounted() {
            this.makeBoardGame();
            this.initSnake()
                .then(() => {
                    this.startGameLoop()
                })
            // setTimeout(this.startGameLoop(), 8000)

        }
    }
</script>

<style lang="scss">
    @import "../assets/css/animation/animation";

    .home {
        height: 100%;
        width: 100%;
    }

    .board-container {
        min-height: 45vh;
    }

    .cell {
        z-index: 1000;
        border: 1px solid rgba(159, 159, 159, 0.75) !important;
        animation: zoomIn 1s;
        background: #51b0ff;
        position: relative;
    }

    .food {
        border-radius: 50%;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    }

    .snake-body, .snake-head {
        height: 100%;
        width: 100%;
        z-index: 100000;
        position: absolute;
        /*animation: zoomInUp 3s;*/
    }

    .snake-body {
        background: #FFEA00;
    }

    .snake-head {
        background: #FF6F00;
    }

    /***************************/
    /* animation */

    .fadeIn {
        animation: fadeIn 2.5s;
    }

    .fadeInRight {
        animation: fadeInRight 2.5s;
    }

    .bounceIn {
        animation: bounceIn 2.5s;
    }

    .zoomIn {
        animation: zoomIn 2.5s
    }

</style>
