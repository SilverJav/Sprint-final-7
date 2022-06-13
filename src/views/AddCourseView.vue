<template>
  <div class="container">
    <h1 class="m-3">Administración de cursos</h1>
    <div class="container my-0">
      <form>
        <!-- Code -->
        <div class="input-group mb-3">
          <span class="input-group-text bg-danger text-white">Codigo</span>
          <input v-model.number="course.code" type="number" class="form-control"/>
        </div>
        <!-- Name -->
        <div class="input-group mb-3">
          <span class="input-group-text">Nombre</span>
          <input v-model="course.name" type="text" class="form-control" />
        </div>
        <!-- Estate -->
        <div class="input-group mb-3">
          <span class="input-group-text">Estado</span>
          <select v-model="course.state" class="form-select">
            <option :value="true">Activo</option>
            <option :value="false">Inactivo</option>
          </select>
        </div>
        <!-- Price -->
        <div class="input-group mb-3">
          <span class="input-group-text">Precio</span>
          <input v-model.number="course.price" type="number" class="form-control"/>
        </div>
        <!-- Duration -->
        <div class="input-group mb-3">
          <span class="input-group-text">Duracion</span>
          <input v-model="course.duration" type="text" class="form-control" />
        </div>
        <!-- Description -->
        <div class="input-group mb-3">
          <span class="input-group-text">Descripción</span>
          <input v-model="course.description" type="text" class="form-control"/>
        </div>
        <!-- Cupos -->
        <div class="input-group mb-3">
          <span class="input-group-text">Cupos</span>
          <input v-model.number="course.cupos" type="number" class="form-control"/>
        </div>
        <!-- Inscritos -->
        <div class="input-group mb-3">
          <span class="input-group-text">Inscritos</span>
          <input v-model.number="course.inscritos" type="number" class="form-control"/>
        </div>
        <!-- Image -->
        <div class="input-group mb-3">
          <span class="input-group-text">Imagen</span>
          <input v-model="course.img" type="text" class="form-control" />
        </div>
        <div class="btn-group" role="group" aria-label="Basic example">
          <button type="reset" class="btn btn-danger">Limpiar</button>
          <button type="button" class="btn btn-success" @click.prevent="addCourse(course)">Añadir curso</button>
        </div>
      </form>
    </div>
  </div>  
</template>

<script>
import { collection, addDoc } from 'firebase/firestore/lite'
import { db } from "../main"

export default {
  name: 'AddCourseView',

  data(){
    return {
      course: {}
    }
  },

  methods: {
    async addCourse(course){
      const docRef = await addDoc(collection(db, "courses"), {
        code: course.code,
        name: course.name,
        state: course.state,
        price: course.price,
        duration: course.duration,
        description: course.description,
        cupos: course.cupos,
        inscritos: course.inscritos,
        img: course.img,
      })
        .then(() => {
          console.log("Documento añadido");
        })
        .catch(function(error) {
          console.error("Error al añadir el documento: ", error);
        });
      alert("Curso añadido exitosamente")
      this.course = {}
    },
  }
}
</script>
