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
                this.foodScoreStyle()
            },
            initBoard() {
                this.$log.debug('board', this.$refs);
                let board = this.$refs.board;
                board.style.width = `${this.boardWidth * this.cellWidth}px`;
                board.style.height = `${this.boardHeight * this.cellHeight}px`;
            },
            initCell() {
                this.$log.debug('init cell');
                let x = 1;
                while (x <= this.boardWidth) {
                    let y = 1;
                    while (y <= this.boardHeight) {
                        this.cells[`${x}-${y}`] = {
                            x,
                            y,
                            food: this.initFoodScore(),
                            snake: false
                        };
                        y += 1;
                    }
                    x += 1;
                }
                this.$log.debug('foods', this.cells)
            },
            initFoodScore() {
                let score = Math.ceil((Math.random() * 10));
                return (score === 10 ? 9 : score);
            },
            randomBackground() {
                let bgColor = Math.floor(Math.random() * 10);
                switch (bgColor) {
                    case 0:
                        return 'success lighten-1';
                    case 1:
                        return 'warning lighten-1';
                    case 2:
                        return 'warning lighten-3';
                    case 3:
                        return 'success lighten-3';
                    case 4:
                        return 'error lighten-1';
                    case 5:
                        return 'error lighten-3';
                    case 6:
                        return 'info lighten-3';
                    case 7:
                        return 'purple lighten-3';
                    case 8:
                        return 'grey darken-1';
                    case 9:
                        return 'grey lighten-5';
                }
            },
            foodScoreStyle() {
                const coef = 3;
                let x = 1;
                while (x <= this.boardWidth) {
                    let y = 1;
                    while (y <= this.boardHeight) {
                        let cell = this.$refs[`${x}-${y}`][0];
                        let food = cell.children[0];
                        food.style.width = `${this.cells[`${x}-${y}`].food * coef}px`;
                        food.style.height = `${this.cells[`${x}-${y}`].food * coef}px`;
                        this.addAnimation(food);
                        y++;
                    }
                    x++;
                }
            },
          addAnimation(food) {
              const time = '3.5s';
              switch (Math.ceil(Math.random() * 5)) {
                case 1:
                  food.style.animation = `zoomInRight ${time}`;
                      break;
                case 2:
                  food.style.animation = `zoomInLeft ${time}`;
                  break;
                case 3:
                  food.style.animation = `zoomInUp ${time}`;
                  break;
                case 4:
                  food.style.animation = `zoomInDown ${time}`;
                  break;
                case 5:
                  food.style.animation = `zoomInUp ${time}`;
                  break;
              }
              this.$log.debug()
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
