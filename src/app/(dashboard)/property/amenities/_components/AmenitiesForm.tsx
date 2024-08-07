const AmenitiesForm = () => {
  const amenities = [
    {
      category: "Room Amenities",
      items: ["Air Conditioning", "Free Wi-Fi", "Television"],
    },
    {
      category: "Bathroom Amenities",
      items: ["Shower", "Hair Dryer", "Towels"],
    },
    {
      category: "Hotel Services",
      items: ["24-hour Front Desk", "Laundry Service", "Concierge"],
    },
  ];
  return (
    <div className="relative h-svh">
      <div className="container mx-auto p-4 max-h-[calc(100vh-5rem)] overflow-auto">
        <h1 className="text-3xl font-bold mb-4">Amenities</h1>
        {amenities.map((category, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-base font-semibold mb-2">{category.category}</h2>
            <ul className="list-none pl-0 space-y-2">
              {category.items.map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <input
                    type="checkbox"
                    id={`${category.category}-${item}`}
                    className="mr-2 w-4 h-4"
                  />
                  <label htmlFor={`${category.category}-${item}`}>{item}</label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div
          className={`absolute bottom-0 right-0 w-full p-4 bg-white shadow-md transition-opacity duration-300 flex justify-end opacity-100`}
        >
          <button className={`w-fit py-2 px-4 rounded-lg font-semibold bg-blue-500 text-white`}>
            Continue
          </button>
        </div>
      </div>
      {/* AMenitiesForm */}
    </div>
  );
};

export default AmenitiesForm;
