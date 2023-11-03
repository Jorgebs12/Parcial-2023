import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contactos.ts";

const addContacto = async (req: Request, res: Response) => {
 
    try {
    const { dni, nombre, apellido, email, codigoPostal, codigoISO } = req.body;

    const alreadyExists = await ContactoModel.findOne({ _dni:dni }).exec();
    if (alreadyExists) {
      res.status(400).send("Persona ya existente");
      return;
    }

    const newContacto = new ContactoModel({ dni, nombre, apellido, email, codigoPostal, codigoISO });
    await newContacto.save();

    res.status(200).send({
        
      dni: newContacto.dni,
      nombre: newContacto.nombre,
      apellido: newContacto.apellido,
      email: newContacto.email,
      codigoPostal: newContacto.codigoPostal.toString(),
      codigoISO: newContacto.codigoISO

    });

  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addContacto;


