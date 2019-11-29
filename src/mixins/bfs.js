export default {
    methods: {
        findPath_bfs() {
            let head = this.snake.body[0];
            let openList = []; // array of nodes
            let closeList = [];
            openList.push(this.node(null, head, []));
            while (openList.length !== 0) {
                let node = openList.shift();
                if (node.cell.x === 1 || node.cell.x === this.boardWidth) {
                    //    can just go up or down
                } else if (node.cell.y === 1 || node.cell.y === this.boardHeight) {
                    //    can just go right or left
                } else {
                    //    can go up, down, right, left
                    this.checkAvailableChildren(node);
                    closeList.push(node)
                    this.$log.debug(openList)
                }
            }
        },
        checkAvailableChildren(node) {
            if (this.$refs[`${node.cell.x}-${node.cell.y + 1}`] !== 'undefined') {
                if (!this.hasBodyPart(this.$refs[`${node.cell.x}-${node.cell.y + 1}`][0])) {
                    this.$log.debug('can go right');
                    let rightChild = this.cells[`${node.cell.x}-${node.cell.y + 1}`];
                    node.children.push(this.node(node, rightChild, []))
                }
            }
            if (this.$refs[`${node.cell.x}-${node.cell.y - 1}`] !== 'undefined') {
                if (!this.hasBodyPart(this.$refs[`${node.cell.x}-${node.cell.y - 1}`][0])) {
                    this.$log.debug('can  go left');
                    let leftChild = this.cells[`${node.cell.x}-${node.cell.y - 1}`];
                    node.children.push(this.node(node, leftChild, []))
                }
            }
            if (this.$refs[`${node.cell.x + 1}-${node.cell.y}`] !== 'undefined') {
                if (!this.hasBodyPart(this.$refs[`${node.cell.x + 1}-${node.cell.y}`][0])) {
                    this.$log.debug('can  go down');
                    let bottomChild = this.cells[`${node.cell.x + 1}-${node.cell.y}`];
                    node.children.push(this.node(node, bottomChild, []))
                }
            }
            if (this.$refs[`${node.cell.x - 1}-${node.cell.y}`] !== 'undefined') {
                if (!this.hasBodyPart(this.$refs[`${node.cell.x - 1}-${node.cell.y}`][0])) {
                    this.$log.debug('can go up');
                    let topChild = this.cells[`${node.cell.x - 1}-${node.cell.y}`];
                    node.children.push(this.node(node, topChild, []))
                }
            }

        },
        node(parent, cell, children) {
            return {
                parent,
                cell,
                children, // array of children
            }
        },
        hasBodyPart(div) {
            for (let i = 0; i < div.childNodes.length; i++) {
                if (div.childNodes[i].classList.value.includes('snake-body')) {
                    return true
                }
            }
            return false
        }
    }
}
