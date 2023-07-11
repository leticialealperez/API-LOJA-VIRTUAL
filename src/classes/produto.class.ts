export type ProdutoDTO = {
	id: string;
	preco: number;
	nome: string;
	descricao: string;
	numeroSerie: string;
};

export type AtualizarProdutoDTO = Partial<
	Omit<ProdutoDTO, 'id' | 'numeroSerie'>
>;

export type TypeAcao = 'adicionar' | 'excluir';

export type TypeMetodoDeDesconto = 'porcentagem' | 'valor';

export class Produto {
	private id: string;
	private categorias: any[];
	private preco: number;
	private quantidadeEstoque: number;
	private nome: string;
	private descricao: string;
	private numeroSerie: string;
	private ativo: boolean;

	constructor(dados: ProdutoDTO) {
		this.id = dados.id;
		this.categorias = [];
		this.preco = dados.preco;
		this.quantidadeEstoque = 0;
		this.nome = dados.nome;
		this.descricao = dados.descricao;
		this.numeroSerie = dados.numeroSerie;
		this.ativo = true;
	}

	public adicionarEstoque(novaQuantidade: number) {
		this.quantidadeEstoque += novaQuantidade;
	}

	public editarDados(dados: AtualizarProdutoDTO) {
		this.nome = dados.nome || this.nome;
		this.descricao = dados.descricao || this.descricao;
		this.preco = dados.preco || this.preco;
	}

	public editarCategorias(acao: TypeAcao, id?: string, categoria?: string) {
		switch (acao) {
			case 'adicionar':
				if (!categoria) {
					throw new Error('Categoria não informada.');
				}

				this.categorias.push(categoria);
				break;
			case 'excluir':
				if (!id) {
					throw new Error('ID da categoria não informado.');
				}

				const index = this.categorias.indexOf(id);
				this.categorias.splice(index, 1);
				break;
			default:
				throw new Error('A ação é inválida.');
		}
	}

	public aplicarDesconto(metodo: TypeMetodoDeDesconto, valor: number) {
		if (valor <= 0) {
			throw new Error('O valor deve ser maior que zero.');
		}

		switch (metodo) {
			case 'porcentagem':
				if (valor >= 100) {
					throw new Error(
						'O valor de porcentagem deve ser menor que 100.'
					);
				}

				this.preco -= (this.preco * valor) / 100;
				break;
			case 'valor':
				if (valor >= this.preco) {
					throw new Error(
						'O valor informado para desconto excede o valor do produto.'
					);
				}

				this.preco -= valor;
				break;
		}
	}

	public toJSON() {
		return {
			id: this.id,
			nome: this.nome,
			descricao: this.descricao,
			preco: this.preco,
			numeroSerie: this.numeroSerie,
			quantidade: this.quantidadeEstoque,
			categorias: this.categorias,
			ativo: this.ativo,
		};
	}
}
