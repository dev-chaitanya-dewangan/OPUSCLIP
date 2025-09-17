"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface InteractiveGridPatternProps {
  width?: number;
  height?: number;
  squares?: [number, number];
  strokeDasharray?: string | number;
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [10, 10],
  strokeDasharray = 0,
  className,
  squaresClassName,
}: InteractiveGridPatternProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSquares, setHoveredSquares] = useState<Set<string>>(new Set());
  const [lastHovered, setLastHovered] = useState<[number, number] | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const getMousePosition = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return null;
    
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const mousePos = getMousePosition(e);
    if (!mousePos) return;

    const svg = svgRef.current;
    if (!svg) return;

    const newHovered = new Set<string>();
    const [cols, rows] = squares;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * width;
        const y = j * height;
        
        // Check if mouse is within this square
        if (
          mousePos.x >= x &&
          mousePos.x <= x + width &&
          mousePos.y >= y &&
          mousePos.y <= y + height
        ) {
          newHovered.add(`${i}-${j}`);
          setLastHovered([i, j]);
        }
      }
    }
    
    setHoveredSquares(newHovered);
  };

  const handleMouseLeave = () => {
    setHoveredSquares(new Set());
    setLastHovered(null);
  };

  // Add ripple effect from last hovered square
  useEffect(() => {
    if (!lastHovered) return;
    
    const [lastX, lastY] = lastHovered;
    const [cols, rows] = squares;
    
    // Create ripple effect
    const rippleSquares = new Set<string>();
    for (let i = Math.max(0, lastX - 2); i <= Math.min(cols - 1, lastX + 2); i++) {
      for (let j = Math.max(0, lastY - 2); j <= Math.min(rows - 1, lastY + 2); j++) {
        // Calculate distance
        const distance = Math.sqrt(Math.pow(i - lastX, 2) + Math.pow(j - lastY, 2));
        if (distance <= 2) {
          rippleSquares.add(`${i}-${j}`);
        }
      }
    }
    
    setHoveredSquares(rippleSquares);
    
    // Clear after delay
    const timer = setTimeout(() => {
      setHoveredSquares(new Set());
    }, 300);
    
    return () => clearTimeout(timer);
  }, [lastHovered, squares]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 h-full w-full", className)}
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className="absolute inset-0 h-full w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
          >
            <path
              d={`M ${width} 0 L 0 0 0 ${height}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        {Array.from({ length: squares[0] }).map((_, i) =>
          Array.from({ length: squares[1] }).map((_, j) => {
            const isActive = hoveredSquares.has(`${i}-${j}`);
            return (
              <rect
                key={`${i}-${j}`}
                width={width - 1}
                height={height - 1}
                x={i * width + 0.5}
                y={j * height + 0.5}
                className={cn(
                  "fill-none transition-all duration-300",
                  isActive ? "fill-accent/20 stroke-accent" : "stroke-border",
                  squaresClassName
                )}
                strokeWidth="1"
              />
            );
          })
        )}
      </svg>
    </div>
  );
}