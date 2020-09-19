const stocksController = {}

stocksController.updateStocksDatabase = (req, res, next) => {
    console.log('stock controller hit')
    return next()
}

module.exports = stocksController