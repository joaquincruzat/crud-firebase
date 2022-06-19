<template>
  <v-app>
    <v-body class="background">
      <v-container class="table">
        <v-data-table dark :headers="headers" :items="users">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Lista de Usuarios</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog
                v-model="dialog"
                max-width="500px"
                transition="dialog-top-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    Nuevo Usuario
                  </v-btn>
                </template>
                <v-card color="blue lighten-4">
                  <v-card-title>
                    <span class="text-h5"></span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="updatedItem.name"
                            label="Nombre"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="updatedItem.email"
                            label="Email"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.update`]="{ item }">
            <v-icon small class="mr-2" @click="updateItem(item)">
              mdi-pencil
            </v-icon>
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-container>
    </v-body>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export default {
  mounted() {
    this.$store.dispatch("getUsers");
  },
  computed: {
    ...mapState(["users"]),
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nombre", value: "data.name" },
      { text: "Correo electrónico", value: "data.email" },
      { text: "Editar", value: "update" },
      { text: "Eliminar", value: "delete" },
    ],
    updatedIndex: "",
    updatedItem: {},
  }),

  methods: {
    updateItem(item) {
      this.updatedIndex = item.id;
      this.updatedItem = Object.assign({}, item.data);
      this.dialog = true;
    },

    async deleteItem({ id }) {
      const db = getFirestore();
      await deleteDoc(doc(db, "users", id));
      this.updatedIndex = "";
      this.updatedItem = {};
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      try {
        const { updatedItem: user, updatedIndex } = this;
        const db = getFirestore();

        if (!updatedIndex) {
          await addDoc(collection(db, "users"), user);
        } else {
          const userRef = doc(db, "users", updatedIndex);
          await updateDoc(userRef, user);
        }
        this.updatedIndex = "";
        this.updatedItem = {};
        this.close();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
.background {
  background-image: url("assets/fondo.jpg");
  width: 100vw;
  height: 100vh;
}
.table {
  align-self: center;
  justify-self: center;
  margin-top: 100px;
}
</style>
