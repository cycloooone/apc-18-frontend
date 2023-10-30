<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <BoardComp />
  </div>
</template>

<script>
// @ is an alias to /src
import BoardComp from '@/components/BoardComp.vue'

export default {
  name: 'HomeView',
  components: {
    BoardComp
  }
}
</script>
