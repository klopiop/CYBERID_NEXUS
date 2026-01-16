import React, { useRef, useState, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Shield, Wifi, Fingerprint, Cpu, AlertTriangle } from 'lucide-react';
import type { BadgeData } from '../types';
import { statusConfig } from '../types';

interface BadgeProps {
  data: BadgeData;
  onExportRef?: (ref: React.RefObject<HTMLDivElement | null>) => void;
}

const Badge: React.FC<BadgeProps> = ({ data, onExportRef }) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Use custom colors from data
  const colors = data.colors;

  React.useEffect(() => {
    if (onExportRef) {
      onExportRef(badgeRef);
    }
  }, [onExportRef]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!badgeRef.current) return;
    
    const rect = badgeRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const status = statusConfig[data.status];
  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '.');
  const expiryDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0].replace(/-/g, '.');

  // Organization name based on preset
  const orgName = data.preset.toUpperCase() + ' DIVISION';

  return (
    <div className="perspective-container">
      <div
        ref={badgeRef}
        className="badge-3d relative w-[420px] h-[600px] cursor-pointer"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Main badge container */}
        <div 
          className="absolute inset-0 badge-clip"
          style={{
            background: `linear-gradient(135deg, ${colors.bgPrimary} 0%, ${colors.bgSecondary} 50%, ${colors.bgPrimary} 100%)`,
            boxShadow: isHovering 
              ? `0 0 40px ${colors.glowColor}40, 0 0 80px ${colors.glowColor}20, inset 0 0 60px ${colors.glowColor}10`
              : `0 0 20px ${colors.glowColor}20, inset 0 0 30px ${colors.glowColor}05`,
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {/* Animated border */}
          <div 
            className="absolute inset-0 badge-clip"
            style={{
              background: `linear-gradient(45deg, ${colors.accentPrimary}, ${colors.accentSecondary}, ${colors.accentPrimary}, ${colors.accentSecondary})`,
              backgroundSize: '400% 400%',
              animation: 'border-flow 3s linear infinite',
              padding: '2px',
              zIndex: -1,
            }}
          />

          {/* Inner content container */}
          <div 
            className="absolute inset-[2px] badge-clip overflow-hidden"
            style={{ backgroundColor: colors.bgPrimary }}
          >
            {/* Data grid pattern */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(${colors.accentPrimary}08 1px, transparent 1px),
                  linear-gradient(90deg, ${colors.accentPrimary}08 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
              }}
            />

            {/* Holographic overlay */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: `linear-gradient(
                  135deg,
                  ${colors.accentPrimary}15 0%,
                  ${colors.accentSecondary}15 25%,
                  ${colors.accentPrimary}10 50%,
                  ${colors.accentSecondary}15 75%,
                  ${colors.accentPrimary}15 100%
                )`,
                backgroundSize: '200% 200%',
                animation: 'border-flow 4s ease infinite',
              }}
            />

            {/* Scanlines */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)',
              }}
            />

            {/* Moving scanline */}
            <div 
              className="absolute left-0 right-0 h-1 pointer-events-none"
              style={{
                background: `linear-gradient(180deg, transparent, ${colors.scanlineColor}, transparent)`,
                animation: 'scan-down 3s linear infinite',
              }}
            />
            
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2" style={{ borderColor: colors.borderColor }} />
            <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2" style={{ borderColor: colors.borderColor }} />
            <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2" style={{ borderColor: colors.borderColor }} />
            <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2" style={{ borderColor: colors.borderColor }} />

            {/* Header section */}
            <div 
              className="relative px-6 py-4"
              style={{ 
                background: `linear-gradient(180deg, ${colors.accentPrimary}15 0%, transparent 100%)`,
                borderBottom: `1px solid ${colors.borderColor}30`,
              }}
            >
              {/* Organization name */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield 
                    className="w-6 h-6" 
                    style={{ color: colors.accentPrimary }}
                  />
                  <span 
                    className="font-orbitron text-sm font-bold tracking-[0.3em]"
                    style={{ color: colors.accentPrimary }}
                  >
                    {orgName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Wifi 
                    className="w-4 h-4 animate-pulse" 
                    style={{ color: colors.accentPrimary }}
                  />
                  <div 
                    className="w-2 h-2 rounded-full status-pulse"
                    style={{ backgroundColor: status.color, color: status.color }}
                  />
                </div>
              </div>
              
              {/* Classification bar */}
              <div 
                className="mt-2 py-1 px-3 text-center font-mono text-xs tracking-widest"
                style={{ 
                  background: `${colors.accentPrimary}10`,
                  border: `1px solid ${colors.borderColor}30`,
                  color: colors.accentPrimary,
                }}
              >
                ▲ CLASSIFIED PERSONNEL IDENTIFICATION ▲
              </div>
            </div>

            {/* Photo section */}
            <div className="relative px-6 py-4 flex justify-center">
              <div 
                className="relative w-36 h-44 overflow-hidden"
                style={{
                  clipPath: 'polygon(0 10px, 10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px))',
                  border: `2px solid ${colors.borderColor}`,
                  boxShadow: `0 0 20px ${colors.glowColor}40`,
                }}
              >
                {data.photo ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={data.photo} 
                      alt="Agent Photo" 
                      className="w-full h-full object-cover"
                      style={{ filter: 'grayscale(100%) contrast(1.1)' }}
                    />
                    {/* Duotone overlay */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${colors.accentPrimary}40 0%, ${colors.accentSecondary}40 100%)`,
                        mixBlendMode: 'color',
                      }}
                    />
                    {/* Scanlines on photo */}
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)',
                      }}
                    />
                  </div>
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${colors.accentPrimary}10 0%, ${colors.accentSecondary}10 100%)` }}
                  >
                    <Fingerprint 
                      className="w-16 h-16 opacity-50" 
                      style={{ color: colors.accentPrimary }}
                    />
                  </div>
                )}
                
                {/* Photo frame corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: colors.borderColor }} />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: colors.borderColor }} />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: colors.borderColor }} />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: colors.borderColor }} />
              </div>

              {/* Biometric indicator */}
              <div 
                className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
              >
                <Cpu className="w-4 h-4" style={{ color: colors.accentPrimary }} />
                <div className="flex flex-col gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-1 h-3 rounded-full"
                      style={{ 
                        backgroundColor: i < 4 ? colors.accentPrimary : `${colors.accentPrimary}30`,
                        boxShadow: i < 4 ? `0 0 4px ${colors.glowColor}` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Name and title section */}
            <div className="px-6 py-3 text-center">
              <h2 
                className="font-orbitron text-2xl font-bold tracking-wide glitch-text"
                data-text={data.name}
                style={{ color: colors.textPrimary, textShadow: `0 0 10px ${colors.glowColor}80` }}
              >
                {data.name}
              </h2>
              <p 
                className="font-rajdhani text-lg tracking-[0.2em] mt-1"
                style={{ color: colors.textSecondary }}
              >
                {data.title}
              </p>
              <p 
                className="font-mono text-xs tracking-wider mt-1"
                style={{ color: colors.textMuted }}
              >
                {data.department}
              </p>
            </div>

            {/* Data section */}
            <div 
              className="mx-6 p-4 mt-2"
              style={{
                background: `linear-gradient(135deg, ${colors.accentPrimary}05 0%, ${colors.accentSecondary}05 100%)`,
                border: `1px solid ${colors.borderColor}20`,
              }}
            >
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span style={{ color: colors.textMuted }}>ID:</span>
                  <span 
                    className="ml-2 tracking-wider"
                    style={{ color: colors.textSecondary }}
                  >
                    {data.employeeId}
                  </span>
                </div>
                <div>
                  <span style={{ color: colors.textMuted }}>ACCESS:</span>
                  <span 
                    className="ml-2 tracking-wider"
                    style={{ color: colors.textSecondary }}
                  >
                    {data.accessLevel}
                  </span>
                </div>
                <div>
                  <span style={{ color: colors.textMuted }}>ISSUED:</span>
                  <span className="ml-2 tracking-wider" style={{ color: colors.textMuted }}>{currentDate}</span>
                </div>
                <div>
                  <span style={{ color: colors.textMuted }}>EXPIRES:</span>
                  <span className="ml-2 tracking-wider" style={{ color: colors.textMuted }}>{expiryDate}</span>
                </div>
              </div>
            </div>

            {/* Status indicator */}
            <div className="px-6 py-3 flex items-center justify-center gap-2">
              {data.status === 'suspended' && (
                <AlertTriangle className="w-4 h-4" style={{ color: status.color }} />
              )}
              <span 
                className="font-orbitron text-sm font-bold tracking-[0.3em]"
                style={{ color: status.color, textShadow: `0 0 10px ${status.color}80` }}
              >
                STATUS: {status.label}
              </span>
            </div>

            {/* QR Code section */}
            <div className="px-6 py-3 flex items-center justify-between">
              <div 
                className="p-2"
                style={{
                  background: '#ffffff',
                  border: `2px solid ${colors.borderColor}`,
                }}
              >
                <QRCodeSVG 
                  value={data.qrData || 'https://cyberid.nexus'} 
                  size={64}
                  level="M"
                  fgColor={colors.bgPrimary}
                  bgColor="#ffffff"
                />
              </div>
              
              <div 
                className="flex-1 ml-4 font-mono text-[10px] leading-relaxed"
                style={{ color: colors.textMuted }}
              >
                <div>BIOMETRIC: VERIFIED</div>
                <div>NEURAL LINK: ACTIVE</div>
                <div>ENCRYPTION: AES-512</div>
                <div>AUTH: MULTI-FACTOR</div>
              </div>
              
              {/* Barcode-like decoration */}
              <div className="flex gap-[2px] h-16">
                {[3,1,2,1,3,2,1,2,1,3,1,2,3,1,2].map((h, i) => (
                  <div 
                    key={i}
                    className="w-[2px]"
                    style={{ 
                      height: `${h * 20}%`, 
                      backgroundColor: colors.accentPrimary,
                      alignSelf: 'flex-end',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div 
              className="absolute bottom-0 left-0 right-0 px-6 py-2 text-center font-mono text-[8px] tracking-widest"
              style={{ 
                borderTop: `1px solid ${colors.borderColor}20`,
                color: colors.textMuted,
              }}
            >
              UNAUTHORIZED DUPLICATION IS A FEDERAL OFFENSE • PROPERTY OF {orgName}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-down {
          0% { top: -4px; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Badge;
