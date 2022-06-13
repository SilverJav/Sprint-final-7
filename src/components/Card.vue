<template>
  <div>
    <div class="container mb-5">
      <div class="row d-flex justify-content-center">
        <template v-if="courses.length === 0">
          <h1 class="card-title fw-bold mt-5">Cargando Listado de cursos 🙂</h1>
          <div class="spinner-border text-primary m-3" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </template>
        <template v-else>
          <div v-for="(c, index) in courses" :key="index" class="card m-3 shadow p-3 mb-5 bg-body rounded" style="width: 22rem;">
            <router-link :to="c.id">
              <img v-bind:src="c.img" class="card-img-top" style="max-height: 200px;" v-bind:alt="c.name">
              <div class="card-body"  :class="{ active: !c.state }">
                <h5 class="card-title fw-bold">{{ c.name }}</h5>
                <p class="card-text m-1">{{ c.description }}</p>
                <p class="card-text m-1">Duración: {{ c.duration }}</p>
                <p class="card-text">Precio: $ {{ c.price }}</p>
                <a v-if="existeUsuario" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="setCourse(c)">Editar Curso</a>
              </div>
            </router-link>
          </div>
        </template>
      </div>
    </div>
    <ModalAdm :data="course"/>
  </div>
</template>

<script>
import ModalAdm from '@/components/ModalAdm.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Card',

  components: {
      ModalAdm,
  },

  props: {
    courses: {
      type: Array,
      required: true
    },
  },

  data(){
    return {
      course: {},
    }
  },

  methods: {
    setCourse(course){
      this.course = course
    },
  },

  computed: {
    ...mapGetters(['existeUsuario'])
  }
}
</script>

<style scoped>
.card > a {
  text-decoration: none;   
  color: black
}

.active {
  color: red;
}
</style>