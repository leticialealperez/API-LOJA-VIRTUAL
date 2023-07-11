import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { ClientesController, ProdutosController } from './controllers';
import {
	validarAtualizacaoCamposCliente,
	validarCPF,
	validarCamposDeProduto,
	validarDadosUsuario,
	validarIdCliente,
	validarParametrosFiltragemProdutos,
	validarTipoPreco,
} from './middlewares';

const app = express();

// torna desnecessario a utilizacao do JSON.parse() e JSON.stringify()
app.use(express.json());

// converte os codigos unicode enviados na rota para o respectivo caracter
// Ex: %20 => ' '
app.use(express.urlencoded({ extended: false }));

app.use(cors()); // TODAS AS ORIGENS DE REQUISIÇÕES SERÃO ACEITAS E ATENDIDAS

//
app.listen(process.env.PORTA, () => {
	console.log(`Servidor rodando na porta ${process.env.PORTA}`);
});

// AS DEFINIÇÕES DAS ROTAS
app.get('/', (request, response) => {
	return response.json('API LOJA VIRTUAL NO AR 🚀');
});

// ===============================================
// CLIENTES
const controllerClientes = new ClientesController();

// POST - CADASTRAR CLIENTE
app.post(
	'/clientes',
	validarDadosUsuario,
	validarCPF,
	controllerClientes.cadastrar
);

// GET - LISTAR CLIENTES
app.get('/clientes', controllerClientes.listar);

// PUT - ATUALIZAR CLIENTES
app.put(
	'/clientes/:idCliente',
	validarIdCliente,
	validarAtualizacaoCamposCliente,
	controllerClientes.atualizar
);

// DELETE - EXCLUIR CLIENTES

app.delete(
	'/clientes/:idCliente',
	validarIdCliente,
	controllerClientes.deletar
);

// ===============================================
// ENDEREÇOS

// ===============================================
// PAGAMENTOS

// ===============================================
// PRODUTOS

const controllerProdutos = new ProdutosController();

// CADASTRAR - usuario admin
app.post(
	'/produtos',
	validarCamposDeProduto,
	validarTipoPreco,
	controllerProdutos.criar
);

// LISTAGEM - filtrar por min preco, max preco, ordem crescente e descrecente de nome (A-Z ou Z-A), preco ordenado crescente ou decrescente, nome do produto
app.get(
	'/produtos',
	validarParametrosFiltragemProdutos,
	controllerProdutos.listar
);

// valor_min
// valor_max
// nome_cresc
// nome_decresc
// preco_cresc
// preco_decresc
// nome_produto  "Smartphone"

// ===============================================
// CARRINHO
