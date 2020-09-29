const Sequelize = require('sequelize');
const Position = require('../models/position.model');
const config = require('../config');

exports.add = (req, res) => {
    const _b = req.body;

    Position.create({
        posName: _b.posName,
        posNameAr: _b.posNameAr,
        posBaseSalary: _b.posBaseSalary,
        posBaseSalaryCurrency: _b.posBaseSalaryCurrency,
        posBaseSalaryCurrencyAr: _b.posBaseSalaryCurrencyAr
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
    
    if(!_b.posID){
        res.status(400).json({status: false, message: "posID does not exists"});
        return
    }

    if(_b.posName)
    payload.posName = _b.posName 

    if(_b.posNameAr)
    payload.posNameAr = _b.posNameAr
    
    if(_b.posBaseSalary)
    payload.posBaseSalary = _b.posBaseSalary
    
    if(_b.posBaseSalaryCurrency)
    payload.posBaseSalaryCurrency = _b.posBaseSalaryCurrency

    if(_b.posBaseSalaryCurrencyAr)
    payload.posBaseSalaryCurrencyAr = _b.posBaseSalaryCurrencyAr


    Position.update(payload ,
        {
            where: {
                posID: _b.posID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No position found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if(!_b.posID){
        res.status(400).json({status: false, message: "posID does not exists"});
        return
    }


    Position.destroy(
        {
            where: {
                posID: _b.posID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No position found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.getAll = (req, res) => {

    Position.findAll()
        .then( c => {
            if(!c) throw new Error('No postion found!');
            res.status(200).json({status: true, data: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.getByID = (req, res) => {
    Position.findOne({
        where:{
            posID: req.params.posID
        }
    })
        .then( c => {
            if(!c) throw new Error('No position found!');
            res.status(200).json({status: true, data: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};

