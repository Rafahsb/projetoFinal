const { Model, DataTypes } = require("sequelize");

class ManutencoesModel extends Model {
  static init(database) {
    super.init(
      {
        id_manutencao: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        numero_nota: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        descricao: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        preco: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        data_nota: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        id_viatura: { 
          type: DataTypes.INTEGER,
          allowNull: false,
        }
      },
      {
        modelName: "Manutencoes",
        tableName: "manutencoes",
        timestamps: false,
        sequelize: database,
      }
    );
  }
  static associate(models) {
    this.hasMany(models.Viaturas, { foreignKey: "id_viatura" });
  }
}

module.exports = { ManutencoesModel };
