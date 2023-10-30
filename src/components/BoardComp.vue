<template>
    <v-container fluid>
      <v-layout justify-center>
        <v-flex xs12>
          <v-container fluid>
            <v-layout wrap>
              <v-flex
                v-for="(list, index) in board.lists"
                :key="index"
                class="list-container"
                xs12
                sm4
              >
                <v-card class="list">
                  <v-card-title>
                    {{ list.title }}
                    <v-spacer></v-spacer>
                    <v-icon @click="addCard(index)">mdi-plus</v-icon>
                  </v-card-title>
                  <v-card-text>
                    <v-list>
                      <v-list-item
                        v-for="(card, cardIndex) in list.cards"
                        :key="cardIndex"
                      >
                        <v-list-item-content>
                          {{ card.title }}
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-btn @click="editCard(index, cardIndex)">Edit</v-btn>
                          <v-btn @click="deleteCard(index, cardIndex)">Delete</v-btn>
                        </v-list-item-action>
                      </v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        board: {
          lists: [
            {
              title: "To Do",
              cards: [
                { title: "Task 1" },
                { title: "Task 2" },
              ],
            },
            {
              title: "In Progress",
              cards: [
                { title: "Task 3" },
              ],
            },
            {
              title: "Done",
              cards: [
                { title: "Task 4" },
                { title: "Task 5" },
              ],
            },
          ],
        },
      };
    },
    methods: {
      addCard(listIndex) {
        const cardTitle = prompt("Enter card title:");
        if (cardTitle) {
          this.board.lists[listIndex].cards.push({ title: cardTitle });
        }
      },
      editCard(listIndex, cardIndex) {
        const cardTitle = prompt("Edit card title:", this.board.lists[listIndex].cards[cardIndex].title);
        if (cardTitle) {
          this.board.lists[listIndex].cards[cardIndex].title = cardTitle;
        }
      },
      deleteCard(listIndex, cardIndex) {
        if (confirm("Are you sure you want to delete this card?")) {
          this.board.lists[listIndex].cards.splice(cardIndex, 1);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .list-container {
    padding: 16px;
  }
  .list {
    margin: 8px;
    min-width: 300px;
  }
  </style>
  