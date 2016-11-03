var createError = require('http-errors');
var console = require('../log.js');

var Pdp = function (conf) {
  /*if (conf.hasOwnProperty("storage") && conf["storage"].hasOwnProperty("dbName")) {
      this.conf = conf;
  } else {
      throw createError(500, "Storage module not properly configured!");
  }*/
};

//TODO consider getting info (objects) or Ids also in the same argument... may be easier to call?
Pdp.prototype.canRead = function (userInfo, entityInfo) {
  return new Promise(function (resolve, reject) {
    if (1 == 1)
      resolve();
    else
      reject(createError(403, "user unauthorized for the action for entity :" + JSON.stringify(entityInfo)));

  });
};

function buildPromiseReadAcc(that,userInfo,entity){
  return new Promise(function (res, rej) {
    that.canRead(userInfo, entity).then(function () {
      console.log('user can read entity ' + JSON.stringify(entity));
      res(entity);
    }, res); //NOTE if not possible to read we still resolve but don't add it to the resultset
  });
}


//resolves with an array of entities that can be read (each entry in the array is an entity)
Pdp.prototype.canReadArray = function (userInfo, entitiesArray) {
  var promises = [];
  var that = this;
  return new Promise(function (resolve, reject) {
    for (var i in entitiesArray)
      promises.push(buildPromiseReadAcc(that,userInfo,entitiesArray[i]));

    Promise.all(promisses).then(function (entitiesResult) {
      resolve(entitiesResult);
    }, function (cause) {
      reject(cause);
    });
  });
};

Pdp.prototype.canWrite = function (userInfo, entityInfo) {
  return new Promise(function (resolve, reject) {
    if (true)
      resolve();
    else
      reject(createError(403, "user unauthorized for the action for entity :" + JSON.stringify(entityInfo)));

  });
};

module.exports = Pdp;