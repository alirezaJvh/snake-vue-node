export default {
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
                if (i > 0) {
                    this.getSnakeBodyPart(i).appendChild(this.makeSnakeBody('snake-body'))
                } else {
                    this.getSnakeBodyPart(i).appendChild(this.makeSnakeBody('snake-head'))
                }
            }
            if (this.isSnakeOnItself()) {
                this.stopTheGame()
            }
        },
        chooseNextDirection() {
            // this.snake.direction = 'down'
            let rand = Math.ceil(Math.random() * 4)
            this.$log.debug(rand)
            if (rand === 1) {
                if (this.snake.direction !== 'up') {
                    this.snake.direction = 'down'
                }
            }
            if (rand === 2) {
                if (this.snake.direction !== 'left') {
                    this.snake.direction = 'right'
                }
            }
            if (rand === 3) {
                if (this.snake.direction !== 'down') {
                    this.snake.direction = 'up'
                }
            }
            if (rand === 0) {
                if (this.snake.direction !== 'right') {
                    this.snake.direction = 'left'
                }
            }
        },
        moveSnake() {
            // const body = this.snake.body;
            // this.$log.debug(body);
            if (this.isHittingTheWall()) {
                this.$log.debug('hitting the wall');
                this.stopTheGame()
                return
            }
            this.changeSnakeBodyPositions();
            if (this.canSnakeEatFood()) {
                this.snakeEatFood()
            } else {
                this.decreaseSnakeLength()
            }
            this.drawSnake();
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
            let children = oldSnakeBody.childNodes;
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
        addSnakeBody() {
            if (this.isHittingTheWall()) {
                this.$log.debug('hitting the wall');
                this.stopTheGame();
                return
            }
            let [x, y] = [this.snake.body[0].x, this.snake.body[0].y];
            switch (this.snake.direction) {
                case 'up':
                    this.$log.debug('**** increase up****');
                    x -= 1;
                    break;
                case 'down':
                    this.$log.debug('***** increase down *****');
                    x += 1;
                    break;
                case 'right':
                    this.$log.debug('***** increase right *****');
                    y += 1;
                    break;
                case 'left':
                    this.$log.debug('***** increase left ******');
                    y -= 1;
                    break;
                default:
                    break;
            }

            this.snake.body.unshift(this.cells[`${x}-${y}`]);
            this.$log.debug(`x head : ${x} , y head : ${y}`)

        },
        snakeEatFood() {
            this.increaseSnakeScore();
            const score = this.snake.body[0].food;
            this.$log.debug('snake eat ', score, `in x: ${this.snake.body[0].x}`, `in y: ${this.snake.body[0].y}`);
            clearInterval(this.interval);
            let i = 1;
            let interval = setInterval(() => {
                this.addSnakeBody();
                this.drawSnake();
                i += 1;
                if (i > score) {
                    clearInterval(interval);
                    this.startGameLoop();
                }
            }, this.snake.speed)
        },
        increaseSnakeScore() {
            const c = 5;
            let score = this.snake.body[0].food;
            this.$log.debug('get score', score);
            this.scores += c * score + 1
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
        },
        startGameLoop() {
            if (!this.snake.isRunning) return false;
            this.$log.debug('start game loop');
            this.interval = setInterval(() => {
                this.chooseNextDirection();
                this.moveSnake();
            }, this.snake.speed)
        },
        stopTheGame() {
            this.snake.isRunning = false;
            clearInterval(this.interval);
            this.$log.debug('stop game');
            // window.alert('game over')
        },
    }
}
