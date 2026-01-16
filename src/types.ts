export interface ColorScheme {
  // Background colors
  bgPrimary: string;      // Main badge background
  bgSecondary: string;    // Secondary panels/sections
  
  // Accent colors
  accentPrimary: string;  // Main accent (borders, highlights)
  accentSecondary: string; // Secondary accent
  
  // Text colors
  textPrimary: string;    // Main text (name)
  textSecondary: string;  // Secondary text (title, labels)
  textMuted: string;      // Muted text (descriptions)
  
  // Special elements
  glowColor: string;      // Glow effects
  borderColor: string;    // Border color
  scanlineColor: string;  // Scanline overlay
}

export interface BadgeData {
  name: string;
  title: string;
  department: string;
  employeeId: string;
  accessLevel: string;
  photo: string | null;
  qrData: string;
  status: 'active' | 'suspended' | 'classified';
  preset: string;
  colors: ColorScheme;
}

// Style Presets - carefully designed to avoid color conflicts
export const stylePresets: Record<string, { name: string; colors: ColorScheme }> = {
  cyberpunk: {
    name: 'CYBERPUNK',
    colors: {
      bgPrimary: '#0a0a0f',
      bgSecondary: '#12121a',
      accentPrimary: '#00f5ff',
      accentSecondary: '#ff00ff',
      textPrimary: '#ffffff',
      textSecondary: '#00f5ff',
      textMuted: '#888899',
      glowColor: '#00f5ff',
      borderColor: '#00f5ff',
      scanlineColor: 'rgba(0, 245, 255, 0.3)',
    },
  },
  neonNoir: {
    name: 'NEON NOIR',
    colors: {
      bgPrimary: '#0d0d0d',
      bgSecondary: '#1a1a1a',
      accentPrimary: '#ff0066',
      accentSecondary: '#ff6600',
      textPrimary: '#ffffff',
      textSecondary: '#ff0066',
      textMuted: '#666666',
      glowColor: '#ff0066',
      borderColor: '#ff0066',
      scanlineColor: 'rgba(255, 0, 102, 0.3)',
    },
  },
  matrix: {
    name: 'MATRIX',
    colors: {
      bgPrimary: '#000000',
      bgSecondary: '#0a1f0a',
      accentPrimary: '#00ff00',
      accentSecondary: '#00cc00',
      textPrimary: '#00ff00',
      textSecondary: '#00dd00',
      textMuted: '#008800',
      glowColor: '#00ff00',
      borderColor: '#00ff00',
      scanlineColor: 'rgba(0, 255, 0, 0.2)',
    },
  },
  military: {
    name: 'MILITARY',
    colors: {
      bgPrimary: '#1a1c1a',
      bgSecondary: '#252825',
      accentPrimary: '#c9a227',
      accentSecondary: '#8b7355',
      textPrimary: '#e8e4d9',
      textSecondary: '#c9a227',
      textMuted: '#7a7a6a',
      glowColor: '#c9a227',
      borderColor: '#c9a227',
      scanlineColor: 'rgba(201, 162, 39, 0.2)',
    },
  },
  arctic: {
    name: 'ARCTIC',
    colors: {
      bgPrimary: '#0a1628',
      bgSecondary: '#132238',
      accentPrimary: '#88ccff',
      accentSecondary: '#4499dd',
      textPrimary: '#e8f4ff',
      textSecondary: '#88ccff',
      textMuted: '#5588aa',
      glowColor: '#88ccff',
      borderColor: '#88ccff',
      scanlineColor: 'rgba(136, 204, 255, 0.2)',
    },
  },
  sunset: {
    name: 'SUNSET',
    colors: {
      bgPrimary: '#1a0a14',
      bgSecondary: '#2a1020',
      accentPrimary: '#ff6b35',
      accentSecondary: '#f72585',
      textPrimary: '#fff0e8',
      textSecondary: '#ff6b35',
      textMuted: '#996655',
      glowColor: '#ff6b35',
      borderColor: '#ff6b35',
      scanlineColor: 'rgba(255, 107, 53, 0.2)',
    },
  },
  phantom: {
    name: 'PHANTOM',
    colors: {
      bgPrimary: '#0f0a1a',
      bgSecondary: '#1a1028',
      accentPrimary: '#9d4edd',
      accentSecondary: '#7b2cbf',
      textPrimary: '#e8dff5',
      textSecondary: '#9d4edd',
      textMuted: '#6b5b7a',
      glowColor: '#9d4edd',
      borderColor: '#9d4edd',
      scanlineColor: 'rgba(157, 78, 221, 0.2)',
    },
  },
  hologram: {
    name: 'HOLOGRAM',
    colors: {
      bgPrimary: '#050510',
      bgSecondary: '#0a0a20',
      accentPrimary: '#00ffff',
      accentSecondary: '#ff00ff',
      textPrimary: '#ffffff',
      textSecondary: '#00ffff',
      textMuted: '#5588aa',
      glowColor: '#00ffff',
      borderColor: '#00ffff',
      scanlineColor: 'rgba(0, 255, 255, 0.15)',
    },
  },
  bloodmoon: {
    name: 'BLOOD MOON',
    colors: {
      bgPrimary: '#0a0505',
      bgSecondary: '#150808',
      accentPrimary: '#cc0000',
      accentSecondary: '#880000',
      textPrimary: '#ffcccc',
      textSecondary: '#ff4444',
      textMuted: '#884444',
      glowColor: '#cc0000',
      borderColor: '#cc0000',
      scanlineColor: 'rgba(204, 0, 0, 0.2)',
    },
  },
  corporate: {
    name: 'CORPORATE',
    colors: {
      bgPrimary: '#0c1929',
      bgSecondary: '#142238',
      accentPrimary: '#3b82f6',
      accentSecondary: '#1d4ed8',
      textPrimary: '#f0f9ff',
      textSecondary: '#60a5fa',
      textMuted: '#64748b',
      glowColor: '#3b82f6',
      borderColor: '#3b82f6',
      scanlineColor: 'rgba(59, 130, 246, 0.2)',
    },
  },
};

export const defaultColorScheme = stylePresets.cyberpunk.colors;

export const defaultBadgeData: BadgeData = {
  name: 'AGENT ZERO',
  title: 'SENIOR OPERATIVE',
  department: 'CYBER SECURITY',
  employeeId: 'NX-7734-ALPHA',
  accessLevel: 'LEVEL 5',
  photo: null,
  qrData: 'https://cyberid.nexus/verify',
  status: 'active',
  preset: 'cyberpunk',
  colors: { ...defaultColorScheme },
};

export const accessLevels = [
  'LEVEL 1 - PUBLIC',
  'LEVEL 2 - RESTRICTED',
  'LEVEL 3 - CONFIDENTIAL',
  'LEVEL 4 - SECRET',
  'LEVEL 5 - TOP SECRET',
  'LEVEL 6 - BLACK OPS',
  'LEVEL 7 - OMEGA',
];

export const statusConfig = {
  active: { label: 'ACTIVE', color: '#00ff9f' },
  suspended: { label: 'SUSPENDED', color: '#ff0044' },
  classified: { label: 'CLASSIFIED', color: '#f5ff00' },
};
