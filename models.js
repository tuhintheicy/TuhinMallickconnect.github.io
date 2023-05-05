const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    clientEmail: {
        index: true,
        unique: true,
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "please enter a valid email"
        },
        required: [true, "Email required"]
    },
    clientEnquiry: {
        type: String,
        trim: true,
        default: ""
    },
    clientWillingToWork: {
        type: Boolean,
        required: true
    }
}, { versionKey: "version" })

const Client = mongoose.model("Client", ClientSchema)

module.exports = {
    Client
}