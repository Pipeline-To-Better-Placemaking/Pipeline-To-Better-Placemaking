const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')

const ObjectId = mongoose.Schema.Types.ObjectId

const team_schema = mongoose.Schema({

    ttle:{type: String},
    description:{type: String},
    public:{type: Boolean},
    projects:{type:[ObjectId]},
    owner:{type: ObjectId},
    admins:{type: [ObjectId]},
    users:{type: [ObjectId]},

})

const Teams = module.exports = mongoose.model('Teams', team_schema)

module.exports.getTeamById = async function (teamId){
  return await Teams.findById(teamId)
}

module.exports.allTeamsShort = async function (count = 10, first = 0,userId = -1){
  if (userId != -1){
    return await Teams.find().skip(first).limit(count)
  }
  else{
    return await Teams.find({awards: {$elemMatch: {users:userId}}}).skip(first).limit(count)
  }
}

module.exports.addTeam = async function(newTeam){
    return await Teams.save(newTeams)
}

module.exports.addAdmin = async function(teamId, userId){
    Teams.updateOne({
        _id: TeamId
      }, {
        $addToSetid:
         {
          admins: userId
        }
      })
}
module.exports.removeAdmin = async function(TeamsId, userId){
    Teams.updateOne({
        _id: TeamsId
      }, {
        $pull:
         {
          admins: userId
        }
      })
}

module.exports.addUser = async function(TeamsId, userId){
    Teams.updateOne({
        _id: TeamsId
      }, {
        $addToSetid: {
          users: userId
        }
      })
}
module.exports.removeUser = async function(TeamsId, userId){
    Teams.updateOne({
        _id: TeamsId
      }, {
        $pull: {
          users: userId
        }
      })
}