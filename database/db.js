const Sequelize = require('sequelize');

const db = {};

const dbinfo = new Sequelize("social", "root", "", {
    
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    pool: {
        max: 5,
        min: 0,
    },
    
    
});


dbinfo
    .authenticate()
    .then(() => {
        console.log("connexion de la base de données");
    })
    .catch((err) => {
            console.error("il n'est pas connecter à la base de données: " + err);
    })


// Les tables

db.postes = require("../models/Postes")(dbinfo, Sequelize);

db.users = require("../models/User")(dbinfo, Sequelize);

db.image = require("../models/Image")(dbinfo, Sequelize);

db.comments = require("../models/Comment")(dbinfo, Sequelize);

// Les relations:

db.users.hasMany(db.comments, { foreignKey: "userId" });
db.postes.hasMany(db.image, { foreignKey: "postesId" });
db.postes.hasMany(db.comments, { foreignKey: "postesId" });
db.users.hasMany(db.postes, { foreignKey: "userId" });
db.postes.belongsTo(db.users, { foreignKey: "userId" });
db.comments.belongsTo(db.users, { foreignKey: "userId" });

db.dbinfo = dbinfo;

db.Sequelize = Sequelize;

// dbinfo.sync({ force: true });

module.exports = db;