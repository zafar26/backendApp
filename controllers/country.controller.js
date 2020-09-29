const Sequelize = require('sequelize');
const Country = require('../models/country.model');
const Continent = require('../models/continent.model');
const config = require('../config');

exports.add = (req, res) => {
    const _b = req.body;

    Country.create({
        ctryName: _b.ctryName,
        ctryNameAr: _b.ctryNameAr,
        id_cont: _b.contID

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
    
    if(!_b.ctryID){
        res.status(400).json({status: false, message: "ctryID does not exists"});
        return
    }

    if(_b.ctryName)
    payload.ctryName = _b.ctryName 

    if(_b.ctryNameAr)
    payload.ctryNameAr = _b.ctryNameAr
    
    if(_b.contID)
    payload.id_cont = _b.contID 

    Country.update(payload ,
        {
            where: {
                ctryID: _b.ctryID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No countryt found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if(!_b.ctryID){
        res.status(400).json({status: false, message: "ctryID does not exists"});
        return
    }


    Country.destroy(
        {
            where: {
                ctryID: _b.ctryID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No country found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};

exports.getAll = (req, res) => {

    Country.findAll({
        include: [
            {
                model: Continent
            }
        ],
    })
        .then( c => {
            if(!c) throw new Error('No country found!');
            res.status(200).json({status: true, data: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.getByID = (req, res) => {
    Country.findOne({
        include: [
            {
                model: Continent
            }
        ],
        where:{
            ctryID: req.params.ctryID
        }
    })
        .then( c => {
            if(!c) throw new Error('No country found!');
            res.status(200).json({status: true, data: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};

