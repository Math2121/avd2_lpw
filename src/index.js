const express = require('express');
const app = express();
const {
    uuid
} = require('uuidv4');
const vazioCampo = require('./middleware/vazioCampo');
app.use(express.json());
let compras = [{
        id: uuid(),
        dataCompra: '2021/06/15',
        localCompra: 'Volta Redonda',
        valor: 200.25,
        responsavel: 'Luiz Claúdio'
    },
    {
        id: uuid(),
        dataCompra: '2021/06/15',
        localCompra: 'Volta Redonda',
        valor: 200.25,
        responsavel: 'Mario Claúdio'
    },
];

function verificaId(req, res, next) {
    const {
        id
    } = req.params

    const idExists = compras.filter(item => item.id === id)

    if (idExists < 1) {
        return res.status(404).json({
            error: 'Id inexistente'
        })
    }
    next()
}
app.post('/despesas', vazioCampo, (req, res) => {
    let {
        dataCompra,
        localCompra,
        valor,
        responsavel
    } = req.body
    let compra = {
        id: uuid(),
        dataCompra,
        localCompra,
        valor,
        responsavel
    }

    compras = [...compras, compra]
    res.status(200).json(compra)
})

app.get('/despesas', (req, res) => {
    res.status(200).json(compras)
})


app.get('/despesas/gastototal', (req, res) => {
    let total = 0
    compras.forEach(item => {
        total += item.valor
    });
    res.status(200).json({
        ' gasto total': total
    })

})
app.get('/despesas/gastoresponsavel', (req, res) => {

    let {
        responsavel
    } = req.query

 
    let compraResponsavel = compras.filter(item => item.responsavel === responsavel)
    if(responsavel === undefined || responsavel === '' || compraResponsavel < 1){
        return res.status(404).json({err:'Responsavel não existe'})
    }
    res.status(200).json(compraResponsavel)

})

app.get('/despesas/:id', verificaId, (req, res) => {
    const {
        id
    } = req.params
    const compraId = compras.filter(item => item.id === id)

    res.status(200).send(compraId)
});
app.listen("3000", () => {
    console.log("Server is running")
});