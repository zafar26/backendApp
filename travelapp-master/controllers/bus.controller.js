const Sequelize = require('sequelize');
const Bus = require('../models/bus.model');
const Employee = require('../models/employee.model');
const config = require('../config');

exports.add = (req, res) => {
    const _b = req.body;

    Bus.create({
        driver_id: _b.driverID   
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
    
    if(!_b.busID){
        res.status(400).json({status: false, message: "busID does not exists"});
        return
    }

    if(_b.driverID)
    payload.driver_id = _b.driverID
    
    Bus.update(payload ,
        {
            where: {
                busID: _b.busID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No bus found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if(!_b.busID){
        res.status(400).json({status: false, message: "busID does not exists"});
        return
    }


    Bus.destroy(
        {
            where: {
                busID: _b.busID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No bus found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};

exports.getAll = (req, res) => {
    Bus.findAll({
        include: [
            {
                model: Employee,
            }
        ],
    })
        .then( c => {
            if(!c) throw new Error('No bus found!');
            res.status(200).json({status: true, data: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.getByID = (req, res) => {
    Bus.findOne({
        include: [
            {
                model: Employee,
            }
        ],
        where:{
            busID: req.params.busID
        }
    })
        .then( c => {
            if(!c) throw new Error('No bus found!');
            res.status(200).json({status: true, data: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};

