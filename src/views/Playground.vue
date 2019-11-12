<template>
  <div class="home info lighten-2" >
    <v-row class="d-flex flex-wrap">
      <v-col cols="12"
             class="d-flex justify-center my-4">
        snake game
      </v-col>

      <v-col cols="12"
             class="d-flex justify-center align-center my-2 board-container">
        <div ref="board"></div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'playground',
  components: {
  },
  data: () => ({
    boardWidth: 50, // means 50 cell not 50px
    boardHeight: 50,
    cellWidth: 6, // means each cell width is 2px
    cellHeight: 6
  }),
  methods: {
    makeBoardGame() {
      this.initBoard()
    },
    initBoard() {
      let board = this.$refs.board
      board.style.width = `${this.boardWidth * this.cellWidth}px`;
      board.style.height = `${this.boardHeight * this.cellHeight}px`;
      board.style.background = 'red'
    }
  },
  mounted() {
    this.makeBoardGame()
  }
}
</script>

<style lang="scss">
  .home {
    height: 100%;
    width: 100%;
  }

  .board-container {
    min-height: 45vh;
  }

</style>
