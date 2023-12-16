const express = require('express');
const router = express.Router();
const dal = require('../helpers/dal');

router.get('/', function (request, response) {
    const query = `SELECT * from public.getjournals();`;
    const values = [];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
module.exports = router;