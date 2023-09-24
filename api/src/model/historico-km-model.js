const { Model, DataTypes } = require("sequelize");

class HistoricoKmModel extends Model {
  static init(database) {
    super.init(
      {
        id_historico_km: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        quilometragem: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id_viatura: { 
            type: DataTypes.INTEGER,
            allowNull: false,
        },
      },
      {
        modelName: "HistoricoKm",
        tableName: "historicoKm",
        timestamps: false,
        sequelize: database,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Viaturas, { foreignKey: "id_viatura" });
    
  }
}

module.exports = { HistoricoKmModel };
