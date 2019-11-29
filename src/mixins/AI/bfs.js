export default {
    methods: {
        BFS_NEXT_PATH(score, snake, cells) {
            this.$log.debug('BFS');
            let pathLength = 2 * score;
            let queue = [];
            let explored = new Set();
            let snakeHead = cells[`${snake.body[0].x}-${snake.body[0].y}`];
            queue.push(this.Node(null, snakeHead, [], 0));
            let counter = 0;
            while (queue.length !== 0 && counter <= pathLength) {
                let node = queue.shift();
                node.children = this.checkChildren(node, cells, counter);
                this.$log.debug('node', node);
                counter++
            }

        },
        Node(parent, cell, children, depth) {
            return {
                parent,
                cell,
                children,
                depth
            }
        },
        getChildren(parent, cells, depth, ...directions) {
            let children = [];
            let node = null;
            directions.forEach(dir => {
                if (dir === 'down') {
                    node = cells[`${parent.x + 1}-${parent.y}`];
                    children.push(this.Node(parent, node, [], depth))

                } else if (dir === 'up') {
                    node = cells[`${parent.x - 1}-${parent.y}`];
                    children.push(this.Node(parent, node, [], depth))

                } else if (dir === 'right') {
                    node = cells[`${parent.x}-${parent.y + 1}`];
                    children.push(this.Node(parent, node, [], depth))

                } else if (dir === 'left') {
                    node = cells[`${parent.x}-${parent.y - 1}`];
                    children.push(this.Node(parent, node, [], depth))

                }
            });
            this.$log.debug('children', children);
            return children
        },
        checkChildren(node, cells, depth) {
            let cell = node.cell;
            if (cell.x === 1) {
                if (cell.y === 1) {
                    //    down, right
                    return this.getChildren(cell, cells, depth, 'down', 'right')
                } else if (cell.y === cells.info.maxWidth) {
                    //    down, left
                    return this.getChildren(cell, cells, depth, 'down', 'left')
                } else {
                    //    left, down, right
                    return this.getChildren(cell, cells, depth, 'down', 'left', 'right')
                }
            } else if (cell.x === cells.info.maxHeight) {
                if (cell.y === 1) {
                    //    right , up
                    return this.getChildren(cell, cells, depth, 'up', 'right')
                } else if (cell.y === cells.info.maxWidth) {
                    //    up, left
                    return this.getChildren(cell, cells, depth, 'up', 'left')
                } else {
                    //    up, right, left
                    return this.getChildren(cell, cells, depth, 'up', 'right', 'left')
                }
            } else {
                if (cell.y === 1) {
                    //    up, down, right
                    return this.getChildren(cell, cells, depth, 'up', 'down', 'right')
                } else if (cell.y === cells.info.maxWidth) {
                    //    up, down, left
                    return this.getChildren(cell, cells, depth, 'up', 'down', 'left')
                } else {
                    //   left, right, down, up
                    return this.getChildren(cell, cells, depth, 'down', 'left', 'up', 'right')
                }
            }
        },
    },
}
