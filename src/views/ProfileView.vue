<template>
  <h1> {{ this.username }}</h1>
  <h2> {{ this.role_name }}</h2>
  <v-btn @click="logout">
    Log out
  </v-btn>
</template>


<script>
export default {
    data() {
        return {
            username: sessionStorage.getItem('username'),
            role_name: sessionStorage.getItem('role_name')
        }
    },
    methods: {
        logout(){
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('role_name')
            this.$router.push('/')
        }
    }
}
</script>
