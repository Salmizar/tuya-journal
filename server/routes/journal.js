const express = require('express');
const router = express.Router();
const dal = require('../helpers/dal');
const misc = require('../helpers/misc');

router.get('/:journal_id', function (request, response) {
    const query = `SELECT * from public.getjournalentry(($1));`;
    const values = [request.params.journal_id];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
router.delete('/:journal_id', function (request, response) {
    const query = `SELECT * from public.deletejournalentry(($1));`;
    const values = [request.params.journal_id];
    console.log(values);
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
router.put('/:journal_id', function (request, response) {
    const query = `SELECT * from public.updatejournalentry(($1), ($2), ($3));`;
    const values = [request.params.journal_id, request.body.details, misc.milliToTS(request.body.created_date)];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
router.post('/', function (request, response) {
    const query = `SELECT * from public.insertjournalentry(($1), ($2));`;
    const values = [request.body.details,misc.milliToTS(request.body.created_date)];
    dal.query(query, values).then((data) => {
        response.json(data);
    })
});
module.exports = router;