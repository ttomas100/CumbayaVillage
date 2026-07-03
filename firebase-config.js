/* ============================================================================
   CONFIGURACIÓN DE FIREBASE  —  rellena estos valores una sola vez.
   ----------------------------------------------------------------------------
   Dónde encontrarlos:
     Consola de Firebase → ⚙ Configuración del proyecto → "Tus apps" →
     app Web → "SDK setup and configuration" → objeto firebaseConfig.

   ⚠️ Este archivo es PÚBLICO a propósito. El apiKey NO es un secreto: es un
   identificador. La seguridad real la dan las reglas de Firestore/Storage
   (solo el usuario admin puede escribir). Es correcto commitearlo al repo.

   Mientras estos valores sigan con "TU_...", la web pública funciona igual
   usando el contenido por defecto (no se conecta a Firebase).
   ============================================================================ */
window.FIREBASE_CONFIG = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};
