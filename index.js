const { send, json } = require('micro')
const { router, get, post } = require('microrouter')
const cors = require('micro-cors')()

const db = require('monk')('mongodb://Laura:helio1@helio-shard-00-00-fphgm.mongodb.net:27017,helio-shard-00-01-fphgm.mongodb.net:27017,helio-shard-00-02-fphgm.mongodb.net:27017/ShoppingCart?ssl=true&replicaSet=Helio-shard-0&authSource=admin&retryWrites=true');
const products = db.get('Products');

const getProducts = async (req, res) => {
    let results = await products.find({})
    console.log('results', results)
    send(res, 200, results)
};

const getProductBySKU = async (req, res) => {
    let sku = req.params.sku;
    let result = await products.findOne({sku: sku});
    if (result){
        send(res, 200, result);
    }else {
        send(res, 404);
    }
};

// const createProduct =async (req, res) => {
//     const body = await json(req)
//     product.push(body)
//     send(res, 200, body)
// }

const notfound = (req, res) => send(res, 404, 'Not found route')

module.exports = cors(
    router(
        get('/products', getProducts),
        get('/product/:sku', getProductBySKU),
        // get('/product', createProduct),
        get('/*', notfound)
    )
)
