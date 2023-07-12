import { NextFunction, Request, Response } from 'express';

export function validarParametrosFiltragemProdutos(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const filtros = req.query;

	if (
		filtros.ordem_nome &&
		filtros.ordem_nome !== 'cresc' &&
		filtros.ordem_nome !== 'decresc'
	) {
		return res.status(400).json({
			sucesso: false,
			mensagem:
				'Os valores do filtro para ordenação do nome do produto é inválido.',
		});
	}

	if (
		filtros.ordem_preco &&
		filtros.ordem_preco !== 'cresc' &&
		filtros.ordem_preco !== 'decresc'
	) {
		return res.status(400).json({
			sucesso: false,
			mensagem:
				'Os valores do filtro para ordenação do preço do produto é inválido.',
		});
	}

	if (filtros.valor_min) {
		const valorMinParse = Number(filtros.valor_min);

		if (isNaN(valorMinParse)) {
			return res.status(400).json({
				sucesso: false,
				mensagem:
					'Os valor do filtro de valor_min não é um dado numérico válido.',
			});
		}

		req.query.valor_min = valorMinParse.toString(); // "1000.50"
	}

	if (filtros.valor_max) {
		const valorMaxParse = Number(filtros.valor_max);

		if (isNaN(valorMaxParse)) {
			return res.status(400).json({
				sucesso: false,
				mensagem:
					'O valor do filtro de valor_max não é um dado numérico válido.',
			});
		}

		req.query.valor_max = valorMaxParse.toString();
	}

	next();
}
