const { Model, DataTypes } = require("sequelize");

class UsuariosModel extends Model {
  static init(database) {
    super.init(
      {
        id_usuario: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        matricula: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        senha: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        email: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        unidade: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        cargo: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        modelName: "Usuarios",
        tableName: "usuarios",
        timestamps: false,
        sequelize: database,
      }
    );
  }
}

module.exports = { UsuariosModel };
