interface TemplateToggleProps {
  showExample: boolean;
  onToggle: () => void;
}

export default function TemplateToggle({ showExample, onToggle }: TemplateToggleProps) {
  return (
    <div className="flex items-center justify-end mb-6">
      <button
        onClick={onToggle}
        className="flex items-center gap-3 px-4 py-2 rounded-lg border border-[#E8ECEF] bg-white hover:bg-[#F8F9FA] transition-colors"
      >
        <span className="text-sm font-medium text-[#6B7C93]">
          {showExample ? 'Blank Template' : 'Show Example'}
        </span>
        <div className={`relative w-11 h-6 rounded-full transition-colors ${showExample ? 'bg-[#00A8CC]' : 'bg-[#E8ECEF]'}`}>
          <div 
            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${showExample ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </div>
      </button>
    </div>
  );
}

