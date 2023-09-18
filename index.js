const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

//configurar o handlebars como template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

const produtos = [
    { id: 1, nome: 'Iphone 13', descricao: 'Celular', preco: 4000 },
    { id: 2, nome: 'Fiat Uno', descricao: 'Carro', preco: 15000 },
    { id: 3, nome: 'Boné', descricao: 'Vestimenta', preco: 39.99 }
  ];

app.get('/home', (req, res) => {
  res.render('home', { title: 'Lista de Produtos', produtos });
});

app.get('/produto/:id', (req, res) => {
    const productId = req.params.id;
    const produto = produtos.find(item => item.id === Number(productId));
  
    if (produto) {
      res.render('produto', { title: 'Detalhes do Produto', produto });
    } else {
      res.status(404).send('Produto não encontrado');
    }
  });

  
app.use(express.static('public'));

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080')
});