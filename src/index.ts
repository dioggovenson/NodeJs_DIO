import errorHandler from './middlewares/error-handler.middleware';
import express from 'express';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

//Config App
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Config Rotas
app.use(statusRoute);
app.use(authorizationRoute);

app.use(jwtAuthenticationMiddleware)
app.use(usersRoute);
// configurar dos handlers de erro
app.use(errorHandler);

//Inicialização do servidor
app.listen(3000, () => {
    console.log("Escutando a porta 3000");
});