import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3001;

// Habilitar CORS para todas las peticiones
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Aumentar límite para textos largos

// Endpoint proxy
app.post('/api/send-transcript', async (req, res) => {
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

    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Error al enviar la transcripción',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor proxy corriendo en http://localhost:${PORT}`);
  console.log(`📡 Listo para recibir transcripciones`);
});


