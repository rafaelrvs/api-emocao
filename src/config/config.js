const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('','','',{
    host: '',
    port:'',
    dialect: '',
});


module.exports=sequelize