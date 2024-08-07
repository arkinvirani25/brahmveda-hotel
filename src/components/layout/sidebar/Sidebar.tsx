"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const sections = [
  {
    name: "Property",
    key: "property",
    subsections: [
      { name: "Basic Information", path: "/property/basic-info" },
      { name: "Photos", path: "/property/photos" },
      { name: "Room Information", path: "/property/room-info" },
      { name: "Amenities", path: "/property/amenities" },
    ],
  },
  {
    name: "Section 2",
    key: "section2",
    subsections: [
      { name: "Subsection 1", path: "/section2/sub1" },
      { name: "Subsection 2", path: "/section2/sub2" },
    ],
  },
];

const Sidebar = () => {
  const router = useRouter();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <ul className="space-y-2">
        <li>
          <button
            onClick={() => router.push("/")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
          >
            Home
          </button>
        </li>
        {sections.map((section) => (
          <li key={section.key}>
            <button
              onClick={() => toggleSection(section.key)}
              className="w-full text-left px-4 py-2 rounded flex justify-between items-center hover:bg-gray-700"
            >
              {section.name}
              {openSections[section.key] ? <ChevronDown /> : <ChevronRight />}
            </button>
            {openSections[section.key] && (
              <ul className="pl-4 mt-2 space-y-2">
                {section.subsections.map((sub) => (
                  <li key={sub.path}>
                    <button
                      onClick={() => router.push(sub.path)}
                      className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
                    >
                      {sub.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
