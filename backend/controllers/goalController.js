const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')


const getGoals = asyncHandler(async (req,res) =>{
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})

const setGoal = asyncHandler(async (req, res) => {
  console.log(req.body.text);

    if (!req.body.text) {
      res.status(400)
      throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
      text: req.body.text,
      user: req.user.id
    })
    console.log(req.body);
    res.status(200).json(goal)
  })

const updateGoal = asyncHandler(async (req,res) =>{

    const goal =  await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('goal not found')
    }

    // const user = await User.findById(req.user.id)

    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }

    //to make sure the loged in user matches goal-user
    if (goal.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not Authorized')
    }

    const updateGoal =await Goal.findByIdAndUpdate(req.params.id,req.body,{new: true,})

    res.status(200).json(updateGoal)
})

const deleteGoal = asyncHandler(async (req,res) =>{
    const goal =  await Goal.findById(req.params.id)
    
    if (!goal) {
        res.status(400)
        throw new Error('goal not found')
    }

    // const user = await User.findById(req.user.id)

    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }

    //to make sure the loged in user matches goal-user
    if (goal.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not Authorized')
    }

    await goal.deleteOne({_id:req.params.id})

    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}