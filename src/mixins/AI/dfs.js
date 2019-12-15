export default {
    data: () => ({
        path: []
    }),
    methods: {
        DFS_NEXT_PATH(score, snake, cells) {
            this.$log.debug('DFS');
            this.$log.debug('score', score);
            let snakeHead = cells[`${snake.body[0].x}-${snake.body[0].y}`];
            let [pathLength, counter] = [2 * score, 1];
            this.path.push(snakeHead);
            while (counter <= pathLength) {
                let child = this.chooseOnChild(this.path[counter - 1], cells);
                this.path.push(child);
                counter++;
            }
            this.path.shift();
            this.showPath();
            return this.path

        },

        showPath() {
            this.path.forEach(p => {
                this.$log.debug('x: ', p.x, ' y: ', p.y)
            })
        },

        chooseOnChild(node, cells) {
            let directions = this.checkAvailablePath(node, cells);
            let randNum;
            let child;
            if (this.path.length === 0) {
                randNum = this.randNum(directions.length);
                child = this.getChildren(node, cells, directions[randNum]);
                return child
            } else {
                directions = this.childrenAreNotInPath(node, cells, directions);
                randNum = this.randNum(directions.length);
                child = this.getChildren(node, cells, directions[randNum]);
                return child
            }
        },

        checkAvailablePath(node, cells) {
            let parent = node;
            if (parent.x === 1) {
                if (parent.y === 1) {
                    //    down, right
                    return ['down', 'right']
                } else if (parent.y === cells.info.maxWidth) {
                    //    down, left
                    return ['down', 'left']
                } else {
                    //    left, down, right
                    return ['down', 'left', 'right']
                }
            } else if (parent.x === cells.info.maxHeight) {
                if (parent.y === 1) {
                    //    right , up
                    return ['up', 'right']
                } else if (parent.y === cells.info.maxWidth) {
                    //    up, left
                    return ['up', 'left']
                } else {
                    //    up, right, left
                    return ['up', 'right', 'left']
                }
            } else {
                if (parent.y === 1) {
                    //    up, down, right
                    return ['up', 'down', 'right']
                } else if (parent.y === cells.info.maxWidth) {
                    //    up, down, left
                    return ['up', 'down', 'left']
                } else {
                    //   left, right, down, up
                    return ['down', 'left', 'up', 'right']
                }
            }
        },

        getChildren(parent, cells, dir) {
            let node = null;
            if (dir === 'down') {
                node = cells[`${parent.x + 1}-${parent.y}`];
                return node

            } else if (dir === 'up') {
                node = cells[`${parent.x - 1}-${parent.y}`];
                return node

            } else if (dir === 'right') {
                node = cells[`${parent.x}-${parent.y + 1}`];
                return node

            } else if (dir === 'left') {
                node = cells[`${parent.x}-${parent.y - 1}`];
                return node

            }
            // this.$log.debug('children', children);
        },

        childrenAreNotInPath(node, cells, directions) {
            // this.$log.debug('all path', directions);
            let goodChildren = [];
            directions.forEach(dir => {
                let child = this.getChildren(node, cells, dir);
                let flag = true;
                this.path.forEach(p => {
                    if ((p.x === child.x) && (p.y === child.y)) {
                        flag = false
                    }
                });
                if (flag) {
                    goodChildren.push(dir)
                }
            });
            // this.$log.debug('good', goodChildren);
            return goodChildren
        },

        randNum(max) {
            return Math.floor(Math.random() * max)
        }

    }
}
