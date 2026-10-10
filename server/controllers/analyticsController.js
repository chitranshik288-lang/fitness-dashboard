const Workout= require('../models/Workout');
const Metrics = require('../models/metrics');
const mongoose = require('mongoose');

exports.getWeightProcess=async(req,res)=>{
    try{
        const data = await Metrics.find({
            userId: new mongoose.Types.ObjectId(req.user)
        }).sort({ date: 1 });

        const result= data.map(item=>({
            date: item.date,
            weight: item.weight
        }))
        res.json(result);
    }catch(err){
        res.status(500).json(err.message);
    }
};

exports.getStrengthProgress=async(req,res)=>{
    try{
        const workouts= await Workout.find({userId: new mongoose.Types.ObjectId(req.user)}).sort({ date: 1 });
        let strengthData=[];
        workouts.forEach(workout=>{
            workout.exercises.forEach(ex=>{
                if (!ex.sets || ex.sets.length === 0) {
                    return;
                }
                const maxWeight= Math.max(...ex.sets.map(set=>set.weight));
                 strengthData.push({
                    exercise: ex.name,
                    date: workout.date,
                    maxWeight
                });
            });
        });
        res.json(strengthData);
    }catch(err){
        res.status(500).json(err.message);
    }
};

exports.getPlateau=async(req,res)=>{
    try{
        const metrics=await Metrics.find({userId: new mongoose.Types.ObjectId(req.user)}).sort({ date: -1 }).limit(7);
        if(metrics.length<2){
            return res.json({message: 'Not enough data to determine plateau.'});
        }
        const weights=metrics.map(m=>m.weight);
        const isPlateau= weights.every(w=> w===weights[0]);
        res.json({plateau: isPlateau,message: isPlateau ? 'You are in a plateau.' : 'You are making progress!'});
    }catch(err){
        res.status(500).json(err.message);
    }
    };

    exports.getInights= async(req,res)=>{
        try{
            const metrics= await Metrics.find({userId: new mongoose.Types.ObjectId(req.user)}).sort({ date: 1 });

            if(metrics.length<2){
                return res.json(["Not enough data to provide insights."]);
            }
            const first = metrics[0].weight;
            const last = metrics[metrics.length - 1].weight;

            let insights=[];
            const diff= last-first;
            if(diff>0){
                insights.push(`Your weight has increased by ${diff} kg since you started tracking.`);
            }
            else if(diff<0){
                insights.push(`Your weight has decreased by ${Math.abs(diff)} kg since you started tracking. Great job!`);
            }
            else{
                insights.push('Your weight has remained stable since you started tracking.');
            }

            if(metrics.length<5){
                insights.push('Keep tracking  to see more trends and insights over time.');
            }
            else{
                insights.push('You have been tracking for a while, keep it up to maintain your progress!');
            }
            res.json(insights);
        }
        catch(err){
            res.status(500).json(err.message);
        }
       
    };

