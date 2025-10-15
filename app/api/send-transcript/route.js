import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { transcript } = await request.json()

    if (!transcript) {
      return NextResponse.json(
        { error: 'Transcript is required' },
        { status: 400 }
      )
    }

    console.log('Enviando transcripción al webhook...')
    console.log('Longitud del texto:', transcript.length, 'caracteres')

    // Enviar al webhook de n8n
    const response = await fetch('https://devwebhook.iacondiego.es/webhook/transcript', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transcript: transcript
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error del webhook:', response.status, errorText)
      return NextResponse.json(
        { 
          error: 'Error al enviar la transcripción al webhook',
          message: errorText 
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Respuesta del webhook:', data)

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Error en la API:', error)
    return NextResponse.json(
      { 
        error: 'Error al enviar la transcripción',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

