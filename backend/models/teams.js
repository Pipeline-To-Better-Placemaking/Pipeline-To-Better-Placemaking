const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../utils/config.js')

const ObjectId = mongoose.Schema.Types.ObjectId

const team_schema = mongoose.Schema({

    title:{type: String},
    description:{type: String},
    public:{type: Boolean},
    projects:{type:[ObjectId]},
    owner:{type: ObjectId},
    admins:{type: [ObjectId]},
    users:{type: [ObjectId]},

})

const Teams = module.exports = mongoose.model('Teams', team_schema)

module.exports.addTeam = async function (newTeam){
  return await newTeam.save()
}

module.exports.updateTeam = async function (teamId, newTeam){
  return await Teams.updateOne(
    {_id:teamId},
    {$set: {title:newTeam.title,
            description:newTeam.description,
            public:newTeam.public
        }}
    )
}

module.exports.allTeamsShort = async function (count = 10, first = 0,userId = -1){
  if (userId != -1){
    return await Teams.find().skip(first).limit(count)
  }
  else{
    return await Teams.find({awards: {$elemMatch: {users:userId}}}).skip(first).limit(count)
  }
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
module.exports.removeAdmin = async function(teamsId, userId){
    Teams.updateOne({
        _id: teamsId
      }, {
        $pull:
         {
          admins: userId
        }
      })
}

module.exports.isAdmin = async function(teamId, userId){
  doc = Teams.find({
    _id: teamId,
    admins: {$elemMatch: userId}
  })

  if (doc.length === 0){
    return false
  }
  return true

}

module.exports.addUser = async function(teamsId, userId){
    Teams.updateOne({
        _id: teamsId
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