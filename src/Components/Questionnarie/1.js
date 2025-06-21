setFormData((prev) => {
  let updatedData = { ...prev };

  // Make sure updatedData["10"] exists
  if (!updatedData["10"]) {
    updatedData["10"] = { male: [], female: [] };
  }

  if (selected === "male") {
    updatedData["10"].male = isSelected ? updatedData["10"].male : [];
  } else if (selected === "female") {
    updatedData["10"].female = isSelected ? updatedData["10"].female : [];
  }

  return updatedData;
});