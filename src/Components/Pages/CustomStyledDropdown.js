import React, { useState } from "react";

export default function CustomStyledDropdown({ projects = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Select Option");

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option.project_name);
    setIsOpen(false);
    onSelect?.(option.id);
  };

  return (
    <div className="relative w-[75%] text-[32px] font-bold">
      {/* Label (like select) */}
      <div
        onClick={handleToggle}
        className="flex items-center justify-between h-[45px] px-2 cursor-pointer bg-white appearance-none outline-none border-none"
      >
        <span className="truncate">{selected}</span>
        {/* Custom Arrow */}
        <span
          className={`ml-2 transition-transform duration-200 border-black border-r-2 border-b-2 w-[8px] h-[8px] inline-block ${
            isOpen ? "rotate-[-135deg]" : "rotate-[45deg]"
          }`}
        />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-md rounded text-[16px] font-medium">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => handleSelect(project)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer truncate"
            >
              {project.project_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
