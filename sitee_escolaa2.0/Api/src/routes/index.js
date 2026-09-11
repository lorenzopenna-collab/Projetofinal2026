const { Router } = require('express');
const studentRoutes = require('./AuthRoutes.js');
const gradesRoutes = require('./GradesRoutes.js');
const absencesRoutes = require('./AbsencesRoutes.js');

const routes = Router();

routes.use('/api', studentRoutes);
routes.use('/api', gradesRoutes);
routes.use('/api', authRoutes);

module.exports = routes;