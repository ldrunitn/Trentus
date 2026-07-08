# Trentus

### Descrizione
Trentus è un'applicazione web full-stack progettata per la gestione di utenti, servizi, avvisi, segnalazioni (issue tracking) e sondaggi. È dotata di un'interfaccia utente interattiva e di una dashboard per l'amministrazione, il tutto supportato da un'architettura API RESTful sicura.

### Tech-stack
**Frontend:**
* Vue.js 3 (Vite)
* Vue Router (Routing)
* Vuex (State Management)
* Tailwind CSS (Styling)

**Backend:**
* Node.js con Express.js
* MongoDB con Mongoose (ODM)
* Autenticazione basata su JWT (JSON Web Token)
* Swagger / OpenAPI (Documentazione API)

### Struttura del progetto
* `/Back-end`: Contiene il server Node.js. Al suo interno sono definiti i `controllers`, `models`, `routes`, e `schemas` necessari per il funzionamento delle API REST.
* `/frontend`: Contiene l'applicazione client Vue.js, suddivisa in `components` (componenti riutilizzabili), `views` (pagine principali), `store` (gestione dello stato con Vuex) e `router`.
* `/Documenti`: Raccoglie la documentazione di sistema, diagrammi architetturali (UML, Use Case) e le configurazioni per il testing delle API (es. collezioni Insomnia).

### Come buildare sia backend che frontend

**Prerequisiti:** Assicurati di avere Node.js installato e un'istanza MongoDB (locale o cloud) in esecuzione.

**Backend:**
1. Apri il terminale e naviga nella directory del backend:
   cd Back-end
2. Installa le dipendenze necessarie:
   npm install
3. Crea e configura un file `.env` inserendo le variabili d'ambiente (URI di MongoDB, JWT Secret, ecc.).
4. Avvia il server:
   npm run dev
   *(Oppure usa `npm start` per l'ambiente di produzione).*

**Frontend:**
1. Apri una nuova finestra del terminale e naviga nella directory del frontend:
   cd frontend
2. Installa le dipendenze:
   npm install
3. Configura le variabili d'ambiente per il client (es. l'URL delle API) nel file `.env`.
4. Per compilare il progetto pronto per la produzione:
   npm run build
   *(Per lo sviluppo locale puoi usare `npm run dev`).*
