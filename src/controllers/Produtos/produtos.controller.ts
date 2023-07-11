import { Request, Response } from 'express';
import {
	AdicionarProduto,
	AdicionarProdutoDTO,
	ListarProduto,
	Ordem,
} from '../../usecases/Produtos';

export class ProdutosController {
	public criar(req: Request, res: Response) {
		const { nome, descricao, numeroSerie, preco }: AdicionarProdutoDTO =
			req.body;

		const usecase = new AdicionarProduto({
			descricao,
			nome,
			numeroSerie,
			preco,
		});

		const retorno = usecase.execute();

		if (!retorno.sucesso) {
			return res.status(400).json(retorno);
		}

		return res.status(201).json(retorno);
	}

	public listar(req: Request, res: Response) {
		const filtros = req.query;

		// Boolean undefined, null, "", false, 0 => false
		console.log(Boolean(filtros.nome_cresc)); //
		const usecase = new ListarProduto({
			valor_max: Number(filtros.valor_max),
			valor_min: Number(filtros.valor_min),
			ordem_nome: filtros.ordem_nome as Ordem, // cresc | decresc
			ordem_preco: filtros.ordem_preco as Ordem, // cresc | decresc
			nome_produto: filtros.nome_produto?.toString(),
		});

		const retorno = usecase.execute();

		if (!retorno.sucesso) {
			return res.status(404).json(retorno);
		}

		return res.status(200).json(retorno);
	}
}
