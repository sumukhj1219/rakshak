"use client";
import { useRakshakContext } from "@/contexts/RakshakContext";
import React, { useEffect, useState } from "react";

const GetAmmunitionComponent = () => {
  const [ammunition, setAmmunition] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getAmmunition } = useRakshakContext();

  useEffect(() => {
    const fetchAmmunition = async () => {
      setLoading(true);
      try {
        const result = await getAmmunition("camp001"); 
        setAmmunition(result);
      } catch (error) {
        console.error("Error fetching ammunition details:", error);
        setAmmunition(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAmmunition();
  }, [getAmmunition]); 

  return (
    <div>
      <h2>Ammunition Details</h2>
      {loading ? (
        <p>Loading ammunition details...</p>
      ) : ammunition ? (
        <ul>
          <li>Guns: {ammunition.guns}</li>
          <li>SMGs: {ammunition.smgs}</li>
          <li>Launchers: {ammunition.launchers}</li>
          <li>Grenades: {ammunition.grenades}</li>
          <li>Assaults: {ammunition.assaults}</li>
          <li>Snipers: {ammunition.snipers}</li>
          <li>Bombs: {ammunition.bombs}</li>
          <li>Melee: {ammunition.melee}</li>
        </ul>
      ) : (
        <p>No ammunition details available.</p>
      )}
    </div>
  );
};

export default GetAmmunitionComponent;
