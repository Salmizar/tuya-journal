const express = require('express');
const router = express.Router();
const dal = require('../helpers/dal');

router.get('/:sensor_id', function (request, response) {
    const query = `SELECT * from public.getsensordata(($1),($2));`;
    const values = [request.params.sensor_id, null];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
router.get('/:sensor_id/:cutoffdate', function (request, response) {
    const query = `SELECT * from public.getsensordata(($1),($2));`;
    const cutoffdate = new Date(Date.now() - (Date.now() - parseInt(request.params.cutoffdate)));
    const values = [request.params.sensor_id, cutoffdate];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
module.exports = router;