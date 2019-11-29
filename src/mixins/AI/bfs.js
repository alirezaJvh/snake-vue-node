export default {
    methods: {
        BFS_NEXT_PATH(score, snake, cells) {
            this.$log.debug('BFS');
            let pathLength = 2 * score;
            let queue = [];
            let explored = new Set();
            let snakeHead = cells[`${snake.body[0].x}-${snake.body[0].y}`];
            queue.push(this.node(snakeHead, [], 1));
            let counter = 0;
            while (queue.length !== 0 && counter < 10) {
                let node = queue.shift();
                this.checkChildren(node, cells);
                counter++
            }

        },
        checkChildren(node, cells) {
            let parent = node.parent;
            if (parent.x === 1) {
                if (parent.y === 1) {
                    //    down, right

                } else if (parent.y === cells.info.maxWidth) {
                    //    up, right
                } else {
                    //    up, down, right

                }
            } else if (parent.x === cells.info.maxHeight) {
                if (parent.y === 1) {
                    //    left , down
                } else if (parent.y === cells.info.maxWidth) {
                    //    up, left
                } else {
                    //    up, down, left
                }
            } else {
                if (parent.y === 1) {
                    //    left, right, down
                } else if (parent.y === cells.maxWidth) {
                    //    left, right, up
                } else {
                    //   left, right, down, up
                }
            }
        },
        node(parent, children, depth) {
            return {
                parent,
                children,
                depth
            }
        }

    },

}
