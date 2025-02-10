<script>
import ErrorMessage from '@/components/ErrorMessage.vue';
export default{
  components:{
    ErrorMessage
  },
  data(){
    return{
      email: "",
      password: "",
      passwordRepeat: "",
      errore: ""
    }
  },
  methods:{
    async register(){
      
      //dispatch dell'action
      try {
        if(this.password.trim() === "" || this.passwordRepeat.trim() === "" || this.email.trim() === "" || this.password.trim() != this.passwordRepeat.trim()){
          throw new Error("Invalid credentials");
        }
        await this.$store.dispatch('user/register', {
          email: this.email.trim(),
          password: this.password.trim(),
        });
        window.alert("Registrazione avvenuta con successo");
      } catch (error) {
        this.errore = error;
      }
    }
  }
}
</script>

<template> 
<div class="flex flex-col items-center">
        <h1 class="text-3xl text-black font-bold mt-4">Register to</h1>
        <img
            src="/src/assets/trentus-text-logo.svg"
            alt="logo_trentus"
            class=""
        />
    </div>
  
  <div class="mt-12 place-self-center items-center justify-center min-h-screen bg-gray-100 ">
    <div
      class="inline-flex flex-col items-center justify-center w-[400px] max-w-md p-4 bg-white rounded-lg shadow-md"
    >
    <div class="flex flex-col grid-flow-col grid-cols-1 gap-2 mt-8">
        <input v-model="email" type="email" class="w-52 h-8 bg-gray-200 shadow-md rounded-lg text-black flex placeholder:ml-4 placeholder:p-2" placeholder="Insert your Email">
        <input v-model="password" type="password" class="w-52 h-8 bg-gray-200 shadow-md rounded-lg text-black flex placeholder:ml-4 placeholder:p-2" placeholder="Insert your Password">
        <input v-model="passwordRepeat" type="password" class="w-52 h-8 bg-gray-200 shadow-md rounded-lg text-black flex placeholder:ml-4 placeholder:p-2" placeholder="Repeat your Password">
        <ErrorMessage :message="errore" class="rounded-lg w-52" v-if="errore"></ErrorMessage>
        <button @click="register" class="w-52 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mt-8">Register</button>
      </div>
    </div>
    <p class="place-self-center pt-4">Do you manage a service?</p>
    <p class="place-self-center"><router-link to="/register/gds" class="underline text-gray-800" >Register your service to Trentus</router-link></p>
    <p class="place-self-center pt-2">Already have an account? <router-link to="/login" class="underline text-gray-800">Login</router-link></p>
  </div>
    
</template>