"use client";
import { useRakshakContext } from "@/contexts/RakshakContext";
import React, { useEffect, useState } from "react";

const GetSoldierCountComponent = () => {
  const [count, setCount] = useState(null); // Initialize state
  const { getSoldierCount } = useRakshakContext();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const result = await getSoldierCount("camp001"); // Await the async function
        if (result?._hex) {
          // Handle BigNumber
          const humanReadableCount = parseInt(result._hex, 16); // Convert BigNumber to an integer
          setCount(humanReadableCount);
        } else {
          setCount(result); // Handle other types
        }
      } catch (error) {
        console.error("Error fetching soldier count:", error);
        setCount(null); // Handle errors gracefully
      }
    };

    fetchCount();
  }, [getSoldierCount]); // Add getSoldierCount as a dependency

  return (
    <div>
      <h2>Soldier Count</h2>
      {count !== null ? (
        <p>Number of soldiers in camp: {count}</p>
      ) : (
        <p>Loading soldier count...</p>
      )}
    </div>
  );
};

export default GetSoldierCountComponent;
