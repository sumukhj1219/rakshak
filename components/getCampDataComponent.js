"use client";

import { useRakshakContext } from '@/contexts/RakshakContext';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import AddSoldierComponent from './addSoilderComponent';
import AddCampAmmunitions from './addCampAmmunitions';
import GetSoldierCountComponent from './getSoldierCountComponent';
import GetAmmunitionComponent from './getAmmunitionComponent';

const GetCampDataComponent = ({ campId }) => {
  const { getCampData, getAllCamps } = useRakshakContext();
  const [campData, setCampData] = useState(null);
  const [camps, setCamps] = useState([]);
  const [error, setError] = useState(null);
  const [isDanger, setIsDanger] = useState(false);

  const parseCampData = (data) => {
    if (!data || data.length < 5) {
      console.log("Invalid data format:", data);
      return [];
    }
    return data[0].map((_, index) => ({
      id: data[0][index],
      name: data[1][index],
      location: data[2][index],
      date: data[3][index],
      isInDanger: !!data[4][index],
      ammunitions: data[4][index]
    }));
  };

  useEffect(() => {
    const fetchCampData = async () => {
      try {
        const data = await getCampData(campId);
        setCampData(data);
        const rawCampData = await getAllCamps();
        const parsedCamps = parseCampData(rawCampData);
        setCamps(parsedCamps);
        setIsDanger(parsedCamps.some(camp => camp.isInDanger));
      } catch (err) {
        console.error('Error fetching camp data:', err);
        setError('Unable to fetch camp data. Please try again later.');
      }
    };

    if (campId) {
      fetchCampData();
    }
  }, [campId, getCampData, getAllCamps]);

  return (
    <div>
      {isDanger && (
        <div className="text-red-500 bg-red-100 border border-red-400 p-2 rounded">
          Some camps are in danger! Kindly check.
        </div>
      )}
      {error && (
        <div className="text-red-700 bg-red-200 border border-red-400 p-3 rounded">
          {error}
        </div>
      )}
      {campData ? (
        <div className="w-full m-4 flex justify-between items-center p-8 h-auto rounded-lg border border-slate-300 bg-gradient-to-r from-gray-100 to-gray-200 shadow-md">
          <div className="flex flex-col space-y-2">
            <span className="text-3xl font-extrabold text-primary">{campData[1]}</span>
            <span className="text-sm text-muted-foreground flex items-center gap-x-2">📍
              {campData[2]}
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-x-2">📅
              {campData[3]}
            </span>
            <GetSoldierCountComponent />

          </div>
          
          <div className="flex flex-col space-y-4">
            <AddSoldierComponent />
            <AddCampAmmunitions />
          </div>
        </div>
      ) : (
        !error && (
          <div className="flex justify-center">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary"></div>
          </div>
        )
      )}
      <GetAmmunitionComponent />
    </div>
  );
};

export default GetCampDataComponent;
