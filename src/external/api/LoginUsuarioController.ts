import LoginUsuario from "@/core/usuario/service/LoginUsuario";
import { Express } from "express";
import ProvedorJwt from "./ProvedorJwt";

export default class LoginUsuarioController{
    constructor(
        servidor: Express,
        casoDeUso: LoginUsuario
    ){

        servidor.post('/api/usuarios/login', async(req, resp) => {

            try{
                 const usuario = await casoDeUso.executar({
                    email: req.body.email,
                    senha: req.body.senha,
                })

                const providerJwt = new ProvedorJwt(process.env.JWT_SECRET!)
    
                resp.status(200).send({
                    usuario,
                    token: providerJwt
                })
            } catch(erro: any){
                resp.status(400).send(erro.message)
            }
        })
    }
}