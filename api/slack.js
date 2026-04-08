export default async function handler(req, res) {
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

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    res.status(response.status).json({ result: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
