import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

import Sequelize from 'sequelize';


const Post = sequelize.define('Post', {
   
    author:{
      type:DataTypes.STRING,
      allowNull:false

    }, 
    title:{
      type:DataTypes.STRING,
      allowNull:false

    }, 
    text:{
      type:DataTypes.TEXT,
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
    category:{
      type:Sequelize.STRING,
      allowNull:true
    }

  }, {
      sequelize,
      modelName: 'User',
      timestamps: true,
  });
  
  
  
  export default Post;
  