# Transcript Sender

Una aplicación web moderna para enviar transcripciones de reuniones con un diseño glassmorphism y modo oscuro.

## Características

- ✨ **Diseño moderno** con efectos glassmorphism
- 🌙 **Modo oscuro** con paleta de colores vibrantes
- 📱 **Responsive** y optimizado para móviles
- ⚡ **Transiciones suaves** y efectos hover elegantes
- 🔄 **Feedback visual** para el usuario
- 🎨 **Tipografía moderna** (Inter, Poppins)
- 🚀 **Envío directo al webhook** configurado

## Tecnologías

- React 18
- Vite
- Tailwind CSS
- Lucide React (iconos)

## Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Inicia tanto el servidor proxy como la aplicación:
```bash
npm run dev:all
```

Esto iniciará:
- **Frontend** (React) en `http://localhost:5173`
- **Servidor proxy** (Node.js) en `http://localhost:3001`

### Alternativa: Iniciar por separado

Terminal 1:
```bash
npm run server
```

Terminal 2:
```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5173`

## Configuración del Webhook

### Arquitectura

La aplicación usa un **servidor proxy local** para evitar problemas de CORS:

1. **Frontend** (React) → `http://localhost:3001/api/send-transcript`
2. **Servidor Proxy** (Node.js) → `https://devwebhook.iacondiego.es/webhook/transcript`
3. **n8n Webhook** → Procesa la transcripción

### Ventajas de esta arquitectura:

- ✅ **Sin problemas de CORS**
- ✅ **Soporta transcripciones largas** (hasta 50MB)
- ✅ **Logs detallados** en el servidor
- ✅ **Fácil de debugear**

**Respuesta esperada del servidor:**
```json
{
  "message": "Workflow was started"
}
```

## Scripts disponibles

- `npm run dev:all` - Inicia frontend y servidor proxy simultáneamente
- `npm run dev` - Inicia solo el servidor de desarrollo (frontend)
- `npm run server` - Inicia solo el servidor proxy
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## Personalización

Puedes personalizar los colores y efectos en `tailwind.config.js` y `src/index.css`.
