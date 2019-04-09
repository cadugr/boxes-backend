/*Após a instalação do express que é um micro framework
(fazemos isso com o yarn: yarn add express, devemos importar o mesmo
para utilizar no nosso arquivo de configuração da nossa aplicação*/ 
const express  = require('express');
const mongoose = require('mongoose');
const path     = require('path');
const cors     = require('cors');

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io  = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

mongoose.connect('mongodb+srv://cadu:1007kdvc@cluster0-ysnpi.mongodb.net/cadu?retryWrites=true', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    return next();
});

/*Nas duas linhas a seguir definimos midlewares que nada mais são que interceptadores
que vão nos auxiliar a lidar com requisições do tipo json e para troca de arquivos*/
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);