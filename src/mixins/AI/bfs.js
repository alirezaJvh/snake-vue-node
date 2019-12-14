export default {
    methods: {
        BFS_NEXT_PATH(score, snake, cells) {
            this.$log.debug('BFS');
            let pathLength = 2 * score;
            let [queue, explored] = [[], new Set()];
            let snakeHead = cells[`${snake.body[0].x}-${snake.body[0].y}`];
            let route = this.Node(undefined, snakeHead, [], 0, undefined);
            queue.push(route);
            let counter = 0;
            while (counter <= pathLength) { // queue.length !== 0 &&
                let node = queue.shift();
                node.children = this.checkChildren(node, cells, counter);
                explored.add(node);
                node.children.forEach(child => {
                    if (!explored.has(child)) {
                        this.test(node, child);
                        queue.push(child)
                    }
                    // queue.push(child)
                });
                counter++
            }
            this.$log.debug('route', route)
        },
        test(parent, child) {
            this.$log.debug('***************');
            this.$log.debug('parent', parent);
            this.$log.debug('child', child);
            this.$log.debug('***************')
        },
        Node(parent, cell, children, depth, direction) {
            return {
                parent,
                cell,
                children,
                depth,
                direction
            }
        },
        getChildren(parent, cells, depth, ...directions) {
            let children = [];
            let node = null;
            depth += 1;
            directions.forEach(dir => {
                if (dir === 'down') {
                    node = cells[`${parent.x + 1}-${parent.y}`];
                    children.push(this.Node(parent, node, [], depth, 'down'))

                } else if (dir === 'up') {
                    node = cells[`${parent.x - 1}-${parent.y}`];
                    children.push(this.Node(parent, node, [], depth, 'up'))

                } else if (dir === 'right') {
                    node = cells[`${parent.x}-${parent.y + 1}`];
                    children.push(this.Node(parent, node, [], depth, 'right'))

                } else if (dir === 'left') {
                    node = cells[`${parent.x}-${parent.y - 1}`];
                    children.push(this.Node(parent, node, [], depth, 'left'))

                }
            });
            // this.$log.debug('children', children);
            return children
        },
        checkChildren(parentNode, cells, depth) {
            let parent = parentNode.cell;
            if (parent.x === 1) {
                if (parent.y === 1) {
                    //    down, right
                    return this.getChildren(parent, cells, depth, 'down', 'right')
                } else if (parent.y === cells.info.maxWidth) {
                    //    down, left
                    return this.getChildren(parent, cells, depth, 'down', 'left')
                } else {
                    //    left, down, right
                    return this.getChildren(parent, cells, depth, 'down', 'left', 'right')
                }
            } else if (parent.x === cells.info.maxHeight) {
                if (parent.y === 1) {
                    //    right , up
                    return this.getChildren(parent, cells, depth, 'up', 'right')
                } else if (parent.y === cells.info.maxWidth) {
                    //    up, left
                    return this.getChildren(parent, cells, depth, 'up', 'left')
                } else {
                    //    up, right, left
                    return this.getChildren(parent, cells, depth, 'up', 'right', 'left')
                }
            } else {
                if (parent.y === 1) {
                    //    up, down, right
                    return this.getChildren(parent, cells, depth, 'up', 'down', 'right')
                } else if (parent.y === cells.info.maxWidth) {
                    //    up, down, left
                    return this.getChildren(parent, cells, depth, 'up', 'down', 'left')
                } else {
                    //   left, right, down, up
                    return this.getChildren(parent, cells, depth, 'down', 'left', 'up', 'right')
                }
            }
        },
    },
}
