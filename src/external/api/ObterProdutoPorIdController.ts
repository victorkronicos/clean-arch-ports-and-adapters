import ObterProdutoPorId from "@/core/produto/service/ObterProdutoPorId";
import { Express } from "express";

export default class ObterProdutoPorIdController{
    constructor(
        servidor: Express,
        casoDeUso: ObterProdutoPorId,
        ...midlewares: any[]
    ){

        servidor.get('/api/produtos/:id', ...midlewares, async(req, resp) => {

            try{
                 const produto = await casoDeUso.executar({
                    produtoId: (req.params as any).id,
                    usuario: (req as any).usuario
                 })
    
                resp.status(200).send(produto)
            } catch(erro: any){
                resp.status(400).send(erro.message)
            }
        })
    }
}