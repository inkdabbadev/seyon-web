"use client"

import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Plane,
  Sphere,
} from "@react-three/drei"
import { Download, Heart, X, Target } from "lucide-react"

export type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({ children, cards }: { children: React.ReactNode, cards: Card[] }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  )
}

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 1)
    
    // Add to mount
    mountRef.current.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 2000 // Heavily optimized for mobile FPS
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true, transparent: true, opacity: 0.6 })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect()
      camera.aspect = rect.width / rect.height
      camera.updateProjectionMatrix()
      renderer.setSize(rect.width, rect.height)
    }
    window.addEventListener("resize", handleResize)
    
    // Initial size fix
    setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 z-0 bg-black pointer-events-none" />
}

function FloatingCard({
  card,
  position,
}: {
  card: Card
  position: { x: number; y: number; z: number; rotationX: number; rotationY: number; rotationZ: number }
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }: any) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setSelectedCard(card)
  }
  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }
  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = "auto"
  }

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        ref={meshRef}
        args={[8, 11]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        center
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-40 h-52 rounded-xl overflow-hidden shadow-2xl bg-ss-black/90 backdrop-blur-md p-2 select-none flex flex-col"
          style={{
            boxShadow: hovered
              ? "0 25px 50px rgba(229, 74, 99, 0.4), 0 0 30px rgba(229, 74, 99, 0.2)"
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered ? "2px solid rgba(229, 74, 99, 0.6)" : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <img
            src={card.imageUrl}
            alt={card.alt}
            className="w-full h-40 object-cover rounded-lg flex-grow"
            loading="lazy"
            draggable={false}
          />
          <div className="mt-2 text-center h-4 flex items-center justify-center">
            <p className="text-white text-[9px] font-bold truncate uppercase tracking-widest">{card.title}</p>
          </div>
        </div>
      </Html>
    </group>
  )
}

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selectedCard) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseEnter = () => {}
  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  const handleClose = () => setSelectedCard(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl" onClick={handleBackdropClick}>
      <div className="relative max-w-2xl w-full mx-4">
        <button onClick={handleClose} className="absolute -top-16 right-0 text-white hover:text-ss-pink transition-colors z-10 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
          <X className="w-5 h-5" />
        </button>

        <div style={{ perspective: "1200px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-[2rem] bg-ss-black border border-white/10 p-6 transition-all duration-500 ease-out w-full shadow-[0_0_80px_rgba(255,255,255,0.05)]"
            style={{ transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full h-[70vh] bg-black/50 overflow-hidden flex items-center justify-center rounded-[1.5rem]">
              <img
                loading="lazy"
                className="w-full h-full object-contain p-4"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl || "/placeholder.svg"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CardGalaxy() {
  const { cards } = useCard()

  const cardPositions = useMemo(() => {
    const positions: {
      x: number
      y: number
      z: number
      rotationX: number
      rotationY: number
      rotationZ: number
    }[] = []
    const numCards = cards.length
    const goldenRatio = (1 + Math.sqrt(5)) / 2

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2
      let radiusAtY = Math.sqrt(1 - y * y)
      if (isNaN(radiusAtY)) radiusAtY = 1;

      const theta = (2 * Math.PI * i) / goldenRatio
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      const layerRadius = 12 + (i % 3) * 4

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y) || 1),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      })
    }
    return positions
  }, [cards.length])

  return (
    <>
      <Sphere args={[2, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#E54A63" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#E54A63" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[16, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#E54A63" transparent opacity={0.03} wireframe />
      </Sphere>
      <Sphere args={[20, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#E54A63" transparent opacity={0.015} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </>
  )
}

export default function StellarCardGallerySingle({ cards }: { cards: Card[] }) {
  // We need to limit the number of cards to prevent severe lag in 3D scene.
  // We'll limit it to 42 max to keep it smooth and dense enough.
  const displayCards = cards.slice(0, 42);

  return (
    <CardProvider cards={displayCards}>
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black group z-40">
        <StarfieldBackground />

        <Canvas
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          camera={{ position: [0, 0, 24], fov: 60 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }: any) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <CardGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={5}
              maxDistance={60}
              autoRotate={true}
              autoRotateSpeed={0.8}
              rotateSpeed={0.6}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        <div className="absolute bottom-6 left-6 z-20 text-white pointer-events-none bg-black/60 backdrop-blur-xl p-5 rounded-2xl border border-white/10 transition-opacity duration-700 sm:opacity-0 sm:group-hover:opacity-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-ss-pink flex items-center justify-center animate-pulse">
            <Target size={18} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-ss-pink mb-1">Interactive Galaxy Orbit</p>
            <p className="text-[10px] text-white/50 uppercase tracking-[0.1em]">Drag to rotate • Scroll to zoom • Click cases</p>
          </div>
        </div>
      </div>
    </CardProvider>
  )
}
