import './firebase';

import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueFire from 'vuefire'
import firebase from 'firebase'
import './stylus/main.styl'

Vue.use(Vuetify)
Vue.use(VueFire)
Vue.use(firebase)


//var db = firebaseApp.database()

new Vue({
  el: '#app',
  /*
  firebase: {
    // simple syntax, bind as an array by default
    anArray: db.ref('url/to/my/collection'),
    // can also bind to a query
    // anArray: db.ref('url/to/my/collection').limitToLast(25)
    // full syntax
    anObject: {
      source: db.ref('users'),
      // optionally bind as an object
      asObject: true,
      // optionally provide the cancelCallback
      cancelCallback: function () {},
      // this is called once the data has been retrieved from firebase
      readyCallback: function () {}
    }
  },
  */
  render: h => h(App)
})
