const Cheese = require('../models/Cheese.js');

const getCheeses = async ( req, res) =>{
    const { hasta, desde } = req.query;
    const query = { state:true };
    const [ total, cheeses ] = await Promise.all([
        Cheese.countDocuments(query),
        Cheese.find(query)
            .skip(Number(desde))
            .limit(Number(hasta))
            .populate('usuario', ['nombre'])
            .populate('categoria', ['nombre'])
    ]);
    res.json({
        total,
        cheeses
    })
};

const postCheese = async (req, res) => {
    const {name, state, price, categoria, description} = req.body;
    const data = {
        name,
        state,
        usuario: req.usuario._id,
        price,
        categoria,
        description
    }
    console.log(data);
    const cheese = new Cheese(data);
    const nombreDB = await Cheese.findOne({name});
    if (nombreDB) {
        return res.status(400).json({
            msg:`El cheese ${ name }, ya existe`
        });
    }

    await cheese.save();
    res.json({
        "message":"post api",
        cheese
    })
};

const deleteCheese = async (req, res) =>{
    const {id} = req.params
    const cheese = await Cheese.findByIdAndDelete(id, {estado:false});
    res.json(cheese);
};

const putCheese = async (req, res) =>{
    const {id} = req.params
    const {_id, ...resto } = req.body

    const cheese = await Cheese.findByIdAndUpdate(id, resto, {new:true});
    res.json({
        msg:'Cheese Actualizada',
        cheese : cheese
    });
};

module.exports = {
    getCheeses,
    postCheese,
    deleteCheese,
    putCheese
}