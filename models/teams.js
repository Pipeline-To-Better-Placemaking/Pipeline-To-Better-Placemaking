const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const ObjectId = mongoose.Schema.Types.ObjectId

const team_schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    public: {
        type: Boolean,
        default: false
    },
    projects: [{
        type: ObjectId,
        ref: 'Projects'
    }],
    users: [{
        user: {
            type: ObjectId,
            required: true
        },
        role: {
            type: String,
            enum: ['owner','admin','user'],
            required: true
        }
    }]
})

team_schema.plugin(uniqueValidator)

const Teams = module.exports = mongoose.model('Teams', team_schema)

module.exports.addTeam = async function (newTeam) {
    return await newTeam.save()
}

module.exports.updateTeam = async function (teamId, newTeam) {
    return await Teams.updateOne(
        { _id: teamId },
        { $set: {
            title: newTeam.title,
            description: newTeam.description,
            public: newTeam.public
        }}
    )
}

module.exports.deleteTeam = async function(teamId) {
    return await Teams.findByIdAndDelete(teamId)
}

module.exports.allTeamsShort = async function (count = 10, first = 0, userId = -1) {
    if (userId != -1) {
        return await Teams.find().skip(first).limit(count)
    }
    else {
        return await Teams.find({ awards: { $elemMatch: { users: userId }}}).skip(first).limit(count)
    }
}

module.exports.addProject = async function(teamId, projectId) {
    await Teams.updateOne(
        { _id: teamId },
        { $push: { projects: projectId } }
    )
}

module.exports.removeProject = async function(teamId, projectId) {
    return await Teams.updateOne(
        { _id: teamId },
        { $pull: { projects: projectId } }
    )
}


module.exports.promote = async function(teamId, userId) {
    Teams.updateOne(
        {
            _id: teamsId,
            users: { $elemMatch: { userId: uId, roll: 'user' }}
        },
        { $set: { "users.$.roll": 'user' }}
    )
}
module.exports.demote = async function(teamsId, uId) {
    Teams.updateOne(
        {
            _id: teamsId,
            users: { $elemMatch: { userId: uId, roll: 'admin' }}
        },
        { $set: { "users.$.roll": 'user' }}
    )
}

module.exports.isAdmin = async function(teamId, uId) {
    const doc = Teams.find(
        {
            _id: teamId,
            users: {
                $elemMatch: {
                    userId: uId, $or: [
                        { role: 'admin' },
                        { role: 'owner' }
                    ]
                }
            }
        }
    )

    if (doc.length === 0) {
        return false
    }
    return true
}

module.exports.isOwner = async function(teamId, uId) {
    const doc = Teams.find(
        {
            _id: teamId,
            users: { $elemMatch: { userId: uId, role: 'owner' }}
        }
    )

    if (doc.length === 0) {
        return false
    }
    return true
}

module.exports.isUser = async function(teamId, uId) {
    const doc = Teams.find(
        {
            _id: teamId,
            users: { $elemMatch: { userId: uId }}
        }
    )

    if (doc.length === 0) {
        return false
    }
    return true
}

module.exports.addUser = async function(teamsId, uId) {
    Teams.updateOne(
        { _id: teamsId },
        { $addToSetid: { users: { userId: uId, roll: 'user' }}}
    )
}

module.exports.removeUser = async function(TeamsId, uId) {
    Teams.updateOne(
        { _id: TeamsId },
        { $pull: { users: { userId: uId, roll: 'user' }}}
    )
}