const newMaterial = require('../models/newMaterialModel');

const getnewMaterial = (req, res, next) => {
    newMaterial.find()
        .then(response => {
            res.json({ response });
        })
        .catch(error => {
            res.json({ error})
        });
};

const addnewMaterial = (req, res, next) => {
    const { id, name, weight } = req.body;
    const newmaterial = new newMaterial({
        id: id,
        name: name,
        weight: weight
    });
    newmaterial.save()
        .then(response => {
            res.json({response})
        })
        .catch(error => {
            res.json({ error})
        });

};



// const updatenewMaterial = (req, res, next) => {
//     const { id, name, weight } = req.body;
//     newMaterial.findOneAndUpdate(
//         { id: id },
//         { $set: { name: name, weight: weight } },
//         { new: true }
//     )
//     .then(response => {
//         res.json({response})
//     })
//     .catch(error => {
//         res.json({ error})
//     });
// };

const updatenewMaterial = (req, res, next) => {
    const { id, name, weight } = req.body;
    newMaterial.findOneAndUpdate(
        { id: id },
        { $set: { name: name, weight: weight } },
        { new: true }
    )
    .then(response => {
        res.json({response});
    })
    .catch(error => {
        res.json({ error });
    });
};


// const deletenewMaterial = (req, res, next) => {
//     const id = req.body.id;
//     newMaterial.findOneAndDelete({ id: id })

//          .then(response => {
//             res.json({response})
//         })
//         .catch(error => {
//             res.json({ error})
//         });
// };

const deletenewMaterial = (req, res, next) => {
    const id = req.body.id;
    newMaterial.findOneAndDelete({ id: id })
        .then(response => {
            res.json({response});
        })
        .catch(error => {
            res.json({ error });
        });
};


const getMaterialNames = (req, res, next) => {
    newMaterial.find({}, 'name')
        .then(materials => {
            const materialNames = materials.map(material => material.name);
            res.json({ materialNames });
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
};

exports.getnewMaterial = getnewMaterial;
exports.addnewMaterial = addnewMaterial;
exports.updatenewMaterial = updatenewMaterial;
exports.deletenewMaterial = deletenewMaterial;
exports.getMaterialNames = getMaterialNames;