// server.js（CommonJS版）
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// 起動確認用（ブラウザGETで表示される）
app.get('/car', (_req, res) => {
  res.json({ info: 'POST /car に JSON を送ってください' });
});

// 本来のAPI（POST）
app.post('/car', (req, res) => {
  console.log('📦 受信:', req.body);
  res.json({ success: true, id: 'C-001' });
});

app.listen(port, () => {
  console.log(`🚗 Mock API running at http://localhost:${port}`);
});
