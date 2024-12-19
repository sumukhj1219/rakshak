"use client";
import { useRakshakContext } from "@/contexts/RakshakContext";
import React, { useEffect, useState } from "react";

const GetSoldierCountComponent = () => {
  const [count, setCount] = useState(null); 
  const { getSoldierCount } = useRakshakContext();

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const result = await getSoldierCount("camp001");
        if (result?._hex) {
          const humanReadableCount = parseInt(result._hex, 16);
          setCount(humanReadableCount);
        } else {
          setCount(result); 
        }
      } catch (error) {
        console.error("Error fetching soldier count:", error);
        setCount(null); 
      }
    };

    fetchCount();
  }, [getSoldierCount]); 

  return (
    <div>
      {count !== null ? (
        <p className="text-muted-foreground">🪖 Soldiers: {count}</p>
      ) : (
        <p>Loading soldier count...</p>
      )}
    </div>
  );
};

export default GetSoldierCountComponent;
