<script>
import ErrorMessage from "@/components/ErrorMessage.vue";
export default{
  components: {
    ErrorMessage
  },
  data(){
    return{
      email: "",
      password: "",
      errore: ""
    }
  },
  methods:{
    async login(){
      //dispatch dell'action
      try {
        if(this.password.trim() === "" || this.email.trim() === ""){
          throw new Error("Invalid credentials");
        }
        await this.$store.dispatch('user/login', {
          email: this.email.trim(),
          password: this.password.trim(),
        });
        if(this.$store.getters["getIsAuthenticated"]){
          this.$router.push("/");
        }
      } catch (error) {
        this.errore = error;
      }
    }
  }
}

</script>

<template>

    <div class="flex flex-col items-center">
        <h1 class="text-3xl text-black font-bold mt-4">Login</h1>
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
        <input v-model="email" type="email" class="w-52 h-8 bg-gray-200 shadow-md rounded-lg text-black flex placeholder:ml-4 placeholder:p-2" placeholder="Inserisci la tua E-mail">
        <input v-model="password" type="password" class="w-52 h-8 bg-gray-200 shadow-md rounded-lg text-black flex placeholder:ml-4 placeholder:p-2" placeholder="Inserisci la tua Password">
        <button @click="login" class="w-52 h-8 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mt-8">Log in</button>
        <ErrorMessage :message="errore" class="rounded-lg" v-if="errore"></ErrorMessage>
    </div>
    
    </div>
    <!-- <p class="place-self-center pt-4"><a href="" class="underline text-gray-800" >Hai dimenticato la password?</a></p> -->
    <p class="place-self-center pt-2">Non hai un account? <router-link to="/register" class="underline text-gray-800">Registrati</router-link></p>
    <p class="place-self-center pt-2">Gestisci un servizio? <router-link to="/gds/login" class="underline text-gray-800">clicca qui per fare il login</router-link></p>
    <!-- <p class="place-self-center pt-2"><router-link to="/admin/login">admin</router-link></p> -->

  </div>
</template>

<style>

</style>
