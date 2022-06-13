<template>
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-primary" id="exampleModalLabel">Detalles del curso</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <div class="container my-0">
            <form>
              <!-- Code -->
              <div class="input-group mb-3">
                <span class="input-group-text bg-danger text-white">Codigo</span>
                <input v-model.number="data.code" type="number" class="form-control"/>
              </div>
              <!-- Name -->
              <div class="input-group mb-3">
                <span class="input-group-text">Nombre</span>
                <input v-model="data.name" type="text" class="form-control" />
              </div>
              <!-- Estate -->
              <div class="input-group mb-3">
                <span class="input-group-text">Estado</span>
                <select v-model="data.state" class="form-select">
                  <option :value="true">Activo</option>
                  <option :value="false">Inactivo</option>
                </select>
              </div>
              <!-- Price -->
              <div class="input-group mb-3">
                <span class="input-group-text">Precio</span>
                <input v-model.number="data.price" type="number" class="form-control"/>
              </div>
              <!-- Duration -->
              <div class="input-group mb-3">
                <span class="input-group-text">Duracion</span>
                <input v-model="data.duration" type="text" class="form-control" />
              </div>
              <!-- Description -->
              <div class="input-group mb-3">
                <span class="input-group-text">Descripción</span>
                <input v-model="data.description" type="text" class="form-control"/>
              </div>
              <!-- Cupos -->
              <div class="input-group mb-3">
                <span class="input-group-text">Cupos</span>
                <input v-model.number="data.cupos" type="number" class="form-control"/>
              </div>
              <!-- Inscritos -->
              <div class="input-group mb-3">
                <span class="input-group-text">Inscritos</span>
                <input v-model.number="data.inscritos" type="number" class="form-control"/>
              </div>
              <!-- Image -->
              <div class="input-group mb-3">
                <span class="input-group-text">Imagen</span>
                <input v-model="data.img" type="text" class="form-control" />
              </div>
              <!-- <img :src="data.img" class="rounded mx-auto d-block" alt="..."> -->
            </form>
          </div>
        </div>

        <div class="modal-footer">
          <!-- Buttons Action -->
          <button v-if="existeUsuario" type="button" class="btn btn-danger" data-bs-dismiss="modal" @click.prevent="deleteCourse(data.id)">Eliminar Curso</button>
          <button v-if="existeUsuario" type="button" class="btn btn-success" data-bs-dismiss="modal" @click.prevent="updateCourse(data.id)">Guardar cambios</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from "../main";
import { deleteDoc, doc, updateDoc} from "firebase/firestore/lite";
import "firebase/firestore";

export default {
  name: "ModalMovie",

  props: {
    data: {
      type: Object,
    },
  },

  methods: {
    async updateCourse(id) {
      let option = confirm("¿Desea actualizar el curso?");
      if (option === true) {
        await updateDoc(doc(db, "courses", id), {
          code: this.data.code,
          name: this.data.name,
          state: this.data.state,
          price: this.data.price,
          duration: this.data.duration,
          description: this.data.description,
          cupos: this.data.cupos,
          inscritos: this.data.inscritos,
          img: this.data.img,
      })
        .then(() => {
          console.log("Documento actualizado");
        })
        .catch(function (error) {
          console.error("Error al añadir el documento: ", error);
        });
      alert("Curso actualizado correctamente")
      } else {
        alert("Acción cancelada")
      }
    },

    async deleteCourse(id) {
      let option = confirm("¿Desea eliminar el curso?");
      if (option === true) {
        console.log(id);
        await deleteDoc(doc(db, "courses", id));
        alert("Curso eliminado correctamente")
        this.$store.commit('DELETE_COURSE', id)
      } else {
        alert("Acción cancelada")
      }
    },
  },

  computed: {
    ...mapGetters(['existeUsuario'])
  }
};
</script>
