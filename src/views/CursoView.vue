<template>
  <div class="container">
    <h1 class="m-3">Detalles del Curso</h1>
    <div class="text-center">
      <img :src="course.img" class="rounded" alt="...">
    </div>
    <form class="m-5">
      <!-- Code -->
      <div class="input-group mb-3">
        <span class="input-group-text bg-danger text-white">Codigo</span>
        <input disabled v-model.number="course.code" type="number" class="form-control"/>
      </div>
      <!-- Name -->
      <div class="input-group mb-3">
        <span class="input-group-text">Nombre</span>
        <input disabled v-model="course.name" type="text" class="form-control" />
      </div>
      <!-- Estate -->
      <div class="input-group mb-3">
        <span class="input-group-text">Estado</span>
        <select disabled v-model="course.state" class="form-select">
          <option :value="true">Activo</option>
          <option :value="false">Inactivo</option>
        </select>
      </div>
      <!-- Price -->
      <div class="input-group mb-3">
        <span class="input-group-text">Precio</span>
        <input disabled v-model.number="course.price" type="number" class="form-control"/>
      </div>
      <!-- Duration -->
      <div class="input-group mb-3">
        <span class="input-group-text">Duracion</span>
        <input disabled v-model="course.duration" type="text" class="form-control" />
      </div>
      <!-- Description -->
      <div class="input-group mb-3">
        <span class="input-group-text">Descripción</span>
        <input disabled v-model="course.description" type="text" class="form-control"/>
      </div>
      <!-- Cupos -->
      <div class="input-group mb-3">
        <span class="input-group-text">Cupos</span>
        <input disabled v-model.number="course.cupos" type="number" class="form-control"/>
      </div>
      <!-- Inscritos -->
      <div class="input-group mb-3">
        <span class="input-group-text">Inscritos</span>
        <input disabled v-model.number="course.inscritos" type="number" class="form-control"/>
      </div>
    </form>
  </div>
</template>

<script>
// import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs, doc, getDoc } from 'firebase/firestore/lite'
import { db } from "../main"

export default {
name: 'CourseView',

  data(){
    return {
      id: this.$route.params.id,
      course: {}
    }
  },

  methods:{
  // Obtener data de Firebase
    //  getData() { 
    //   const querySnapshot = await getDocs(collection(db, "courses"));
    //     querySnapshot.forEach((doc) => {
    //       let course = doc.data()
    //       course.id = doc.id
    //       this.courses.push(course)
    //   });

     
    // },


    async getDocument() {
      // const document = await db.collection("courses").doc("MK3r6IdRZN99wYhlW8K1").get();
      const docRef = doc(db, "courses", this.id);
      // console.log(document)
const docSnap = await getDoc(docRef);
// console.log(docRef)
// console.log(docSnap)

if (docSnap.exists()) {
this.course = docSnap.data()
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
    }
  },

  created() {
    console.log(this.id.id)
    this.getDocument();
  },

}
</script>
