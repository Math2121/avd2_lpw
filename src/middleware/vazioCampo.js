function vazioCampo(req,res,next){
    const {
        dataCompra,
        localCompra,
        valor,
        responsavel
    } = req.body;
    if (dataCompra == undefined || dataCompra == "") {
        return res.status(404).json({
            Error: "Campo Data Compra vazio"
        })
    }

    if (localCompra == undefined || localCompra == "") {
        return res.status(404).json({
            Error: "Campo Local Compra vazio"
        })
    }

    if (valor == undefined || valor == "") {
        return res.status(404).json({
            Error: "Campo valor vazio"
        })
    }

    if (responsavel == undefined || responsavel == "") {
        return res.status(404).json({
            Error: "Campo responsável vazio"
        })
    }
 
    next()
}

module.exports = vazioCampo