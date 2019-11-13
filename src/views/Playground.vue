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
                    <div v-for="x in boardWidth"
                         :key="x">
                        <div v-for="y in boardHeight"
                             :key="y">
                            <div :ref="`${x}-${y}`"
                                 class="cell d-flex justify-center align-center "
                                 :style="{width:`${cellWidth}px`, height: `${cellHeight}px`}">
                                <div class="food"
                                     :class="randomBackground()"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    export default {
        name: 'playground',
        components: {},
        data: () => ({
            boardWidth: 16, // means 50 cell not 50px
            boardHeight: 16,
            cellWidth: 40, // for example means each cell width is 2px
            cellHeight: 40,
            cells: {}
        }),
        methods: {
            makeBoardGame() {
                this.initBoard();
                this.initCell();
                this.initFoodScore()
            },
            initBoard() {
                this.$log.debug('board', this.$refs);
                let board = this.$refs.boqard;
                board.style.width = `${this.boardWidth * this.cellWidth}px`;
                board.style.height = `${this.boardHeight * this.cellHeight}px`;
            },
            initCell() {

            },
            initFoodScore() {

            },
            randomBackground() {
                let bgColor = Math.floor(Math.random() * 10);
                switch (bgColor) {
                    case 0:
                        return 'success lighten-1 fadeIn';
                    case 1:
                        return 'warning lighten-1 fadeIn';
                    case 2:
                        return 'warning lighten-3 fadeIn';
                    case 3:
                        return 'success lighten-3 bounceIn';
                    case 4:
                        return 'error lighten-1 zoomIn';
                    case 5:
                        return 'error lighten-3 bounceIn';
                    case 6:
                        return 'info lighten-3 zoomIn';
                    case 7:
                        return 'purple lighten-3 bounceIn';
                    case 8:
                        return 'grey darken-1 zoomIn';
                    case 9:
                        return 'grey lighten-5 zoomIn';
                }
            }
        },
        mounted() {
            this.makeBoardGame()
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
    }

    .food {
        border-radius: 50%;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    }

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
