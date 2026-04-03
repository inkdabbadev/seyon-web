"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export interface Frame {
  id: string | number
  src: string
  defaultPos: { x: number; y: number; w?: number; h?: number }
  mediaSize?: number
  isHovered?: boolean
}

interface FrameComponentProps {
  src: string
  width: number | string
  height: number | string
  className?: string
  mediaSize?: number
  isHovered: boolean
  showFrame?: boolean
}

function FrameComponent({
  src,
  width,
  height,
  className = "",
  mediaSize = 1,
  isHovered,
  showFrame = false,
}: FrameComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const isVideo = src.match(/\.(mp4|webm|ogg)$/i) !== null;

  useEffect(() => {
    if (isVideo) {
      if (isHovered) {
        videoRef.current?.play().catch(() => {});
      } else {
        videoRef.current?.pause();
      }
    }
  }, [isHovered, isVideo])

  return (
    <div
      className={`relative ${className}`}
      style={{
        width,
        height,
        transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
      }}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl">
        <div
          className="absolute inset-0 flex items-center justify-center bg-ss-light"
          style={{
            zIndex: 1,
            transition: "all 0.3s ease-in-out",
          }}
        >
          <div
            className="w-full h-full overflow-hidden"
            style={{
              transform: `scale(${mediaSize})`,
              transformOrigin: "center",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {isVideo ? (
               <video
                 className="w-full h-full object-cover"
                 src={src}
                 loop
                 muted
                 playsInline
                 ref={videoRef}
               />
            ) : (
               <img
                 className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
                 src={src}
                 alt=""
                 loading="lazy"
               />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface DynamicFrameLayoutProps {
  frames: Frame[]
  className?: string
  hoverSize?: number
  gapSize?: number
  cols?: number
}

export function DynamicFrameLayout({ 
  frames, 
  className,
  hoverSize = 4,
  gapSize = 8,
  cols = 6
}: DynamicFrameLayoutProps) {
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(null)

  // Compute total rows required
  const numRows = Math.ceil(frames.length / cols);

  const getRowSizes = () => {
    if (hovered === null) return new Array(numRows).fill("1fr").join(" ")
    const { row } = hovered
    return Array.from({ length: numRows }).map((_, r) => (r === row ? `${hoverSize}fr` : `1fr`)).join(" ")
  }

  const getColSizes = () => {
    if (hovered === null) return new Array(cols).fill("1fr").join(" ")
    const { col } = hovered
    return Array.from({ length: cols }).map((_, c) => (c === col ? `${hoverSize}fr` : `1fr`)).join(" ")
  }

  const getTransformOrigin = (x: number, y: number) => {
    const vertical = y === 0 ? "top" : y === numRows - 1 ? "bottom" : "center"
    const horizontal = x === 0 ? "left" : x === cols - 1 ? "right" : "center"
    return `${vertical} ${horizontal}`
  }

  return (
    <div
      className={`relative w-full h-full ${className}`}
      style={{
        display: "grid",
        gridTemplateRows: getRowSizes(),
        gridTemplateColumns: getColSizes(),
        gap: `${gapSize}px`,
        transition: "grid-template-rows 0.4s ease, grid-template-columns 0.4s ease",
      }}
    >
      {frames.map((frame, index) => {
        // Automatically calculate row and col if not using explicit defaultPos grid
        const col = index % cols;
        const row = Math.floor(index / cols);
        const transformOrigin = getTransformOrigin(col, row);

        return (
          <motion.div
            key={frame.id}
            className="relative"
            style={{
              transformOrigin,
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={() => setHovered({ row, col })}
            onMouseLeave={() => setHovered(null)}
          >
            <FrameComponent
              src={frame.src}
              width="100%"
              height="100%"
              className="absolute inset-0"
              mediaSize={frame.mediaSize || 1}
              isHovered={hovered?.row === row && hovered?.col === col}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
