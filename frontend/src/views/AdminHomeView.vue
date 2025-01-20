<script>
import Navbar from '@/components/Navbar.vue';
import SidebarRight from '@/components/SidebarRight.vue';
import ServicesCard from '@/components/ServicesCard.vue';
import AdminSidebarLeft from '@/components/admin/sidebarLeft/AdminSidebarLeft.vue';
import RequestView from './admin/RequestView.vue';
export default{
  components: {
    Navbar,
    AdminSidebarLeft,
    SidebarRight,
    ServicesCard,
    RequestView,
  },
  data(){
    return{
      sidebarSections: [
      {
        title: 'Richieste',
        items: [
          {
            label: 'Item ',
            details: ['Dettaglio 1', 'Dettaglio 2'],
          },
          {
            label: 'Item 2',
            details: ['Dettaglio 1', 'Dettaglio 2'],
          },
        ],
      },
      {
        title: 'Sezione 2',
        items: [
          {
            label: 'Item 1',
            details: ['Dettaglio 1', 'Dettaglio 2'],
          },
          {
            label: 'Item 2',
            details: ['Dettaglio 1', 'Dettaglio 2'],
          },
        ],
      },
      ],
      requests: [
        {
        _id: 1,
        titolo: "OnOff",
        immagine: "placeholder",
        link: "https://www.trentinotrasporti.it",
        azienda: "Trentino Trasporti",
        descrizione: "App per prenotare bus a chiamata di notte"
        },
        {
        _id: 2,
        titolo: "Trec+ cartella clinica",
        show: true
        },
        {
        _id:3,
        titolo: "OnOff",
        show: true
        },
        {
        _id:4,
        titolo: "Muoversi in Trentino",
        show: true
        },
      ]
    }
  }
}
</script>
<template>
  <Navbar></Navbar>
  <div class="flex flex-row h-screen" id="main">
    <div class="basis-1/4 h-full"><AdminSidebarLeft :sections="sidebarSections" /></div>
    <RouterView class="flex-grow"></RouterView>
    <div class="basis-1/4 flex justify-end h-full"><SidebarRight/></div>
  </div>

</template>
<style scoped>
#main{
  background-color: #f3f4f6;
  font-family: 'Product Sans', Arial, Helvetica, sans-serif;
}
</style>