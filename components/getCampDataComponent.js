"use client";

import { useRakshakContext } from '@/contexts/RakshakContext';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const GetCampDataComponent = ({ campId }) => {
  const { getCampData } = useRakshakContext();
  const [campData, setCampData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampData = async () => {
      try {
        const data = await getCampData(campId);
        setCampData(data);
        console.log(campData);
      } catch (err) {
        console.error('Error fetching camp data:', err);
        setError('Unable to fetch camp data. Please try again later.');
      }
    };

    if (campId) {
      fetchCampData();
    }
  }, [campId, getCampData]);

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
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
          </div>

          <div className="flex flex-col space-y-4">
            <Button  className="flex items-center justify-center font-semibold">
              New Soldier
              <Plus size={18} className="ml-2" />
            </Button>
            <Button  className="flex items-center justify-center font-semibold">
              Add Ammunitions
              <Plus size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      ) : (
        !error && <p className="text-center text-muted-foreground">Loading camp data...</p>
      )}
    </div>
  );
};

export default GetCampDataComponent;
