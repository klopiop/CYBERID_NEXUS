import React, { useRef, useState } from 'react';
import { 
  User, Briefcase, Building2, Hash, ShieldCheck, 
  QrCode, Camera, Download, Sparkles, RotateCcw,
  Palette, ChevronDown, ChevronUp
} from 'lucide-react';
import type { BadgeData, ColorScheme } from '../types';
import { stylePresets, accessLevels, defaultBadgeData } from '../types';
import ColorPicker from './ColorPicker';

interface EditorProps {
  data: BadgeData;
  onChange: (data: BadgeData) => void;
  onExport: () => void;
  isExporting: boolean;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, onExport, isExporting }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showColorPanel, setShowColorPanel] = useState(false);

  const handleChange = (field: keyof BadgeData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleColorChange = (colorKey: keyof ColorScheme, value: string) => {
    onChange({
      ...data,
      colors: { ...data.colors, [colorKey]: value },
    });
  };

  const handlePresetChange = (presetKey: string) => {
    const preset = stylePresets[presetKey];
    if (preset) {
      onChange({
        ...data,
        preset: presetKey,
        colors: { ...preset.colors },
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    onChange(defaultBadgeData);
  };

  const presetEntries = Object.entries(stylePresets);

  return (
    <div 
      className="w-full max-w-md backdrop-blur-sm border p-6 rounded-lg"
      style={{
        backgroundColor: `${data.colors.bgSecondary}cc`,
        borderColor: `${data.colors.accentPrimary}30`,
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center gap-3 mb-6 pb-4 border-b"
        style={{ borderColor: `${data.colors.accentPrimary}30` }}
      >
        <Sparkles className="w-6 h-6" style={{ color: data.colors.accentPrimary }} />
        <h2 className="font-orbitron text-xl font-bold text-white tracking-wide">
          BADGE CONFIGURATOR
        </h2>
      </div>

      <div className="space-y-5">
        {/* Style Presets */}
        <div>
          <label 
            className="flex items-center gap-2 text-sm font-rajdhani mb-3"
            style={{ color: `${data.colors.accentPrimary}cc` }}
          >
            <Palette className="w-4 h-4" />
            STYLE PRESET
          </label>
          <div className="grid grid-cols-5 gap-2">
            {presetEntries.map(([key, preset]) => (
              <button
                key={key}
                onClick={() => handlePresetChange(key)}
                className={`aspect-square rounded-lg border-2 transition-all flex items-center justify-center group relative ${
                  data.preset === key 
                    ? 'scale-110 shadow-lg' 
                    : 'hover:scale-105 opacity-60 hover:opacity-100'
                }`}
                style={{
                  borderColor: data.preset === key ? preset.colors.accentPrimary : `${preset.colors.accentPrimary}40`,
                  backgroundColor: preset.colors.bgPrimary,
                  boxShadow: data.preset === key ? `0 0 20px ${preset.colors.accentPrimary}50` : 'none',
                }}
                title={preset.name}
              >
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ 
                    background: `linear-gradient(135deg, ${preset.colors.accentPrimary}, ${preset.colors.accentSecondary})`,
                  }}
                />
                {/* Tooltip */}
                <div 
                  className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity rounded z-20"
                  style={{ backgroundColor: preset.colors.accentPrimary, color: preset.colors.bgPrimary }}
                >
                  {preset.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Color Panel Toggle */}
        <div>
          <button
            onClick={() => setShowColorPanel(!showColorPanel)}
            className="w-full flex items-center justify-between px-4 py-3 rounded border transition-all"
            style={{
              borderColor: `${data.colors.accentPrimary}40`,
              backgroundColor: `${data.colors.bgPrimary}80`,
              color: data.colors.accentPrimary,
            }}
          >
            <span className="flex items-center gap-2 text-sm font-rajdhani">
              <Palette className="w-4 h-4" />
              ADVANCED COLOR CONTROLS
            </span>
            {showColorPanel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          {showColorPanel && (
            <div 
              className="mt-3 p-4 rounded border space-y-3"
              style={{
                borderColor: `${data.colors.accentPrimary}20`,
                backgroundColor: `${data.colors.bgPrimary}60`,
              }}
            >
              <div className="text-xs font-mono text-white/40 mb-3">BACKGROUND</div>
              <ColorPicker
                label="Primary Background"
                value={data.colors.bgPrimary}
                onChange={(c) => handleColorChange('bgPrimary', c)}
                description="Main badge background"
              />
              <ColorPicker
                label="Secondary Background"
                value={data.colors.bgSecondary}
                onChange={(c) => handleColorChange('bgSecondary', c)}
                description="Panels and sections"
              />
              
              <div className="text-xs font-mono text-white/40 mt-4 mb-3">ACCENTS</div>
              <ColorPicker
                label="Primary Accent"
                value={data.colors.accentPrimary}
                onChange={(c) => handleColorChange('accentPrimary', c)}
                description="Borders and highlights"
              />
              <ColorPicker
                label="Secondary Accent"
                value={data.colors.accentSecondary}
                onChange={(c) => handleColorChange('accentSecondary', c)}
                description="Gradient effects"
              />
              
              <div className="text-xs font-mono text-white/40 mt-4 mb-3">TEXT</div>
              <ColorPicker
                label="Primary Text"
                value={data.colors.textPrimary}
                onChange={(c) => handleColorChange('textPrimary', c)}
                description="Name and titles"
              />
              <ColorPicker
                label="Secondary Text"
                value={data.colors.textSecondary}
                onChange={(c) => handleColorChange('textSecondary', c)}
                description="Labels and data"
              />
              <ColorPicker
                label="Muted Text"
                value={data.colors.textMuted}
                onChange={(c) => handleColorChange('textMuted', c)}
                description="Descriptions"
              />
              
              <div className="text-xs font-mono text-white/40 mt-4 mb-3">EFFECTS</div>
              <ColorPicker
                label="Glow Color"
                value={data.colors.glowColor}
                onChange={(c) => handleColorChange('glowColor', c)}
                description="Neon glow effects"
              />
              <ColorPicker
                label="Border Color"
                value={data.colors.borderColor}
                onChange={(c) => handleColorChange('borderColor', c)}
                description="Border accents"
              />
            </div>
          )}
        </div>

        {/* Photo Upload */}
        <div>
          <label 
            className="flex items-center gap-2 text-sm font-rajdhani mb-2"
            style={{ color: `${data.colors.accentPrimary}cc` }}
          >
            <Camera className="w-4 h-4" />
            AGENT PHOTO
          </label>
          <div className="flex gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 cyber-button text-sm py-3"
              style={{
                borderColor: data.colors.accentPrimary,
                color: data.colors.accentPrimary,
              }}
            >
              {data.photo ? 'CHANGE PHOTO' : 'UPLOAD PHOTO'}
            </button>
            {data.photo && (
              <button
                onClick={() => handleChange('photo', '')}
                className="px-4 border border-red-500/50 text-red-500 hover:bg-red-500/20 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Name */}
        <div>
          <label 
            className="flex items-center gap-2 text-sm font-rajdhani mb-2"
            style={{ color: `${data.colors.accentPrimary}cc` }}
          >
            <User className="w-4 h-4" />
            AGENT NAME
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value.toUpperCase())}
            placeholder="Enter agent name..."
            className="w-full cyber-input"
            style={{
              borderColor: `${data.colors.accentPrimary}40`,
              backgroundColor: `${data.colors.bgPrimary}cc`,
            }}
            maxLength={24}
          />
        </div>

        {/* Title */}
        <div>
          <label 
            className="flex items-center gap-2 text-sm font-rajdhani mb-2"
            style={{ color: `${data.colors.accentPrimary}cc` }}
          >
            <Briefcase className="w-4 h-4" />
            DESIGNATION
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value.toUpperCase())}
            placeholder="Enter designation..."
            className="w-full cyber-input"
            style={{
              borderColor: `${data.colors.accentPrimary}40`,
              backgroundColor: `${data.colors.bgPrimary}cc`,
            }}
            maxLength={30}
          />
        </div>

        {/* Department */}
        <div>
          <label 
            className="flex items-center gap-2 text-sm font-rajdhani mb-2"
            style={{ color: `${data.colors.accentPrimary}cc` }}
          >
            <Building2 className="w-4 h-4" />
            DEPARTMENT
          </label>
          <input
            type="text"
            value={data.department}
            onChange={(e) => handleChange('department', e.target.value.toUpperCase())}
            placeholder="Enter department..."
            className="w-full cyber-input"
            style={{
              borderColor: `${data.colors.accentPrimary}40`,
              backgroundColor: `${data.colors.bgPrimary}cc`,
            }}
            maxLength={24}
          />
        </div>

        {/* Employee ID */}
        <div>
          <label 
            className="flex items-center gap-2 text-sm font-rajdhani mb-2"
            style={{ color: `${data.colors.accentPrimary}cc` }}
          >
            <Hash className="w-4 h-4" />
            EMPLOYEE ID
          </label>
          <input
            type="text"
            value={data.employeeId}
            onChange={(e) => handleChange('employeeId', e.target.value.toUpperCase())}
            placeholder="XX-0000-XXXX"
            className="w-full cyber-input font-mono"
            style={{
              borderColor: `${data.colors.accentPrimary}40`,
              backgroundColor: `${data.colors.bgPrimary}cc`,
            }}
            maxLength={16}
          />
        </div>

        {/* Access Level */}
        <div>
          <label 
            className="flex items-center gap-2 text-sm font-rajdhani mb-2"
            style={{ color: `${data.colors.accentPrimary}cc` }}
          >
            <ShieldCheck className="w-4 h-4" />
            ACCESS LEVEL
          </label>
          <select
            value={data.accessLevel}
            onChange={(e) => handleChange('accessLevel', e.target.value)}
            className="w-full cyber-input cursor-pointer"
            style={{
              borderColor: `${data.colors.accentPrimary}40`,
              backgroundColor: `${data.colors.bgPrimary}cc`,
            }}
          >
            {accessLevels.map((level) => (
              <option key={level} value={level} style={{ backgroundColor: data.colors.bgPrimary }}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label 
            className="flex items-center gap-2 text-sm font-rajdhani mb-2"
            style={{ color: `${data.colors.accentPrimary}cc` }}
          >
            <Sparkles className="w-4 h-4" />
            STATUS
          </label>
          <div className="flex gap-2">
            {(['active', 'suspended', 'classified'] as const).map((status) => {
              const statusColors = {
                active: '#00ff9f',
                suspended: '#ff0044',
                classified: '#f5ff00',
              };
              return (
                <button
                  key={status}
                  onClick={() => handleChange('status', status)}
                  className="flex-1 py-2 px-3 text-xs font-orbitron tracking-wider border transition-all"
                  style={{
                    borderColor: data.status === status ? statusColors[status] : `${data.colors.textMuted}50`,
                    backgroundColor: data.status === status ? `${statusColors[status]}20` : 'transparent',
                    color: data.status === status ? statusColors[status] : data.colors.textMuted,
                  }}
                >
                  {status.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* QR Data */}
        <div>
          <label 
            className="flex items-center gap-2 text-sm font-rajdhani mb-2"
            style={{ color: `${data.colors.accentPrimary}cc` }}
          >
            <QrCode className="w-4 h-4" />
            QR CODE DATA
          </label>
          <input
            type="text"
            value={data.qrData}
            onChange={(e) => handleChange('qrData', e.target.value)}
            placeholder="https://your-url.com or text..."
            className="w-full cyber-input text-sm"
            style={{
              borderColor: `${data.colors.accentPrimary}40`,
              backgroundColor: `${data.colors.bgPrimary}cc`,
            }}
          />
        </div>

        {/* Action Buttons */}
        <div 
          className="flex gap-3 pt-4 border-t"
          style={{ borderColor: `${data.colors.accentPrimary}20` }}
        >
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-4 py-3 border transition-all font-rajdhani"
            style={{
              borderColor: data.colors.textMuted,
              color: data.colors.textMuted,
            }}
          >
            <RotateCcw className="w-4 h-4" />
            RESET
          </button>
          <button
            onClick={onExport}
            disabled={isExporting}
            className="flex-1 flex items-center justify-center gap-2 py-3 font-orbitron text-sm font-bold tracking-wider border transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              borderColor: data.colors.accentPrimary,
              backgroundColor: `${data.colors.accentPrimary}20`,
              color: data.colors.accentPrimary,
            }}
          >
            <Download className="w-4 h-4" />
            {isExporting ? 'PROCESSING...' : 'EXPORT PNG'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
