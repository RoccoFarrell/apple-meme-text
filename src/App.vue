<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    <main>
      <v-content>
        <v-container fluid>
          <v-slide-y-transition mode="out-in">

            <v-layout align-center row wrap>
                <v-flex xs12>
                  <v-card color="cyan darken-4" class="white--text">
                    <v-card-title primary-title>
                      <div>
                        <h3 class="headline mb-0">Db contents</h3>

                      </div>
                    </v-card-title>
                    <v-card-text>
                      <p v-for="user of users">
                        {{user.name}}
                      </p>
                    </v-card-text>
                  </v-card>
                </v-flex>

              <v-flex xs12>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  label="Name"
                  v-model="name"
                  :rules="nameRules"
                  :counter="10"
                  required
                ></v-text-field>
                <v-text-field
                  label="E-mail"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-select
                  label="Item"
                  v-model="select"
                  :items="items"
                  :rules="[v => !!v || 'Item is required']"
                  required
                ></v-select>
                <v-checkbox
                  label="Do you agree?"
                  v-model="checkbox"
                  :rules="[v => !!v || 'You must agree to continue!']"
                  required
                ></v-checkbox>

                <v-btn
                  @click="submit"
                  :disabled="!valid"
                >
                  submit
                </v-btn>
                <v-btn @click="clear">clear</v-btn>
              </v-form>
              </v-flex>
            </v-layout>

          </v-slide-y-transition>
        </v-container>
      </v-content>
    </main>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      app
    >
      <v-list>
        <v-list-tile @click.native="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>



<script>
  import {db} from './firebase';
  console.log(db);
  export default {
    data: () => ({
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'bubble_chart', title: 'Inspire' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      valid: true,
      users: {},
      name: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v && v.length <= 10 || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: false
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()){
          // Native form submission is not yet supported
            this.$firebaseRefs.users.push({
              name: this.name,
              email: this.email,
              select: this.select,
              checkbox: this.checkbox
            })
/*
          axios.post('/api/submit', {
            name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
*/
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    },
    firebase: {
      users: {
        source: db.ref('users'),
        // Optional, allows you to handle any errors.
        cancelCallback(err) {
          console.error(err);
        }
      }
  }
  }
</script>
