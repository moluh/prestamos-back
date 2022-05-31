import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { Usuarios } from "../entities/usuarios";


export function jwtAdminMidleware(req: Request, res: Response, next) {
  next();

  // const authString = req.headers['authorization'];

  // if (typeof authString === 'string' && authString.indexOf(' ') > -1) {
  //   const authArray = authString.split(' ');
  //   const token = authArray[1];
  //   jwt.verify(token, process.env.PKEY, async (err, decoded: Usuarios) => {
  //     if (err) {
  //       res.status(403).send(
  //         {
  //           ok: false,
  //           msg: 'Token no válido: No tiene autorización para este recurso',
  //           error: err
  //         });
  //     } else {
  //       if (decoded.rol == 'ADMIN') {
  //         next();
  //       } else {
  //         res.status(403).send({
  //           ok: false,
  //           msg: 'Token no válido: No tiene autorización para este recurso',
  //           error: err
  //         });
  //       }
  //     }
  //   });
  // } else {
  //   res.status(403).send({
  //     ok: false,
  //     msg: 'Token no válido: No tiene autorización para este recurso'
  //   });
  // }
}
