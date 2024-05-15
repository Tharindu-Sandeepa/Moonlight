

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
        supplierName: req.body.supplierName,
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
    const {id,name,/*type,*/weight,order,supplierName,cost,voucher,date,special} = req.body;
    Material.updateOne(
        {id : id}, 
        {
            $set: {
                name: name,
              //  type: type,
                weight: weight,
                order: order,
                supplierName: supplierName,
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

const getMaterialNamesWeight = (req, res, next) => {
    Material.find({}, 'name weight')
        .then(materials => {
            const materialNamesWeight = materials.map(material => ({
                name: material.name,
                weight: material.weight
            }));
            res.json({ materialNamesWeight });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};
        


exports.getMaterialNamesWeight= getMaterialNamesWeight;
exports.getmat = getmat;
exports.addmat = addmat;
exports.updatemat = updatemat;
exports.deletemat = deletemat;
