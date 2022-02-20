import express from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

//Config App
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Config Rotas
app.use(statusRoute);
app.use(usersRoute);

//Inicialização do servidor
app.listen(3000, () => {
    console.log("Escutando a porta 3000");
});