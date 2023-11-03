import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contactos.ts";

const deleteContacto = async (req: Request, res: Response) => {
  
    try {
    const { dni } = req.params;
    const contac = await ContactoModel.findOneAndDelete({ dni }).exec();
    
    if (!contac) {
      res.status(404).send("Contacto no encontrada");
      return;
    }
    res.status(200).send("Contacto eliminado");

  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default deleteContacto;