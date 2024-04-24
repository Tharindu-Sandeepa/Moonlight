
const Material = require('../models/materialModel');


const getmat = (req,res,next) => {
    Material.find()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({ error})
        });

};

const addmat = (req,res,next) => {
    const material = new Material({
        id: req.body.id,
        name: req.body.name,
       // type: req.body.type,
        weight: req.body.weight,
        order: req.body.order,
        supplierID: req.body.supplierID,
        cost: req.body.cost,
        voucher: req.body.voucher,
        date: req.body.date,
        special: req.body.special,

    });
    material.save()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({ error})
        });


}

const updatemat = (req,res,next) => {
    const {id,name,/*type,*/weight,order,supplierID,cost,voucher,date,special} = req.body;
    Material.updateOne(
        {id : id}, 
        {
            $set: {
                name: name,
              //  type: type,
                weight: weight,
                order: order,
                supplierID: supplierID,
                cost: cost,
                voucher: voucher,
                date: date,
                special: special
            }}
            )

        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({ error})
        });

}

const deletemat = (req,res,next) =>{
    const id = req.body.id;
    Material.deleteOne({ id: id})

        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({ error})
        });
}

        



exports.getmat = getmat;
exports.addmat = addmat;
exports.updatemat = updatemat;
exports.deletemat = deletemat;
