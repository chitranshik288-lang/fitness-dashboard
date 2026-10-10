const mongoose=require('mongoose');
const workoutSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date:{
        type: Date,
        
    },
    exercises:[
        {
            name: String,
            sets:[
                {reps: Number, weight: Number}
            ]
        }
    ]
}, {timestamps: true});
module.exports=mongoose.model('Workout',workoutSchema);

