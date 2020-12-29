const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')

const team_schema = mongoose.Schema({

    title:{type: string},
    description:{type: string},
    public:{type: bool},
    projects:{type:[objectId]},
    owner:{type: ObjectId},
    admins:{type: [ObjectId]},
    users:{type: [ObjectId]},

})

const Teams = module.exports = mongoose.model('Teams', team_schema)

module.exports.addTeam = async function(newTeam){
    Teams.save(newTeams)
}

module.exports.addAdmin = async function(teamId, userId){
    Teams.updateOne({
        _id: TeamId
      }, {
        $addToSetid:
         {
          admins: userId
        }
      }).exec(callback)
}
module.exports.removeAdmin = function(TeamsId, userId, callback){
    Teams.updateOne({
        _id: TeamsId
      }, {
        $pull:
         {
          admins: userId
        }
      }).exec(callback)
}

module.exports.addUser = function(TeamsId, userId, callback){
    Teams.updateOne({
        _id: TeamsId
      }, {
        $addToSetid: {
          users: userId
        }
      }).exec(callback)
}
module.exports.removeUser = function(TeamsId, userId, callback){
    Teams.updateOne({
        _id: TeamsId
      }, {
        $pull: {
          users: userId
        }
      }).exec(callback)
}
module.exports.getUsersTeamss(userId){
    
}