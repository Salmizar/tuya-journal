const express = require('express');
const router = express.Router();
const dal = require('../helpers/dal');

router.get('/:sensor_id', function (request, response) {
    const query = `SELECT * from public.getsensordata(($1),($2),($3));`;
    const values = [request.params.sensor_id, null, null];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
router.get('/:sensor_id/:cut_off_date', function (request, response) {
    const query = `SELECT * from public.getsensordata(($1),($2),($3));`;
    const cut_off_date = new Date(Date.now() - (Date.now() - parseInt(request.params.cutoffdate)));
    const values = [request.params.sensor_id, cut_off_date, null];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
router.get('/:sensor_id/entry/:capture_date', function (request, response) {
    const query = `SELECT * from public.getsensordata(($1),($2),($3));`;
    const capture_date = new Date(parseInt(request.params.capture_date));
    const values = [request.params.sensor_id, null, capture_date];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
module.exports = router;