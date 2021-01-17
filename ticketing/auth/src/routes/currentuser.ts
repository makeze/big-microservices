import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.status(200).send("currentuser");
});

export {router as currentUserRouter}