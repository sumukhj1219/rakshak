"use client";
import { useRakshakContext } from "@/contexts/RakshakContext";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
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
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Guns</TableHead>
            <TableHead>SMGs</TableHead>
            <TableHead>Launchers</TableHead>
            <TableHead className="text-right">Gernades</TableHead>
            <TableHead className="text-right">Assaults</TableHead>
            <TableHead className="text-right">Snipers</TableHead>
            <TableHead className="text-right">Bombs</TableHead>
            <TableHead className="text-right">Meele</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">{ammunition.guns}</TableCell>
            <TableCell> {ammunition.smgs}</TableCell>
            <TableCell>{ammunition.launchers}</TableCell>
            <TableCell className="text-right"> {ammunition.grenades}</TableCell>
            <TableCell className="text-right"> {ammunition.assaults}</TableCell>
            <TableCell className="text-right">{ammunition.snipers}</TableCell>
            <TableCell className="text-right">{ammunition.bombs}</TableCell>
            <TableCell className="text-right">{ammunition.melee}</TableCell>


          </TableRow>
        </TableBody>
      </Table>
      
      ) : (
        <p>No ammunition details available.</p>
      )}
    </div>
  );
};

export default GetAmmunitionComponent;
