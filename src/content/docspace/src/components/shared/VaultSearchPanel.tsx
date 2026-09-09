import React from 'react';
import { Search, X } from 'lucide-react';

interface VaultSearchPanelProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  count?: number;
  total?: number;
  onClear?: () => void;
  className?: string;
  id?: string;
}

export const VaultSearchPanel: React.FC<VaultSearchPanelProps> = ({
  value,
  onChange,
  placeholder = 'Tìm kiếm bài viết, mã ICD-10, từ khóa...',
  count,
  total,
  onClear,
  className = '',
  id = 'vault-search-input',
}) => {
  const handleClear = () => {
    onChange('');
    onClear?.();
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-16 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      <div className="absolute right-2.5 flex items-center gap-1.5">
        {count !== undefined && (
          <span className="text-[11px] font-mono-custom text-slate-400 font-medium">
            {count}{total !== undefined ? `/${total}` : ''}
          </span>
        )}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors cursor-pointer"
            title="Xóa tìm kiếm"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
