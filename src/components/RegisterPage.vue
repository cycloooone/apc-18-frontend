<template>
    <v-card>
    <v-card-title style="background-color: #1976d2;"> 
        Добавить пользователя
    </v-card-title>
    <br/>
    <v-card-text>
        <v-text-field
            v-model="username"
            label="Логин"
            autocomplete="off"
            required
            outlined
        ></v-text-field>
        <v-text-field
            v-model="password"
            label="Пароль"
            autocomplete="off"
            type="password"
            required
            outlined
        ></v-text-field>
        <v-select
            required
            outlined
            v-model="role_name"
            :items="roles"
            label="Роль"
        ></v-select>
        <!-- :rules="selectRules" -->
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="green"
            text
            @click="createUser()"
        >
            Сохранить
        </v-btn>
    </v-card-actions>
</v-card>

</template>   

<script>
import axios from 'axios'
export default {
    data: () => ({

        id: "",
        username: "",
        password: "",
        role_name: "",
        roles: ['user', 'author', 'admin'],
        
    }),
    methods: {
        async createUser(){
            let bind = {
                "username": this.username,
                "password": this.password,
                "role_name": this.role_name
            }
            try {
                await axios.post(`http://localhost:3000/api/register`, bind)
                .then(() => {
    console.log('Registration successful');
    this.$router.push('/login');
  })
  .catch(error => {
    console.error('Error:', error);
  });
                
            }
            catch(err){
                console.log(err)
            }
            finally{
                this.$router.push('/login')
            }
            
        },
        
    },


}





</script>

