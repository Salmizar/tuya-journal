const express = require('express');
const router = express.Router();
const dal = require('../helpers/dal');

router.get('/:sensor_id', function (request, response) {
    let query = `SELECT * from public.getsensordata(($1),($2));`;
    let values = [request.params.sensor_id, null];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});

module.exports = router;