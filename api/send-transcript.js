import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Manejar preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { transcript } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    console.log('Enviando transcripción al webhook...');
    console.log('Longitud del texto:', transcript.length, 'caracteres');

    // Enviar al webhook de n8n
    const response = await fetch('https://devwebhook.iacondiego.es/webhook/transcript', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transcript: transcript
      })
    });

    const data = await response.json();
    console.log('Respuesta del webhook:', data);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error al enviar la transcripción',
      message: error.message 
    });
  }
}

