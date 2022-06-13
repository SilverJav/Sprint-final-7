<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Academa ONline</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <router-link to="/" class="nav-link" aria-current="page"><li class="nav-item">Inicio</li></router-link>
            <router-link v-if="existeUsuario" to="/add-course" class="nav-link" aria-current="page"><li class="nav-item">Añadir Curso</li></router-link>
          </ul>
          <!-- Iniciar sesión --> 
          <button v-if="!existeUsuario" type="button" class="btn btn-outline-primary mx-2" data-bs-toggle="modal" data-bs-target="#login">
            Iniciar Sesión
          </button>
          <!-- Nombre usuario -->
          <span v-if="existeUsuario" class="text-white m-2"> Bienvenido {{ nameDisplay }} </span>
          <!-- Cerrar sesión -->   
          <button v-if="existeUsuario" class="btn btn-outline-danger me-2" @click="signout">
            Cerrar Sesión
          </button>
          <!-- Regístrate --> 
          <button v-if="!existeUsuario" type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#registro">
            Regístrate
          </button>
        </div>
      </div>
    </nav>
    <ModalRegister />
    <ModalLogin />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAuth, signOut } from "firebase/auth";
import ModalRegister from '@/components/ModalRegister.vue'
import ModalLogin from '@/components/ModalLogin.vue'

export default {
  name: 'Navbar',

  components: {
    ModalRegister,
    ModalLogin,
  },

  data(){
    return{
      name: '',
      email: '',
      password: '',
      repassword: '',
      errorMessage: '',
    };
  },

  methods: {
    signout(){
      const auth = getAuth();
      signOut(auth).then(() => {
        alert('¡Sesión cerrada! Vuelve pronto');
        }).catch((error) => {
      });
    },
  },  

  computed: {
    ...mapGetters(['existeUsuario', 'nameDisplay']),  
  }
}
</script>