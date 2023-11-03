import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import postContacto from "./endpoints/postContacto.ts";
import getContacto from "./endpoints/getContacto.ts";
import getContactoId from "./endpoints/getContactoId.ts";
import updateContacto from "./endpoints/putContacto.ts";
import deleteContacto from "./endpoints/deleteContacto.ts"

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("Debes especificar la variable de entorno MONGO_URL");
  Deno.exit(1);
}

try {
  await mongoose.connect(MONGO_URL);
  console.log("Conectado a la base de datos");

  const app = express();

  app.use(express.json());

  app
  .get("/api/contactos", getContacto)
  .post("/api/contactos", postContacto)
  .get("/api/contactos/:dni", getContactoId)
  .put("/api/contactos/:dni", updateContacto)
  .delete("/api/contactos/:dni", deleteContacto)

app.listen(3000, () => {
  console.log("Server listening on port 3000");
})
  
}
catch (error) {
  console.log(error);
}







