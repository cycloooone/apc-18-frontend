
    


<template>
    
    <div>
      <h1 class="my-8">Users</h1>   
    <v-card>
    <v-btn block large color="blue" @click.stop="openAddUserDialog">
          Add user
        </v-btn>

      <v-card-text>
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="USERS"
        class="elevation-1 primary blue"
      >
      
        <template v-slot:[`item.role_name`]="{ item }">
          <v-chip :color="getColor(item.role_name)" dark>{{ item.role_name }}</v-chip>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon size="small" class="me-2" @click="editUser(item)">mdi-pencil</v-icon>
          <v-icon size="small" @click="confirmDeleteUser(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card-text>
   
    </v-card>

      <!-- Edit User Dialog -->
      <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
          <v-card-title class="text-h5 mt-5 ml-3">Edit User</v-card-title>
          <v-card-text>
            <v-text-field v-model="editedUser.username" label="Username" style="opacity: 70%;" readonly outlined
      ></v-text-field>
            <v-select
              v-model="editedUser.role_name"
              :items="['admin', 'user', 'author']"
              label="Role"
            ></v-select>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red-darken-1" variant="text" @click="cancelEditUser">Cancel</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveUser">Save</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Delete User Dialog -->
      <v-dialog v-model="deleteConfirmationDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this user?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="cancelDeleteUser">Cancel</v-btn>
          <v-btn color="red" @click="deleteUser">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Add User Dialog -->

    <v-dialog v-model="addUserDialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Add User</v-card-title>
        <v-card-text>
          <v-text-field v-model="newUser.username" label="Username"></v-text-field>
          <v-select
            v-model="newUser.role_name"
            :items="['admin', 'user', 'author']"
            label="Role"
          ></v-select>
          <v-text-field v-model="newUser.password" label="Password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red-darken-1" variant="text" @click="cancelAddUser">Cancel</v-btn>
          <v-btn color="green" @click="addUser">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    
  
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  import axios from "axios";
  export default {
    data() {
      return {
        itemsPerPage: 10,
        headers: [
          {
            title: "Username",
            align: "center",
            sortable: false,
            key: "username",
            class: "blue",
          },
          { title: "Role", align: "center", key: "role_name", sortable: false},
          { text: "Actions", value: "actions", sortable: false, },
        ],
        editDialog: false, // Dialog for editing user
        editedUser: {
          username: "",
          role_name: "",
        },
        flag1: true,
        deleteConfirmationDialog: false,
        addUserDialog: false,
        newUser: {
        username: "",
        role_name: "",
        password: "",
      },
      };
    },
    computed: {
      ...mapGetters(["USERS"]),
    },
    created() {
        if(this.USERS.length === 0){
            this.GET_USERS()
        }
        
    },
    methods: {
      ...mapActions(["GET_USERS"]),
      getColor(role_name) {
        if (role_name == "admin") {
          return "light-green-darken-3";
        } else if (role_name == "user") {
          return "amber";
        } else if (role_name == "author") {
          return "pink";
        }
      },
      editUser(user) {
        this.editedUser = { ...user };
        this.editDialog = true;
      },
      cancelEditUser() {
        this.editDialog = false;
      },
      async saveUser() {
        // Implement user save/update logic here
        // You can call an action to save/update the user in the Vuex store
        if(this.editedUser.username && this.editedUser.role_name){
            try{

                await axios.put(`http://localhost:3000/updateUserRole/${this.editedUser.username}`, { role_name: this.editedUser.role_name });
            } catch(e){
                console.log(e)
                throw e
            } finally{
                this.GET_USERS();
            }
        }
        
        this.editDialog = false;
      },
      confirmDeleteUser(user) {
      this.userToDelete = user;
      this.deleteConfirmationDialog = true;
    },
    cancelDeleteUser() {
      this.deleteConfirmationDialog = false;
    },
    async deleteUser() {
      if (this.userToDelete) {
        try{
            await axios.delete(`http://localhost:3000/users/${this.userToDelete.username}`) 
        } catch(e){
            console.log(e)
            throw e
        } finally{
            this.GET_USERS();
        }
        this.userToDelete = null;
            this.deleteConfirmationDialog = false;
        
      }
    },

    openAddUserDialog() {
      this.newUser = {
        username: "",
        role_name: "",
        password: "",
      };
      this.addUserDialog = true;
    },
    cancelAddUser() {
      this.newUser = {
        username: "",
        role_name: "",
      };
      this.addUserDialog = false;
    },
    async addUser() {
      if (this.newUser.username && this.newUser.role_name && this.newUser.password) {
        
        try {
            let bind = {
                "username": this.newUser.username,
                "password": this.newUser.password,
                "role_name": this.newUser.role_name
            }
            await axios.post(`http://localhost:3000/api/register`, bind)
            .then(() => {
            console.log('Registration successful');
        })
        .catch(error => {
            console.error('Error:', error);
        });
        }catch(err){
            console.log(err)
        }
        finally{
            this.GET_USERS()
            console.log('works')
        }
        
        this.newUser = {
          username: "",
          role_name: "",
          password: "",
        };
        this.addUserDialog = false;
      }



    

    },
    },
  };
  </script>

<style scoped>
</style>