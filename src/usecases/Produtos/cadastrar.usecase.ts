import { Produto, ProdutoDTO } from '../../classes';
import { ProdutosRepository } from '../../repository/Produtos/produtos.repository';

// TIPAGEM DO INPUT DA REGRA DE NEGOCIO
export type AdicionarProdutoDTO = Omit<ProdutoDTO, 'id'>;

// TIPAGEM DO OUTPUT DA REGRA DE NEGOCIO
export type RetornoAdicionarProduto = {
	sucesso: boolean;
	mensagem: string;
	produtoCadastrado?: Produto;
};

export class AdicionarProduto {
	dados: AdicionarProdutoDTO;

	constructor(dados: AdicionarProdutoDTO) {
		this.dados = dados;
	}

	execute(): RetornoAdicionarProduto {
		// quais as regras de negocio para o cadastro de um produto?
		const repository = new ProdutosRepository();

		// NÃO PODE EXISTIR DOIS PRODUTOS COM O MESMO NUMERO DE SÉRIE
		if (repository.verificarNumeroDeSerie(this.dados.numeroSerie)) {
			return {
				mensagem: 'O produto já possui número de série cadastrado.',
				sucesso: false,
			};
		}

		// PRODUTO NÃO PODE SER CADASTRADO COM O VALOR 0
		if (this.dados.preco <= 0) {
			return {
				mensagem:
					'O preço precisa ter um valor positivo e diferente de zero',
				sucesso: false,
			};
		}

		const novoProduto = repository.cadastrarProduto(this.dados);

		return {
			mensagem: 'Produto cadastrado com sucesso!',
			sucesso: true,
			produtoCadastrado: novoProduto,
		};
	}
}
