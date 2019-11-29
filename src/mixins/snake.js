

export default {
    data: () => ({
        x_0: 15,
        y_0: 5,
        interval: null,
        snake: {
            isRunning: true,
            initLength: 1,
            speed: 90,
            direction: 'right',
            body: []
        },
        scores: 0,
    }),
    methods: {
        initSnake() {
            return new Promise((resolve => {
                let [xHead, yHead] = [this.x_0, this.y_0];
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
                if (typeof this.getSnakeBodyPart(i) !== 'undefined') {
                    if (i > 0) {
                        this.getSnakeBodyPart(i).appendChild(this.makeSnakeBody('snake-body'))
                    } else {
                        this.getSnakeBodyPart(i).appendChild(this.makeSnakeBody('snake-head'))
                    }

                }
            }
        },
        moveSnake() {
            if (this.isHittingTheWall()) {
                this.$log.debug('hitting the wall');
                this.stopTheGame();
                return
            }
            this.changeSnakeBodyPositions();
            /* if (this.canSnakeEatFood()) {
                 this.snakeEatFood()
             } else {
                 this.decreaseSnakeLength()
             }
             this.drawSnake();*/
        },
        changeSnakeBodyPositions() {
            const oldSnakeCoords = this.getOldSnakeCells();
            this.$log.debug('snake length', this.snake.body.length);
            for (let i = 0; i < this.snake.body.length; i++) {
                if (i === 0) {
                    /* if it's head, just increment/decrement X or Y depending on moving direction */
                    this.removeHeadSnakeCell();
                    this.moveSnakeHead()
                } else {
                    const oldBodyCell = this.getSnakeBodyPart(i);
                    this.removeSnakeBodyCell(oldBodyCell);
                    this.snake.body[i].x = oldSnakeCoords[i - 1].x;
                    this.snake.body[i].y = oldSnakeCoords[i - 1].y;
                }
            }
        },
        decreaseSnakeLength() {
            this.snake.body.pop();
            const tail = this.snake.body.length - 1;
            const oldBodyCell = this.getSnakeBodyPart(tail);
            this.removeSnakeBodyCell(oldBodyCell);
        },
        moveSnakeHead() {
            if (this.isHittingTheWall()) {
                this.$log.debug('hitting the wall');
                this.stopTheGame();
                return
            }
            switch (this.snake.direction) {
                case 'up':
                    this.$log.warn('**** move up ****');
                    this.snake.body[0].x -= 1;
                    break;
                case 'down':
                    this.$log.warn('***** move down *****');
                    this.snake.body[0].x += 1;
                    break;
                case 'right':
                    this.$log.warn('***** move right *****');
                    this.snake.body[0].y += 1;
                    break;
                case 'left':
                    this.$log.warn('***** move left ******');
                    this.snake.body[0].y -= 1;
                    break;
                default:
                    break;
            }
        },
        removeSnakeBodyCell(oldSnakeBody) {
            // oldSnakeBody.removeChild(oldSnakeBody.children[1]);
            let length = oldSnakeBody.childNodes.length;
            for (let i = 0; i < length; i++) {
                if (oldSnakeBody.childNodes[i].className === 'snake-head') {
                    oldSnakeBody.removeChild(oldSnakeBody.childNodes[i]);
                    length = oldSnakeBody.childNodes.length;
                    i -= 1
                }
                if (oldSnakeBody.childNodes[i].className === 'snake-body') {
                    oldSnakeBody.removeChild(oldSnakeBody.childNodes[i]);
                    length = oldSnakeBody.childNodes.length;
                    i -= 1
                }
            }
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
            this.$log.debug('get old positions', oldParts);
            return oldParts
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
        logMove(x, y, direction) {
            this.$log.debug(`x head : ${x} , y head : ${y}`);
            this.$log.debug(`***** increase ${direction} ******`);
        },
        snakeEatFood() {
            this.increaseSnakeScore();
            const score = this.snake.body[0].food;
            return score
        },
        increaseSnakeScore() {
            const c = 10;
            let score = this.snake.body[0].food;
            // scoring
            this.scores += c * score + 10
        },
        canSnakeEatFood() {
            // snake can meat food when its body length is one
            return this.snake.body.length === 1
        },
        getSnakeBodyPart(index) {
            let cell = this.snake.body[index];
            if (typeof cell !== 'undefined') {
                if (typeof this.$refs[`${cell.x}-${cell.y}`] !== 'undefined') {
                    return this.$refs[`${cell.x}-${cell.y}`][0]
                }
            }
        },
        makeSnakeBody(snakeClass) {
            let snakeBody = document.createElement('div');
            snakeBody.classList.add(snakeClass);
            return snakeBody
        },
        startGameLoop() {
            if (this.snake.isRunning) {
                this.$log.debug('start game loop');
                this.interval = setInterval(() => {
                    // this.moveSnake();
                    const score = this.snakeEatFood();
                    this.BFS_NEXT_PATH(score, this.snake, this.cells)
                }, 1000)
            }

        },
        stopTheGame() {
            this.snake.isRunning = false;
            clearInterval(this.interval);
            this.gameOver = true;
            this.$log.debug('stop game');
            window.alert('game over')
        },
    }
}
