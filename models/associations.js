const Continent = require('./continent.model');
const Country = require('./country.model');
const City = require('./city.model');
const Position = require('./position.model');
const Employee = require('./employee.model');
const Bus = require('./bus.model');
const Flight = require('./flight.model');
const User = require('./user.model');
const Hotel = require('./hotel.model');
const Package = require('./package.model');
const Booking = require('./booking.model');


Continent.hasMany(Country,{foreignKey: 'id_cont', onDelete: 'CASCADE'});
Country.belongsTo(Continent,{foreignKey: 'id_cont'});

Country.hasMany(City,{foreignKey: 'id_country', onDelete: 'CASCADE'});
City.belongsTo(Country,{foreignKey: 'id_country'});

Position.hasMany(Employee,{foreignKey: 'position_id', onDelete: 'CASCADE'});
Employee.belongsTo(Position,{foreignKey: 'position_id'});

Employee.hasMany(Bus,{foreignKey: 'driver_id'});
Bus.belongsTo(Employee,{foreignKey: 'driver_id'});

City.hasMany(Flight,{foreignKey: 'fliStartPoint'});
Flight.belongsTo(City,{as:'startPoint', foreignKey: 'fliStartPoint'});

City.hasMany(Flight,{foreignKey: 'fliEndPoint'});
Flight.belongsTo(City,{as:'endPoint', foreignKey: 'fliEndPoint'});

City.hasMany(Flight,{foreignKey: 'fliLayoverLoc'});
Flight.belongsTo(City,{as:'layoverLoc', foreignKey: 'fliLayoverLoc'});

City.hasMany(Hotel,{foreignKey: 'hotLocID'});
Hotel.belongsTo(City,{foreignKey: 'hotLocID'});

City.hasMany(Package,{foreignKey: 'packLocationID'});
Package.belongsTo(City,{foreignKey: 'packLocationID'});

Hotel.hasMany(Package,{foreignKey: 'packHotelID'});
Package.belongsTo(Hotel,{foreignKey: 'packHotelID'});

Flight.hasMany(Package,{foreignKey: 'packFlightNo'});
Package.belongsTo(Flight,{foreignKey: 'packFlightNo'});

Bus.hasMany(Package,{foreignKey: 'packBusNo'});
Package.belongsTo(Bus,{foreignKey: 'packBusNo'});

User.hasMany(Booking,{foreignKey : {name: 'bookUserID', allowNull: false},onDelete: 'CASCADE'});
Booking.belongsTo(User,{foreignKey : {name: 'bookUserID', allowNull: false},onDelete: 'CASCADE'});


Package.hasMany(Booking,{foreignKey : {name: 'bookPackageID', allowNull: false},onDelete: 'CASCADE'});
Booking.belongsTo(Package,{foreignKey : {name: 'bookPackageID', allowNull: false},onDelete: 'CASCADE'});


module.exports = {
    Continent,
    Country,
    City,
    Position,
    Employee,
    Bus,
    Flight,
    User,
    Hotel,
    Package,
    Booking
};
