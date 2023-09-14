const { Sequelize } = require("sequelize");
const { ManutencoesModel } = require("../model/manutencoes-model");
const { ViaturasModel } = require("../model/viaturas-model");
const { Validates } = require('../utils/validates');
const { format } = require("date-fns");
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const { HttpHelper } = require("../utils/http-helper");

class PainelController {

    async Dashboard(request, response) {
        const httpHelper = new HttpHelper(response)
    
        try {
          const data = await ManutencoesModel.sequelize.query("SELECT sum(preco), chassi, marca, modelo FROM viaturas INNER JOIN manutencoes ON manutencoes.id_viatura = viaturas.id_viatura group by chassi, marca, modelo;", 
          {
            type: Sequelize.QueryTypes.SELECT,
          })
          
          return httpHelper.ok({ dashboard: data });
          
        } catch (error) {
          return httpHelper.internalError(error);
        }
    }
}


module.exports = { PainelController };