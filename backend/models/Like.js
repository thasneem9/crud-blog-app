import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import Sequelize from "sequelize";

const Like=sequelize.define('Like',{

    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }, {
        sequelize,
        modelName: 'like'
    });

    export default Like