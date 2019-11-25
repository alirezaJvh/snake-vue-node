<template>
    <div class="home info lighten-2">
        <v-row class="d-flex flex-wrap">
            <v-col cols="12"
                   class="d-flex justify-center my-4">
                snake game : {{scores}}
            </v-col>

            <v-col cols="12"
                   class="d-flex justify-center align-center my-2 board-container">
                <div ref="board"
                     class="d-flex flex-row flex-wrap">
                    <div v-for="y in boardHeight"
                         :key="y">
                        <div v-for="x in boardWidth"
                             :key="x">
                            <div :ref="`${x}-${y}`"
                                 :id="`${x}-${y}`"
                                 class="cell d-flex justify-center align-center"
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
    import snakeMixin from '../mixins/snake'
    import bfsMixin from '../mixins/bfs'

    export default {
        name: 'playground',
        components: {},
        data: () => ({
            scores: 0,

            gameOver: false
        }),
        mixins: [boardMixin, snakeMixin, bfsMixin],
        methods: {
            isHittingTheWall() {
                let head = this.snake.body[0];
                if (typeof head != 'undefined') {
                    if (head.x > this.boardWidth || head.x < 1) return true;
                    if (head.y > this.boardHeight || head.y < 1) return true;
                    return false
                } else {
                    // head is undefined
                    return true
                }
            },

        },
        mounted() {
            this.makeBoardGame();
            this.initSnake()
                .then(() => {
                    this.startGameLoop()
                })
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
        transition: all 1s;
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
