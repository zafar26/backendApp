const Sequelize = require('sequelize');
const City = require('../models/city.model');
const Country = require('../models/country.model');
const Continent = require('../models/continent.model');
const Hotel = require('../models/hotel.model');
const config = require('../config');

exports.add = (req, res) => {
    const _b = req.body;

    Hotel.create({
        hotName: _b.hotName,
        hotNameAr: _b.hotNameAr,
        hotPricePerNight: _b.hotPricePerNight,
        hotPriceCurrency: _b.hotPriceCurrency,
        hotPriceCurrencyAr: _b.hotPriceCurrencyAr,
        hotAddress: _b.hotAddress,
        hotAddressAr: _b.hotAddressAr,
        hotLat: _b.hotLat,
        hotLong: _b.hotLong,
        hotTelephoneNo: _b.hotTelephoneNo,
        hotContactEmail: _b.hotContactEmail,
        hotContactEmailAr: _b.hotContactEmailAr,
        hotLocID: _b.hotCityID
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
    
    if(!_b.hotID){
        res.status(400).json({status: false, message: "hotID does not exists"});
        return
    }

    if(_b.hotName)
    payload.hotName = _b.hotName 

    if(_b.hotNameAr)
    payload.hotNameAr = _b.hotNameAr
    
    if(_b.hotPricePerNight)
    payload.hotPricePerNight = _b.hotPricePerNight
    
    if(_b.hotPriceCurrency)
    payload.hotPriceCurrency = _b.hotPriceCurrency

    if(_b.hotPriceCurrencyAr)
    payload.hotPriceCurrencyAr = _b.hotPriceCurrencyAr

    if(_b.hotAddress)
    payload.hotAddress = _b.hotAddress

    if(_b.hotAddressAr)
    payload.hotAddressAr = _b.hotAddressAr

    if(_b.hotLat)
    payload.hotLat = _b.hotLat

    if(_b.hotLong)
    payload.hotLong = _b.hotLong

    if(_b.hotTelephoneNo)
    payload.hotTelephoneNo = _b.hotTelephoneNo

    if(_b.hotContactEmail)
    payload.hotContactEmail = _b.hotContactEmail

    if(_b.hotContactEmailAr)
    payload.hotContactEmailAr = _b.hotContactEmailAr

    if(_b.hotCityID)
    payload.hotLocID = _b.hotCityID


    Hotel.update(payload ,
        {
            where: {
                hotID: _b.hotID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No hot found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.delete = (req, res) => {
    const _b = req.body;

    if(!_b.hotID){
        res.status(400).json({status: false, message: "hotID does not exists"});
        return
    }


    Hotel.destroy(
        {
            where: {
                hotID: _b.hotID
            }
        }
    )
        .then( c => {
            if(!c) throw new Error('No hotel found!');
            res.status(200).json({status: true, category: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};

exports.getAll = (req, res) => {

    Hotel.findAll({
        include: [
            {
                model: City,
                include: [
                    {
                        model: Country,
                        include:[
                            {
                                model: Continent
                            }
                        ],
                        attributes: {
                            exclude: ['createdAt','updatedAt','id_cont']
                        }
                    }
                ],
                attributes: {
                    exclude: ['createdAt','updatedAt','id_country']
                }
            }
        ],
        attributes: {
            exclude: ['hotLocID']
          }
    })
        .then( c => {
            if(!c) throw new Error('No hotel found!');
            res.status(200).json({status: true, data: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};


exports.getByID = (req, res) => {

    Hotel.findOne({
        include: [
            {
                model: City,
                include: [
                    {
                        model: Country,
                        include:[
                            {
                                model: Continent
                            }
                        ],
                        attributes: {
                            exclude: ['createdAt','updatedAt','id_cont']
                        }
                    }
                ],
                attributes: {
                    exclude: ['createdAt','updatedAt','id_country']
                }
            }
        ],
        where: {
            hotID: req.params.hotID

        },
        attributes: {
            exclude: ['hotLocID']
          }
    })
        .then( c => {
            if(!c) throw new Error('No hotel found!');
            res.status(200).json({status: true, data: c});
        })
        .catch(err => {
            console.error(err);
            res.status(400).json({status: false});
        });
};



