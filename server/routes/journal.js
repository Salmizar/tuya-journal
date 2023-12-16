const express = require('express');
const router = express.Router();
const dal = require('../helpers/dal');

router.get('/:journal_id', function (request, response) {
    const query = `SELECT * from public.getjournalentry(($1));`;
    const values = [request.params.journal_id];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
module.exports = router;