import { useState, useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import Badge from './components/Badge';
import Editor from './components/Editor';
import type { BadgeData } from './types';
import { defaultBadgeData } from './types';
import { Zap, Github, Terminal } from 'lucide-react';

function App() {
  const [badgeData, setBadgeData] = useState<BadgeData>(defaultBadgeData);
  const [isExporting, setIsExporting] = useState(false);
  const badgeRef = useRef<React.RefObject<HTMLDivElement | null> | null>(null);

  const handleExportRef = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    badgeRef.current = ref;
  }, []);

  const handleExport = async () => {
    if (!badgeRef.current?.current) return;

    setIsExporting(true);
    
    try {
      // Wait for animations to settle
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(badgeRef.current.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `cyber-badge-${badgeData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Use colors from badgeData
  const colors = badgeData.colors;

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: colors.bgPrimary }}
    >
      {/* Data grid pattern */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(${colors.accentPrimary}05 1px, transparent 1px),
            linear-gradient(90deg, ${colors.accentPrimary}05 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Ambient background effects */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, ${colors.accentPrimary}15 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, ${colors.accentSecondary}15 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Tech grid lines */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div 
          className="absolute top-1/4 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.accentPrimary}, transparent)` }}
        />
        <div 
          className="absolute top-3/4 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${colors.accentSecondary}, transparent)` }}
        />
        <div 
          className="absolute left-1/4 top-0 bottom-0 w-px"
          style={{ background: `linear-gradient(180deg, transparent, ${colors.accentPrimary}, transparent)` }}
        />
        <div 
          className="absolute left-3/4 top-0 bottom-0 w-px"
          style={{ background: `linear-gradient(180deg, transparent, ${colors.accentSecondary}, transparent)` }}
        />
      </div>

      {/* Header */}
      <header 
        className="relative z-10 border-b backdrop-blur-sm"
        style={{ 
          borderColor: `${colors.accentPrimary}20`,
          backgroundColor: `${colors.bgSecondary}80`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Zap className="w-8 h-8" style={{ color: colors.accentPrimary }} />
              <div 
                className="absolute inset-0 blur-md animate-pulse"
                style={{ backgroundColor: `${colors.accentPrimary}50` }}
              />
            </div>
            <div>
              <h1 className="font-orbitron text-xl font-bold tracking-wider" style={{ color: colors.textPrimary }}>
                CYBER<span style={{ color: colors.accentPrimary }}>ID</span> NEXUS
              </h1>
              <p className="text-xs font-mono tracking-widest" style={{ color: colors.textMuted }}>
                SCI-FI BADGE GENERATOR v2.0.77
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono" style={{ color: colors.textMuted }}>
              <Terminal className="w-4 h-4" />
              <span>SYSTEM: ONLINE</span>
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#00ff9f' }}
              />
            </div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 border transition-all"
              style={{ 
                borderColor: `${colors.accentPrimary}30`,
                color: colors.accentPrimary,
              }}
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full px-6 py-12 flex justify-center">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-16 xl:gap-24">
          {/* Editor Panel */}
          <div className="w-full lg:w-auto order-2 lg:order-1">
            <Editor
              data={badgeData}
              onChange={setBadgeData}
              onExport={handleExport}
              isExporting={isExporting}
            />
          </div>

          {/* Badge Preview */}
          <div className="w-full lg:w-auto flex flex-col items-center order-1 lg:order-2">
            <div className="mb-4 flex items-center gap-2 text-sm font-rajdhani" style={{ color: colors.textMuted }}>
              <span 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#00ff9f' }}
              />
              LIVE PREVIEW
              <span className="text-xs font-mono" style={{ color: `${colors.accentPrimary}80` }}>
                (hover for 3D effect)
              </span>
            </div>
            
            <Badge 
              data={badgeData} 
              onExportRef={handleExportRef}
            />

            {/* Preview info */}
            <div className="mt-6 text-center">
              <p className="text-xs font-mono" style={{ color: colors.textMuted }}>
                OUTPUT: 840 × 1200px @ 2x
              </p>
              <p className="text-xs font-mono mt-1" style={{ color: `${colors.textMuted}80` }}>
                FORMAT: PNG-24 with transparency
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer 
        className="relative z-10 border-t mt-12"
        style={{ borderColor: `${colors.accentPrimary}10` }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-center" style={{ color: colors.textMuted }}>
            © 2077 CYBERID NEXUS • ALL RIGHTS RESERVED • BUILT FOR THE FUTURE
          </p>
          <div className="flex items-center gap-6 text-xs font-mono" style={{ color: colors.textMuted }}>
            <span>ENCRYPTION: AES-512</span>
            <span>PROTOCOL: SECURE</span>
            <span style={{ color: '#00ff9f' }}>STATUS: OPERATIONAL</span>
          </div>
        </div>
      </footer>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: Math.random() > 0.5 ? colors.accentPrimary : colors.accentSecondary,
              animation: `float-particle ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          50% {
            transform: translateY(-100vh) translateX(50px);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
