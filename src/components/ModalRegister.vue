<template>
  <div class="modal fade" id="registro">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Regístrate</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="register(email, password, name, repassword)">
            <!-- Name -->
            <div class="input-group mb-3">
            <span class="input-group-text">Nombre</span>
            <input v-model="name" 
                    type="text"
                    required="true"
                    class="form-control">
            </div>  
            <!-- Email -->
            <div class="input-group mb-3">
            <span class="input-group-text">Correo</span>
            <input v-model="email" 
                    type="email"
                    required="true"
                    class="form-control">
            </div>
            <!-- Password -->
            <div class="input-group mb-3">
            <span class="input-group-text">Contraseña</span>
            <input v-model="password" 
                    type="password"
                    required="true" 
                    class="form-control">
            </div>
            <!-- Repeat Password -->
            <div class="input-group mb-3">
            <span class="input-group-text">Repite Contraseña</span>
            <input v-model="repassword" 
                    type="password"
                    required="true" 
                    class="form-control">
            </div>
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Registrar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default {
  name: 'ModalRegister',

  data() {
    return {
      name: '',
      email: '',
      password: '',
      repassword: '',
      errorMessage: ''
    };
  },

  methods: {
    register(email, password, name, repassword) {
    if (password == repassword) {
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(userCredential.user, { displayName: name })
            alert('¡Registrado!');
          })
          .catch((error) => {
              const errorCode = error.code;
              this.errorMessage = error.message;
              alert(this.errorMessage);
          });
    } else {
      alert("Error: Contraseñas no coinciden")
    }
    },
  }
}
</script>