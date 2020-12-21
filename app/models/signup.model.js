module.exports = (sequelizeConfig, Sequelize) => {
    const Signup = sequelizeConfig.define("signup", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        studentNumber: {
            type: Sequelize.INTEGER ,
            allowNull: false,
            unique: true
        },
        cpf: {
            type: Sequelize.INTEGER ,
            allowNull: false,
            unique: true
        }
    });
  
    return Signup;
};