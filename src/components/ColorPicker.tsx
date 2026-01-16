import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  description?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange, description }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 cursor-pointer border-0 rounded bg-transparent"
          style={{
            WebkitAppearance: 'none',
            padding: 0,
          }}
        />
        <div 
          className="absolute inset-0 rounded border-2 pointer-events-none"
          style={{ 
            borderColor: value,
            boxShadow: `0 0 10px ${value}40`,
          }}
        />
      </div>
      <div className="flex-1">
        <div className="text-xs font-rajdhani text-white/90">{label}</div>
        {description && (
          <div className="text-[10px] font-mono text-white/40">{description}</div>
        )}
      </div>
      <input
        type="text"
        value={value.toUpperCase()}
        onChange={(e) => {
          const val = e.target.value;
          if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
            onChange(val);
          }
        }}
        className="w-20 px-2 py-1 text-xs font-mono bg-cyber-dark/50 border border-white/20 text-white/70 rounded focus:border-white/40 focus:outline-none"
        maxLength={7}
      />
    </div>
  );
};

export default ColorPicker;
