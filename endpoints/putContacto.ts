import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/contactos.ts";

const updateContacto = async (req: Request, res: Response) => {
  try {
    const { dni } = req.params;
    const { nombre, apellido, email, codigoPostal, codigoISO } = req.body;

    const upContacto = await MascotaModel.findOneAndUpdate(
      { dni },
      { nombre, apellido, email, codigoPostal, codigoISO },
      { new: true }
    ).exec();

    if (!upContacto) {
      res.status(404).send("Contacto no encontrada");
      return;
    }

    res.status(200).send({
        nombre: upContacto.nombre,
        apellido: upContacto.apellido,
        email: upContacto.email,
        codigoPostal: upContacto.codigoPostal.toString(),
        codigoISO: upContacto.codigoISO
    });

  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateContacto;