"use client"
import { useRakshakContext } from "@/contexts/RakshakContext";

const CreateCampComponent = () => {
  const { account, createCamp } = useRakshakContext();

  const handleCreateCamp = () => {
    const campId = "camp_002";
    const campName = "Camp Alpha";
    const campLocation = "Location XYZ";
    const campCreationDate = "2024-12-07";

    createCamp(campId, campName, campLocation, campCreationDate);
  };

  return (
    <div>
      <p>Account: {account}</p>
      <button onClick={handleCreateCamp}>Click to createCamp</button>
    </div>
  );
};

export default CreateCampComponent;
