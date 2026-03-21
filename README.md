# Studio — Web Design d'Élite

Sito premium realizzato con React, Vite, Framer Motion, React Three Fiber.

## Avvio rapido

```bash
npm install
npm run dev
```

## Deploy su Vercel

```bash
npm run build
```

oppure collega il repo a Vercel — rileva automaticamente Vite.

## Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion (animazioni Luma Effect + scroll-driven)
- @react-three/fiber + @react-three/drei (MeshTransmissionMaterial)
- Lenis (smooth scroll)
- Lucide React (icone)

## Struttura

```
src/
├── App.jsx              # Root, Lenis setup
├── main.jsx
├── index.css            # Noise overlay, @property border, glass
├── hooks/
│   ├── useCursor.js
│   └── useMouse.js
└── components/
    ├── CustomCursor.jsx  # Dot + ring con spring physics
    ├── Preloader.jsx     # Counter cinematografico + slide-up
    ├── Hero.jsx          # Luma Effect + 3D liquid sphere
    ├── Manifesto.jsx     # Scroll-driven word reveal
    ├── Services.jsx      # Bento box + tilt 3D + glow magnetico
    ├── Pricing.jsx       # Animated border + stagger checks
    └── Footer.jsx        # Sticky reveal + magnetic links
```
