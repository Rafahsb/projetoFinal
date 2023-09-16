require('../database');
const bcrypt = require("bcrypt");
const { UsuariosModel } = require('../model/usuarios-model');
const { ViaturasModel } = require('../model/viaturas-model');
const { ManutencoesModel } = require('../model/manutencoes-model');

const usuarios = [
    {
        nome: "Admin",
        senha: "123",
        matricula: "123456789",
        email: "admin@email.com",
        unidade: "unidade",
        cargo: "gestor",
    }
]

const viaturas = [
    {
        marca: "Chevrolet",
        modelo:"Astra",
        chassi:"12321321321111111",
        portas: 2,
        bancos:2,
        cor:"Preto",
        kilometragem: 12323,
        orgao_vinculado:"PF",
        batalhao:"10b",
        piloto:"Rafael Henrick"
    },  
    {
        marca: "Fiat",
        modelo: "Uno",
        chassi: "9876543210111111",
        portas: 4,
        bancos: 5,
        cor: "Prata",
        kilometragem: 25000,
        orgao_vinculado: "PF",
        batalhao: "11b",
        piloto: "Ana Silva"
      },
      {
        marca: "Volkswagen",
        modelo: "Jetta",
        chassi: "5678901234111111",
        portas: 4,
        bancos: 5,
        cor: "Azul",
        kilometragem: 30000,
        orgao_vinculado: "PC",
        batalhao: "10º",
        piloto: "Pedro Santos"
      }
]

const manutencoes = [
    {
        numero_nota: "000000001",
        descricao: "Troca de Óleo",
        preco: 450,
        data_nota: "2023-05-05",
        id_viatura: 1,
    },
    {
        numero_nota: "000000002",
        descricao: "Filtro de Ar",
        preco: 80,
        data_nota: "2023-04-15",
        id_viatura: 2
    },
    {
        numero_nota: "000000003",
        descricao: "Revisão Geral",
        preco: 600,
        data_nota: "2023-03-10",
        id_viatura: 3
    },
    {
        numero_nota: "000000004",
        descricao: "Pneus Novos",
        preco: 350,
        data_nota: "2023-02-20",
        id_viatura: 1
    },
    {
        numero_nota: "000000005",
        descricao: "Lavagem e Polimento",
        preco: 50,
        data_nota: "2023-01-05",
        id_viatura: 2
    },
    {
        numero_nota: "000000006",
        descricao: "Troca de Óleo",
        preco: 450,
        data_nota: "2022-12-15",
        id_viatura: 3
    },
    {
        numero_nota: "000000007",
        descricao: "Reparo de Motor",
        preco: 800,
        data_nota: "2022-11-20",
        id_viatura: 1
    },
    {
        numero_nota: "000000008",
        descricao: "Troca de Filtro de Óleo",
        preco: 60,
        data_nota: "2022-10-10",
        id_viatura: 2
    },
    {
        numero_nota: "000000009",
        descricao: "Revisão de Freios",
        preco: 200,
        data_nota: "2022-09-05",
        id_viatura: 3
    },
    {
        numero_nota: "000000010",
        descricao: "Troca de Lâmpadas",
        preco: 30,
        data_nota: "2022-08-25",
        id_viatura: 1
    },


]

async function criarUsuarios () {
    console.log("teste");
    for (let usuario of usuarios) {
        await UsuariosModel.create({
            nome: usuario.nome,
            senha: await bcrypt.hash("123", Number(process.env.SALT)),
            matricula: usuario.matricula,
            email: usuario.email,
            unidade: usuario.unidade,
            cargo: usuario.cargo,
        });
    }
    
};

async function criarViaturas() {
    for (let viatura of viaturas) {
        await ViaturasModel.create({
            marca: viatura.marca,
            modelo: viatura.modelo,
            chassi: viatura.chassi,
            portas: viatura.portas,
            bancos: viatura.bancos,
            cor: viatura.cor,
            kilometragem: viatura.kilometragem,
            orgao_vinculado: viatura.orgao_vinculado,
            batalhao: viatura.batalhao,
            piloto: viatura.piloto
        });
    }
    
};

async function criarManutencoes () {
    for (let manutencao of manutencoes) {
        await ManutencoesModel.create({
            numero_nota: manutencao.numero_nota,
            descricao: manutencao.descricao,
            preco: manutencao.preco,
            data_nota: manutencao.data_nota,
            id_viatura: manutencao.id_viatura
        });
    }
    
};

(async () => {
    await criarUsuarios();
    console.log('Usuarios cadastrados!');
    await criarViaturas();
    console.log('Viaturas cadastradas!');
    await criarManutencoes();
    console.log('Manutenções cadastradas!');
})();

