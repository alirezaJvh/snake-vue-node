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
                initLength: 4,
                direction: 'right',
                body: []
            },
            scores: 0
        }),
        mixins: [boardMixin],
        methods: {

            initSnake() {
                let [xHead, yHead] = [8, 10];
                let body;
                for (let i = 0; i < this.snake.initLength; i++) {
                    body = this.$refs[`${xHead}-${yHead - i}`][0];
                    this.snake.body.push(body)
                }
                this.$log.debug(this.snake);
                this.drawSnake()
            },
            drawSnake() {
                for (let i = 0; i < this.snake.body.length; i++) {
                    if (i > 0) {
                        this.getSnakeBodyPart(i).appendChild(this.addSnakeBody('snake-body'))
                    } else {
                        this.getSnakeBodyPart(i).appendChild(this.addSnakeBody('snake-head'))
                    }
                }

                if (this.canSnakeEatFooad()) {
                    this.increaseSnakeScore();
                    // this.addSnakeBodyPart();
                }

            },
            increaseSnakeScore() {
                const c = 5;
                let score = this.snake.body[0].food;
                this.$log.debug(this.snake.body[0]);
                this.scores = c * score + 1

            },
            canSnakeEatFooad() {
                // snake can meat food when its body length is one
                return this.snake.body.length === 1
            },
            getSnakeBodyPart(index) {
                return this.snake.body[index]
            },
            addSnakeBody(snakeClass) {
                let snakeBody = document.createElement('div');
                snakeBody.classList.add(snakeClass);
                return snakeBody
            }
        },
        mounted() {
            this.makeBoardGame();
            this.initSnake();
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
        animation: zoomIn 1.5s;
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
        animation: zoomInUp 3s;
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
