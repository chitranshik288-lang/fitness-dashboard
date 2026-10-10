const mongoose = require('mongoose');;
const metricsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now 
    },
    weight: {
        type: Number,
        required: true
    },
     bodyFat: {
        type: Number,
    },
     calories: {
        type: Number,
    },
    height: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Metrics', metricsSchema);