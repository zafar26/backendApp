const Sequelize = require('sequelize');
const Employee = require('../models/employee.model');
const config = require('../config');

exports.add = (req, res) => {
    const _b = req.body;

    Employee.create({
        empName: _b.empName,
        empFirstName: _b.empFirstName,
        empSurName: _b.empSurName,
        empSalary: _b.empSalary,
        empAccountNo: _b.empAccountNo,
        empStartDate: _b.empStartDate,
        empEndDate: _b.empEndDate,
        empPhoneNo: _b.empPhoneNo,
        empAddress: _b.empAddress,
        empAddressLat: _b.empAddressLat,
        empAddressLong: _b.empAddressLong,
        empInsuranceNo: _b.empInsuranceNo,
        position_id: _b.positionID   
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
    
    if(!_b.empID){
        res.status(400).json({status: false, message: "empID does not exists"});
        return
    }

    if(_b.empName)
    payload.empName = _b.empName
    
    if(_b.empFirstName)
    payload.empFirstName = _b.empFirstName

    if(_b.empSurName)
    payload.empSurName = _b.empSurName

    if(_b.empSalary)
    payload.empSalary = _b.empSalary

    if(_b.empAccountNo)
    payload.empAccountNo = _b.empAccountNo

    if(_b.empStartDate)
    payload.empStartDate = _b.empStartDate

    if(_b.empEndDate)
    payload.empEndDate = _b.empEndDate

    if(_b.empPhoneNo)
    payload.empPhoneNo = _b.empPhoneNo

    if(_b.empAddress)
    payload.empAddress = _b.empAddress

    if(_b.empAddressLat)
    payload.empAddressLat = _b.empAddressLat

    if(_b.empAddressLong)
    payload.empAddressLong = _b.empAddressLong

    if(_b.empInsuranceNo)
    payload.empInsuranceNo = _b.empInsuranceNo

    if(_b.positionID)
    payload.position_id = _b.positionID
   
    Employee.update(payload ,
        {
            where: {
                empID: _b.empID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No employee found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if(!_b.empID){
        res.status(400).json({status: false, message: "empID does not exists"});
        return
    }


    Employee.destroy(
        {
            where: {
                empID: _b.empID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No employee found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};
