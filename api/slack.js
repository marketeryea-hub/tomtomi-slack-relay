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

  const WEBHOOK_URL = 'https://hooks.slack.com/services/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';

  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  })
    .then(function(response) { return response.text(); })
    .then(function(text) { res.status(200).json({ result: text }); })
    .catch(function(error) { res.status(500).json({ error: error.message }); });
};
