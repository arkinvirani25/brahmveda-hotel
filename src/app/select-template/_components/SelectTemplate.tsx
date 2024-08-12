"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchTemplateData, insertHotelData } from "../actions/selectTemplate.action";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const SelectTemplate = () => {
  const router = useRouter();
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");

  useEffect(() => {
    const getTemplateData = async () => {
      const { data, success } = await fetchTemplateData();
      if (data && success) {
        setTemplates(data);
      }
    };

    getTemplateData();
  }, []);

  const handleTemplateClick = (templateId: string) => {
    setSelectedTemplateId(templateId);
  };

  const isSelected = (templateId: any) => templateId === selectedTemplateId;

  const insertHotel = async () => {
    if (selectedTemplateId) {
      const { message, success, data } = await insertHotelData({
        template_id: selectedTemplateId,
      });
      // console.log("data => ",data);
      if (success && data) {
        router.push("/add-hotel?hotel_id=" + data[0]?.id);
      }
      toast({
        title: message,
      });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Choose a Template</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`relative block border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
              isSelected(template.id) ? "border-blue-500" : ""
            }`}
            onClick={() => handleTemplateClick(template.id)}
          >
            <input
              type="radio"
              name="template"
              value={template.id}
              checked={isSelected(template.id)}
              readOnly
              className="absolute top-2 left-2 w-4 h-4"
            />
            <Image
              src={template.image}
              alt={template.name}
              width={400}
              height={250}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{template.name}</h2>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`fixed bottom-0 right-0 w-full p-4 bg-white shadow-md transition-opacity duration-300 flex justify-end ${
          selectedTemplateId ? "opacity-100" : "opacity-50"
        }`}
      >
        <button
          className={`w-fit py-2 px-4 rounded-lg font-semibold ${
            selectedTemplateId
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!selectedTemplateId}
          onClick={insertHotel}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SelectTemplate;
