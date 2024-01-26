const server = require('./src/app.js');
const { dataBase } = require('./src/db.js');
const PORT = 3001

//!inicializando el servidor y sincronizando la base de datos

const startServer = async () => {
    try {
        await dataBase.sync({alter: true})
        server.listen(PORT, () => {
            console.log(`Server of par simple listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error.message);
    }
};

startServer();