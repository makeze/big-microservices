import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
    console.log("signout");
    res.status(200).send("signout");
});

export {router as signOutRouter}