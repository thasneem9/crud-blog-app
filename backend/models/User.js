import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';


const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username:{
      type:DataTypes.STRING,
      allowNull:false

    }, 
    email:{
      type:DataTypes.STRING,
      allowNull:false

    },
    password:{
      type:DataTypes.STRING,
      allowNull:false

    },
    bio:{
        type:DataTypes.STRING,
        allowNull:true
    },
    profilepic:{
      type:DataTypes.STRING,
      allowNull:true
  },

  }, {
      sequelize,
      modelName: 'User',
      timestamps: true,
  });
  
  
  
  export default User;
  