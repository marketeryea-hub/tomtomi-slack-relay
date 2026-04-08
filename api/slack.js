module.exports = function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST만 가능합니다' });
  }

  var BOT_TOKEN = 'xoxb-7144566404977-10878764230673-4u76Ho3VmbbeOykkwZlg3EWQ';
  var channel = req.body.channel || '책임-운영관련';
  var text = req.body.text || '';

  fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + BOT_TOKEN
    },
    body: JSON.stringify({ channel: channel, text: text })
  })
    .then(function(response) { return response.json(); })
    .then(function(data) {
      if (data.ok) {
        res.status(200).json({ result: 'ok' });
      } else {
        res.status(400).json({ error: data.error });
      }
    })
    .catch(function(error) { res.status(500).json({ error: error.message }); });
};
