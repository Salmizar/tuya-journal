const express = require('express');
const router = express.Router();
const dal = require('../helpers/dal');
const misc = require('../helpers/misc');

router.get('/:sensor_id', function (request, response) {
    const query = `SELECT * from public.getsensordata(($1),($2),($3));`;
    const values = [request.params.sensor_id, null, null];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
router.get('/:sensor_id/:end_date', function (request, response) {
    const query = `SELECT * from public.getsensordata(($1),($2),($3));`;
    const end_date = misc.milliToTS(Date.now() - (Date.now() - parseInt(request.params.end_date)));
    const values = [request.params.sensor_id, null, end_date];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
router.get('/:sensor_id/entry/:end_date', function (request, response) {
    const query = `SELECT * from public.getsensordata(($1),($2),($3));`;
    const end_date = misc.milliToTS(parseInt(request.params.end_date));
    const values = [request.params.sensor_id, null, end_date];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
router.get('/:sensor_id/:start_date/:end_date', function (request, response) {
    const query = `SELECT * from public.getsensordata(($1),($2),($3));`;
    const start_date = misc.milliToTS(parseInt(request.params.start_date));
    const end_date = misc.milliToTS(parseInt(request.params.end_date));
    const values = [request.params.sensor_id, start_date, end_date];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
module.exports = router;