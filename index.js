const { Sequelize } = require('sequelize');
const server = require('./src/app.js');

const app = server;
const PORT = 3001;

const sequelize = new Sequelize({
    database: "seguridad",
    username: "postgres",
    password: "postgres",
    host: "127.0.0.1",
    dialect: "postgres"
});

app.get('/', (req, res) => {
    res.send('¡Servidor en marcha!');
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida con éxito.');
        await sequelize.sync({ force: true });
        console.log('Modelos sincronizados con la base de datos.');
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
})();
