const router = require('express').Router();

const spawn = require('child_process').spawn

router.get('/summary/:username', callSummary);

function callSummary(req, res) {

    const username = req.params.username;

    const process = spawn('python', [
        './api/home/githubUsers/githubUsersScript.py',
        username,
        'summary'
    ]);

    process.stdout.on('data', (data) => {
        const dataString = data.toString();
        const dataObj = JSON.parse(dataString)
        res.status(200).json(dataObj);
    });

    process.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        res.status(500).json({ message: data});
    });

    process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

router.get('/detailed/:username', callDetailed);

function callDetailed(req, res) {

    const username = req.params.username;

    const process = spawn('python', [
        './api/home/githubUsers/githubUsersScript.py',
        username,
        'detailed'
    ]);

    process.stdout.on('data', (data) => {
        const dataString = data.toString();
        const dataObj = JSON.parse(dataString)
        res.status(200).json(dataObj);
    });

    process.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        res.status(500).json({ message: 'Error accessing python script'});
    });

    process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

module.exports = router;