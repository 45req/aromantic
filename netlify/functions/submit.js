const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Only POST allowed' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid JSON' }),
    };
  }

  const query = body.query;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing query' }),
    };
  }

  const webhookUrl = 'https://discord.com/api/webhooks/1386027994556141618/dzvAPcOU_ALxasTPSVgdB3I4Qaag00GZyhPW-63knER_y77IT4KKUqHmDJwcDHzcP2jz';

  const payload = {
    embeds: [
      {
        title: 'New Query',
        description: query,
        color: 0x00ff00,
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: `Discord error: ${response.status}` }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Sent!' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Unknown error' }),
    };
  }
};
