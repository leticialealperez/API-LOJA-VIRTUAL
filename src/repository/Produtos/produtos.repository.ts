import { randomUUID } from 'crypto';
import { Produto } from '../../classes';
import { produtos } from '../../database';
import { AdicionarProdutoDTO, FiltrosDTO } from '../../usecases/Produtos';

export class ProdutosRepository {
	verificarNumeroDeSerie(numeroSerie: string) {
		return produtos.some((p) => p.toJSON().numeroSerie === numeroSerie);
	}

	cadastrarProduto(produto: AdicionarProdutoDTO): Produto {
		const { descricao, nome, numeroSerie, preco } = produto;
		const novoProduto = new Produto({
			id: randomUUID(),
			descricao,
			nome,
			numeroSerie,
			preco,
		});

		produtos.push(novoProduto);

		return novoProduto;
	}

	listagemProdutos(filtros: FiltrosDTO) {
		const { valor_max, valor_min, ordem_nome, ordem_preco, nome_produto } =
			filtros;

		let listaCopia = [...produtos];

		// veio valor_max?
		if (valor_max) {
			listaCopia = listaCopia.filter(
				(produto) => produto.toJSON().preco <= valor_max
			);
		}

		// veio valor_min?
		if (valor_min) {
			listaCopia = listaCopia.filter(
				(produto) => produto.toJSON().preco >= valor_min
			);
		}

		if (ordem_nome) {
			if (ordem_nome === 'cresc') {
				listaCopia = listaCopia.sort((a, b) => {
					if (a.toJSON().nome > b.toJSON().nome) {
						return 1;
					}

					if (a.toJSON().nome < b.toJSON().nome) {
						return -1;
					}

					return 0;
				});
			} else {
				listaCopia = listaCopia.sort((a, b) => {
					if (a.toJSON().nome < b.toJSON().nome) {
						return 1;
					}

					if (a.toJSON().nome > b.toJSON().nome) {
						return -1;
					}

					return 0;
				});
			}
		}

		if (ordem_preco) {
			if (ordem_preco === 'cresc') {
				listaCopia = listaCopia.sort((a, b) => {
					if (a.toJSON().preco < b.toJSON().preco) {
						return 1;
					}

					if (a.toJSON().preco > b.toJSON().preco) {
						return -1;
					}

					return 0;
				});
			} else if (ordem_preco) {
				listaCopia = listaCopia.sort((a, b) => {
					if (a.toJSON().preco > b.toJSON().preco) {
						return 1;
					}

					if (a.toJSON().preco < b.toJSON().preco) {
						return -1;
					}

					return 0;
				});
			}
		}

		if (nome_produto) {
			listaCopia = listaCopia.filter((produto) =>
				produto.toJSON().nome.startsWith(nome_produto)
			);
		}

		return listaCopia;
	}
}
