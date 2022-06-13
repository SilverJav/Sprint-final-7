import Vue from 'vue'
import Vuex from 'vuex'
import { collection, getDocs } from 'firebase/firestore/lite'
import { db } from "../main"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    courses: [],
    usuario: null,
  },

  mutations: {
    SET_USUARIO(state, payload){
      state.usuario = payload
      console.log(state.usuario)
    },

    SET_USER(state, newUser) {
      state.user = newUser
    },

    SET_COURSES(state, data) {
      state.courses = data
    },

    DELETE_COURSE(state, id){
      let newList = state.courses.filter((item) => item.id !== id);
      state.courses = newList
    }
  },

  // Recibe datos de onAuthStateChanged (main.js)
  actions: {
    detectarUsuario({commit}, usuario){
      commit('SET_USUARIO', usuario)
    },

    subscribeToAuthStateChange(context) {
      const auth = getAuth();
      auth.onAuthStateChanged((user) => {
        context.commit('SET_USER', user || null)
      })
    },

    // Obtener data de Firebase
    async getData(context) {
      const querySnapshot = await getDocs(collection(db, "courses"));
      let courses = []
      querySnapshot.forEach((doc) => {
        let course = doc.data()
        course.id = doc.id
        courses.push(course)
      });
      context.commit('SET_COURSES', courses)
    },
  },

  // Devuelve true/false si existe un usuario
  getters: {
    existeUsuario(state){
      if(state.usuario === null){
        return false;
      } else{
        return true;
      }
    },

    nameDisplay(state, getters){
     return state.usuario.displayName
    }
  },

  modules: {
  }
})
