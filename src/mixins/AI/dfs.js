export default {
    methods: {
        DFS_NEXT_PATH(score, snake, cells) {
            this.$log.debug('DFS');
            let path = [];
            let snakeHead = cells[`${snake.body[0].x}-${snake.body[0].y}`];
            let [pathLenght, counter] = [2 * score, 5];
            while (counter < pathLenght) {
                let child;
                if (counter === 0) {
                    child = this.chooseOnChild(this.dfsNode(snakeHead, undefined), cells);
                } else {

                }
                counter++;
            }
        },

        chooseOnChild(node, cells) {
            let children = this.checkChildren(node, cells)
            this.$log.debug(children);
        },

        checkChildren(node, cells) {
            let parent = node.cell;
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
        dfsNode(cell, direction) {
            return {
                cell,
                direction
            }
        }
    }
}
