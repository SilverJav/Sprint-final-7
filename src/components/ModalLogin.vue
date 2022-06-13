<template>
  <div class="modal fade" id="login">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Iniciar de sesión</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="login(email, password)">
            <!-- Email --> 
            <div class="input-group mb-3">
              <span class="input-group-text">Correo</span>
              <input v-model="email" type="email" required="true" class="form-control">
            </div>
            <!-- Password --> 
            <div class="input-group mb-3">
              <span class="input-group-text">Contraseña</span>
              <input v-model="password" type="password" required="true" class="form-control">
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Iniciar sesión</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: 'ModalLogin',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    login(email, password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          alert('¡Sesión iniciada!');
          })
      .catch((error) => {
          const errorCode = error.code;
        this.errorMessage = error.message;
        alert(this.errorMessage);
      });
    },
  }
}
</script>