import React, { useEffect, useRef } from 'react';
import { Button } from './button';
import { RangeSlider } from './range-slider';

interface FilterConfig {
  min: number;
  max: number;
  step: number;
  formatValue: (value: number) => string;
  parseValue: (value: string) => number;
  title: string;
  unit: string;
}

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  config: FilterConfig;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  onApply: () => void;
  onReset: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  onClose,
  config,
  value,
  onValueChange,
  onApply,
  onReset,
  triggerRef,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [minInput, setMinInput] = React.useState(config.formatValue(value[0]));
  const [maxInput, setMaxInput] = React.useState(config.formatValue(value[1]));

  // Update input values when value prop changes
  useEffect(() => {
    setMinInput(config.formatValue(value[0]));
    setMaxInput(config.formatValue(value[1]));
  }, [value, config]);

  // Handle input changes
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMinInput(inputValue);
    
    const numericValue = config.parseValue(inputValue);
    if (!isNaN(numericValue) && numericValue >= config.min && numericValue <= value[1]) {
      onValueChange([numericValue, value[1]]);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setMaxInput(inputValue);
    
    const numericValue = config.parseValue(inputValue);
    if (!isNaN(numericValue) && numericValue <= config.max && numericValue >= value[0]) {
      onValueChange([value[0], numericValue]);
    }
  };

  // Handle input blur to format values
  const handleMinInputBlur = () => {
    setMinInput(config.formatValue(value[0]));
  };

  const handleMaxInputBlur = () => {
    setMaxInput(config.formatValue(value[1]));
  };

  // Position dropdown
  useEffect(() => {
    if (isOpen && dropdownRef.current && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const dropdown = dropdownRef.current;
      
      // Position below the trigger button
      dropdown.style.position = 'fixed';
      dropdown.style.top = `${triggerRect.bottom + 8}px`;
      dropdown.style.left = `${triggerRect.left}px`;
      dropdown.style.zIndex = '9999';
    }
  }, [isOpen, triggerRef]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="w-[320px] bg-white border border-[#e5e7eb] rounded-[12px] shadow-lg overflow-hidden"
    >
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-[16px] font-semibold text-[#111827] mb-1">
            {config.title}
          </h3>
        </div>

        {/* Min Input */}
        <div className="mb-4">
          <label className="block text-[14px] font-medium text-[#374151] mb-2">
            Min {config.unit}
          </label>
          <input
            type="text"
            value={minInput}
            onChange={handleMinInputChange}
            onBlur={handleMinInputBlur}
            className="w-full h-[40px] px-3 py-2 border border-[#d1d5db] rounded-[8px] text-[14px] text-[#111827] bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
            placeholder={config.formatValue(config.min)}
          />
        </div>

        {/* Max Input */}
        <div className="mb-6">
          <label className="block text-[14px] font-medium text-[#374151] mb-2">
            Max {config.unit}
          </label>
          <input
            type="text"
            value={maxInput}
            onChange={handleMaxInputChange}
            onBlur={handleMaxInputBlur}
            className="w-full h-[40px] px-3 py-2 border border-[#d1d5db] rounded-[8px] text-[14px] text-[#111827] bg-[#f9fafb] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
            placeholder={config.formatValue(config.max)}
          />
        </div>

        {/* Range Slider */}
        <div className="mb-6">
          <RangeSlider
            min={config.min}
            max={config.max}
            step={config.step}
            value={value}
            onValueChange={onValueChange}
            formatValue={config.formatValue}
          />
        </div>
      </div>

      {/* Footer with buttons */}
      <div className="p-3 border-t border-[#f3f4f6] flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-8 px-3 text-[12px] font-medium text-[#6b7280] hover:text-[#374151] hover:bg-[#f9fafb]"
        >
          Reset
        </Button>
        <Button
          size="sm"
          onClick={onApply}
          className="h-8 px-4 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-[12px] font-medium rounded-[6px] border-0"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};