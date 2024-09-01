import { DataTypes } from 'sequelize';
import sequelize from '../db/database.js';

import Sequelize from 'sequelize';


const Post = sequelize.define('User', {
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    author:{
      type:DataTypes.STRING,
      allowNull:false

    }, 
    text:{
      type:DataTypes.STRING,
      allowNull:false

    },
    postedBy: {
        type: Sequelize.INTEGER, 
        allowNull: false,
    },
    img: {
        type: Sequelize.STRING,
        allowNull: true,
    },

  }, {
      sequelize,
      modelName: 'User',
      timestamps: true,
  });
  
  
  
  export default Post;
  