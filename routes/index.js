const { Router } = require('express');
const axios = require('axios');
const { User, Alarm, AlarState, Message, RootUser } = require('../models/index.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/home', (req, res) => {
    res.send('Welcome to the API!');
  });

router.post('/users', async (req, res) => {
  console.log('REQ BODY', req.body)
    try {
      const { name, email, password } = req.body;
      const newUser = await User.create({
        name: name,
        email: email,
        password: password,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user => ' + error });
    }
  });

  router.get('/users', async (req, res) => {
    try {
      //traer todos los usuarios del modelo Users
      let users = await User.findAll({});
      res.json(users);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/alarms', async (req, res) => {
    console.log(req.body)
    try {
      const { description } = req.body;
      const newAlarm = await Alarm.create({
        description,
      });
      res.status(201).json(newAlarm);
    } catch (error) {
      res.status(500).json({ error: 'Error creating alarm' });
    }
  });

  router.get('/alarms', async (req, res) => {
    try {
      const alarms = await Alarm.findAll();
      res.json(alarms);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving alarms' });
    }
  });

  module.exports = router;
