const { Model, DataTypes } = require("sequelize");

class UsuarioModel extends Model {
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
      },
      {
        modelName: "Usuario",
        tableName: "usuario",
        timestamps: false,
        sequelize: database,
      }
    );
  }
}

module.exports = { UsuarioModel };
