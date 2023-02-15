const mongoose = require('mongoose');

const userAttributeSchema = new mongoose.Schema({
    Name: String,
    Value: String
}, {
    _id: false
});

const targetUserSchema = new mongoose.Schema({
    UserCreateDate: mongoose.Schema.Types.Mixed,
    Enabled: Boolean,
    Username: String,
    UserLastModifiedDate: mongoose.Schema.Types.Mixed,
    UserStatus: String,
    UserAttributes: [userAttributeSchema]
}, {
    _id: false
});

const shareSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        dropDups: true
    },
    targetUserCompany: String,
    userEmail: String,
    targetUserEmail: String,
    status: String,
    user2Company: String,
    userCompany: String,
    service: String,
    checkIn: Date,
    user2Email: String,
    archived: [String],
    data: mongoose.Schema.Types.Mixed,
    userId: String,
    expirationTime: Date,
    shareable: Boolean,
    targetUser: targetUserSchema,
    user2: targetUserSchema
}, {
    timestamps: true
});

exports.Share = mongoose.model('Share', shareSchema);
