const Sequelize = require('sequelize');
const Continent = require('../models/continent.model');
const config = require('../config');

exports.add = (req, res) => {
    const _b = req.body;
    Continent.create({
        contName: _b.name,
        contNameAr: _b.nameAr
    })
        .then( r => {
            res.status(200).json({status: true, result: r});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({
                status: false,
                error: err
            });
        });
};

exports.update = (req, res) => {
    const _b = req.body;
    let payload = {};
    
    if(!_b.contID){
        res.status(400).json({status: false, message: "contID does not exists"});
        return
    }

    if(_b.contName)
    payload.contName = _b.contName 

    if(_b.contNameAr)
    payload.contNameAr = _b.contNameAr 

    Continent.update(payload ,
        {
            where: {
                contID: _b.contID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No continent found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if(!_b.contID){
        res.status(400).json({status: false, message: "contID does not exists"});
        return
    }


    Continent.destroy(
        {
            where: {
                contID: _b.contID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No continent found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};

exports.getAll = (req, res) => {

    Continent.findAll()
        .then( c => {
            if(!c) throw new Error('No continent found!');
            res.status(200).json({status: true, data: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.getByID = (req, res) => {
    Continent.findOne({
        where:{
            contID: req.params.contID
        }
    })
        .then( c => {
            if(!c) throw new Error('No continent found!');
            res.status(200).json({status: true, data: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};
