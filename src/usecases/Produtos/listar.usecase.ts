import { Produto } from '../../classes';
import { ProdutosRepository } from '../../repository/Produtos/produtos.repository';

export type Ordem = 'cresc' | 'decresc';

export type FiltrosDTO = {
	valor_max?: number;
	valor_min?: number;
	ordem_nome?: Ordem;
	ordem_preco?: Ordem;
	nome_produto?: string;
};

export type RetornoListarProduto = {
	sucesso: boolean;
	mensagem: string;
	produtos?: Produto[];
};

export class ListarProduto {
	private filtro: FiltrosDTO;

	constructor(filtrosQuery: FiltrosDTO) {
		this.filtro = filtrosQuery;
	}

	execute(): RetornoListarProduto {
		const repository = new ProdutosRepository();

		const retorno = repository.listagemProdutos(this.filtro);

		if (!retorno.length) {
			return {
				mensagem: 'Nenhum produto encontrado com o parametro citado',
				sucesso: false,
				produtos: [],
			};
		}

		return {
			mensagem: 'Produtos listados com sucesso',
			sucesso: true,
			produtos: retorno,
		};
	}
}
