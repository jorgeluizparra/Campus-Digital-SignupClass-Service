module.exports = (sequelizeConfig, Sequelize) => {
    const Signup = sequelizeConfig.define("signup", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'O valor passado não é um email.'
                }
            }
        },
        studentNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: 6,
                    msg: 'O registro acadêmico deve conter 6 numeros.'
                }
            }
        },
        cpf: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: 11,
                    msg: 'O registro acadêmico deve conter 11 numeros.'
                }
            }
        }
    });
  
    return Signup;
};