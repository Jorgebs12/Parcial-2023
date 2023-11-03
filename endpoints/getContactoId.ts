import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contactos.ts";

const getContactoId = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const contac = await ContactoModel.findOne({ dni }).exec();
    
    if (!contac) {
      res.status(404).send("DNI no encontrada");
      return;
    }
    res.status(200).send({
        nombre: contac.nombre,
        apellido: contac.apellido,
        email: contac.email,
        codigoPostal: contac.codigoPostal.toString(),
        codigoISO: contac.codigoISO
    });

  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default getContactoId
