<template>
    <v-form style="margin-top: 20px;"
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  @keydown.enter="validate"
                  v-model="username"
                  :rules="loginRules"
                  label="Логин"
                  required
                ></v-text-field>
                <v-text-field
                  @keydown.enter="validate"
                  v-model="pass"
                  :rules="passRules"
                  label="Пароль"
                  required
                  type="password"
                  class="mb-5"
                ></v-text-field>
                <v-btn
                  :disabled="!valid"
                  color="#82bbd7"
                  dark
                  class="cta mb-5"
                  @click="validate"
                >
                  Вход
                </v-btn>
              </v-form>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
  
    
  
    data: () => ({
        valid: true,
        username: '',
      loginRules: [
          v => !!v || 'Логин обязателен!'
        ],
      pass: '',
      passRules: [
          v => !!v || 'Пароль обязателен!',
        ],
    }),
    methods: {
      validate () {
          if(this.$refs.form.validate()) {
            this.sendLogin()
          }
          else{
            console.log('error')
          }
      },
    async sendLogin(){
        await axios.post(`http://localhost:3000/api/login`, {
            username: this.username,
            password: this.pass
        }
        ).then(async login => {
            console.log(login.data.data.access_token)
            console.log(login.data.data.username)
            console.log(login.data.data.role_name)

            sessionStorage.setItem('token', login.data.data.access_token)
            sessionStorage.setItem('username', login.data.data.username)
            sessionStorage.setItem('role_name', login.data.data.role_name)
            this.$router.push('/')


        })
    
      }
  
    }
  }
  </script>
  