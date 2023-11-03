import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contactos.ts";

const getContacto = async (req: Request, res: Response) => {
    try {
        const todasContacto = await ContactoModel.find().exec();
        if (!todasContacto) {
          res.status(404).send("Ningun contacto encontrado");
          return;
        }

        res.status(200).send({
            contacto: todasContacto.map((contacto) => ({
                dni:contacto.dni,
                nombre: contacto.nombre,
            })),
        });

      } catch (error) {
        res.status(500).send(error.message);
        return;
      }
};

export default getContacto;