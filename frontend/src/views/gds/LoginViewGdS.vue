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
        await this.$store.dispatch('gds/login', {
          email: this.email.trim(),
          password: this.password.trim(),
        });
        if(this.$store.getters["getIsAuthenticated"]){
          this.$router.push("/gds/"+this.$store.getters["gds/getServiceId"]);
        }
      } catch (error) {
        this.errore = error;
      }
    }
  },
}

</script>

<template>

    <div class="flex flex-col items-center">
        <h1 class="text-3xl text-black font-bold mt-4">Login to</h1>
        <img
            src="/src/assets/trentus-text-logo.svg"
            alt="logo_trentus"
            class=""
        />
        <h1 class="text-black">as a service</h1>
    </div>
  
  <div class="mt-12 place-self-center items-center justify-center min-h-screen bg-gray-100 ">
    <div
      class="inline-flex flex-col items-center justify-center w-[400px] max-w-md p-4 bg-white rounded-lg shadow-md"
    >
    <div class="flex flex-col grid-flow-col grid-cols-1 gap-2 mt-8">
        <input v-model="email" type="email" class="w-52 h-8 bg-gray-200 shadow-md rounded-lg text-black flex placeholder:ml-4 placeholder:p-2" placeholder="Insert your Email">
        <input v-model="password" type="password" class="w-52 h-8 bg-gray-200 shadow-md rounded-lg text-black flex placeholder:ml-4 placeholder:p-2" placeholder="Insert your Password">
        <button @click="login" class="w-52 h-8 bg-purple-600 hover:bg-purple-700 text-white border border-gray-400 shadow-md rounded-lg mt-8">Log in</button>
        <ErrorMessage :message="errore" class="rounded-lg" v-if="errore"></ErrorMessage>
    </div>
    <div class="relative flex items-center w-full my-6">
        <hr class="w-full h-px bg-gray-300 border-0 dark:bg-gray-700" />
        <span
          class="absolute px-2 font-medium text-gray-900 text-sm bg-white left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4"
          >or</span
        >
      </div>
    </div>
    <p class="place-self-center pt-4"><a href="" class="underline text-gray-800" >Forgot your Password?</a></p>
    <p class="place-self-center pt-2">Don't have an account? <router-link to="/register/gds" class="underline text-gray-800">Register</router-link></p>
    <p class="place-self-center pt-2">Sei un utente? <router-link to="/login" class="underline text-gray-800">clicca qui</router-link> </p>
  </div>
</template>