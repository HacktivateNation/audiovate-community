const express = require('express');
const app = express();
const port = 3000;
const path = require('path')

// app.use(express.static('public'));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get('/circle', (req, res) => {
  // res.send('Circle');
  res.sendFile(path.join(__dirname+'/public/circle.html'));
});
app.get('/blurry', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/blurry.html'));
});
app.get('/lambobot', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/lambobot.html'));
});
app.get('/benson', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/benson.html'));
});
app.get('/colorfulstarburst', (req, res) => {
  res.sendFile(path.join(__dirname+'/public/colorfulstarburst.html'));
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});