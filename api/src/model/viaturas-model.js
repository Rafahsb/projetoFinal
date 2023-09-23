const { Model, DataTypes } = require("sequelize");

class ViaturasModel extends Model {
  static init(database) {
    super.init(
      {
        id_viatura: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        marca: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        modelo: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        chassi: {
          type: DataTypes.CHAR(17),
          allowNull: false,
          unique: true,
        },
        placa: {
          type: DataTypes.CHAR(8),
          allowNull: false,
          unique: true,
        },
        portas: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        bancos: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        cor: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        kilometragem: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        orgao_vinculado: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        piloto: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "Viaturas",
        tableName: "viaturas",
        timestamps: false,
        sequelize: database,
      }
    );
  }
  static associate(models) {
    this.belongsTo(models.Manutencoes, { foreignKey: "id_viatura" });
  }
}

module.exports = { ViaturasModel };
