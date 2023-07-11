import { NextFunction, Request, Response } from 'express';

export function validarTipoPreco(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { preco } = req.body;

	if (typeof preco === 'string') {
		req.body.preco = Number(preco.replaceAll('.', '').replaceAll(',', '.')); //1500.00
	}

	if (isNaN(req.body.preco)) {
		return res.status(400).json({
			mensagem: 'O dado informado para preço deve ser um número válido',
			sucesso: false,
		});
	}

	if (typeof req.body.preco !== 'number') {
		return res.status(400).json({
			mensagem: 'O tipo de dado informado para preço é inválido',
			sucesso: false,
		});
	}

	next();
}
