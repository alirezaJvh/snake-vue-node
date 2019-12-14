export default {
    data: () => ({
        boardWidth: 15, // means n cell not npx
        boardHeight: 15,
        cellWidth: 40, // for example means each cell width is 2px
        cellHeight: 40,
        cells: {},
        maxScoreFood: 1
    }),
    methods: {
        makeBoardGame() {
            this.initBoard();
            this.initCell();
            this.foodScoreStyle()
        },
        initBoard() {
            let board = this.$refs.board;
            board.style.width = `${this.boardWidth * this.cellWidth}px`;
            board.style.height = `${this.boardHeight * this.cellHeight}px`;
        },
        initCell() {
            // this.$log.debug('init cell');
            let y = 1;
            this.cells.info = {
                maxWidth: this.boardWidth,
                maxHeight: this.boardHeight
            }
            while (y <= this.boardHeight) {
                let x = 1;
                while (x <= this.boardWidth) {
                    this.cells[`${x}-${y}`] = {
                        x,
                        y,
                        food: this.initFoodScore(),
                        snake: false
                    };
                    x += 1;
                }
                y += 1;
            }
        },
        initFoodScore() {
            let score = Math.ceil((Math.random() * this.maxScoreFood));
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
            this.$log.debug('style food');
            const coefficient = 3;
            let x = 1;
            while (x <= this.boardWidth) {
                let y = 1;
                while (y <= this.boardHeight) {
                    let cell = this.$refs[`${x}-${y}`][0];
                    let food = cell.children[0];
                    food.style.width = `${this.cells[`${x}-${y}`].food * coefficient}px`;
                    food.style.height = `${this.cells[`${x}-${y}`].food * coefficient}px`;
                    this.addAnimation(food);
                    y++;
                }
                x++;
            }
        },
        addAnimation(food) {
            const time = '2.5s';
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
        },
    }
}
