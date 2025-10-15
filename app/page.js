'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function Home() {
  const [clientName, setClientName] = useState('')
  const [transcript, setTranscript] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null) // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!clientName.trim()) {
      setStatus('error')
      setErrorMessage('Por favor, ingresa el nombre del cliente.')
      setTimeout(() => setStatus(null), 3000)
      return
    }

    if (!transcript.trim()) {
      setStatus('error')
      setErrorMessage('Por favor, ingresa una transcripción antes de enviar.')
      setTimeout(() => setStatus(null), 3000)
      return
    }

    setIsLoading(true)
    setStatus(null)
    setErrorMessage('')

    try {
      // Enviando al endpoint API de Next.js
      const response = await fetch('/api/send-transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: clientName,
          transcript: transcript
        })
      })

      console.log('Response status:', response.status)
      console.log('Response headers:', response.headers)

      if (response.ok) {
        const responseData = await response.json()
        console.log('Success response:', responseData)
        setStatus('success')
        setClientName('')
        setTranscript('')
      } else {
        const errorText = await response.text()
        console.error('Server error:', response.status, errorText)
        setErrorMessage(`Error del servidor (${response.status}): ${errorText}`)
        throw new Error(`Error del servidor: ${response.status} - ${errorText}`)
      }
    } catch (error) {
      console.error('Error completo:', error)
      setErrorMessage(error.message || 'Error de conexión. Verifica tu internet y el webhook.')
      setStatus('error')
    } finally {
      setIsLoading(false)
      setTimeout(() => {
        setStatus(null)
        setErrorMessage('')
      }, 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 flex items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="glass-card rounded-3xl p-8 shadow-2xl animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-poppins font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Transcript Sender
            </h1>
            <p className="text-gray-300 text-lg">
              Pega tu transcripción de reunión y envíala de forma segura
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="clientName" className="block text-sm font-medium text-gray-200">
                ¿A qué cliente pertenece el transcript?
              </label>
              <input
                id="clientName"
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ej: Empresa ABC, Juan Pérez..."
                className="glass-input w-full px-4 py-3 rounded-xl focus:outline-none text-white placeholder-gray-400"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="transcript" className="block text-sm font-medium text-gray-200">
                Transcripción de la reunión
              </label>
              <textarea
                id="transcript"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Pega aquí el contenido de tu transcripción..."
                className="glass-input w-full h-64 px-4 py-3 rounded-xl resize-none focus:outline-none text-white placeholder-gray-400"
                disabled={isLoading}
              />
            </div>

            {/* Botón de envío */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isLoading || !clientName.trim() || !transcript.trim()}
                className="glass-button px-8 py-4 rounded-xl font-semibold text-white flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar transcripción</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Feedback de estado */}
          {status && (
            <div className={`mt-6 p-4 rounded-xl flex items-start space-x-3 animate-slide-up ${
              status === 'success' 
                ? 'bg-green-500/20 border border-green-400/30 text-green-300' 
                : 'bg-red-500/20 border border-red-400/30 text-red-300'
            }`}>
              {status === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5 mt-0.5" />
                  <div>
                    <span className="font-medium">¡Transcripción enviada correctamente!</span>
                    <p className="text-sm text-green-200 mt-1">El workflow ha sido iniciado exitosamente.</p>
                  </div>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 mt-0.5" />
                  <div>
                    <span className="font-medium">Error al enviar la transcripción</span>
                    {errorMessage && (
                      <p className="text-sm text-red-200 mt-1">{errorMessage}</p>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-400 text-sm">
          <p>Diseñado con ❤️ usando Next.js y Tailwind CSS</p>
        </div>
      </div>
    </div>
  )
}

