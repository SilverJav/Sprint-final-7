<template>
  <div class="container">
    <h1 class="m-3">Cursos Disponibles</h1>
    <Card :courses="coursesList" />
  </div>
</template>

<script>
import Card from '@/components/Card.vue'

export default {
  name: 'HomeView',
  components: {
    Card,
  },

  methods:{
    // // Obtener data de Firebase
    // async getData() { 
    //   const querySnapshot = await getDocs(collection(db, "courses"));
    //     querySnapshot.forEach((doc) => {
    //       let course = doc.data()
    //       course.id = doc.id
    //       this.$store.commit('SET_COURSES', course)
    //       // this.courses.push(course)
    //   });
    // },
  },

  computed: {
    coursesList(){
      return this.$store.state.courses
    }
  },

  created() {
    this.$store.dispatch('getData')
  },
}
</script>
