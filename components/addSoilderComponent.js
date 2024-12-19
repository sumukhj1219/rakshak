"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRakshakContext } from "@/contexts/RakshakContext"
import { Loader, Upload, PlusSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export default function AddSoldierComponent() {
  const { addSoldier } = useRakshakContext();
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    campId: "",
    id: "",
    name: "",
    city: "",
    dob: "",
    reported_date: "",
    rank: "",
    ammunitions: "",
    image: "", 
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      console.log("Form submitted with values:", formValues);
      const { id, name, city, dob, campId, reported_date, rank, ammunitions } = formValues;
      if (!id || !name || !city || !dob || !campId || !reported_date || !rank || !ammunitions ) {
        setIsError(true);
        setErrors("All fields are required.");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addSoldier(campId, id, name, city, dob, reported_date, rank, ammunitions);
      console.log(formValues)
      router.refresh();
      setFormValues({
        campId: "",
        id: "",
        name: "",
        city: "",
        dob: "",
        reported_date: "",
        rank: "",
        ammunitions: "",
      });
    } catch (error) {
      setIsError(true);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="m-2" size={"sm"}>
          <PlusSquare size={35} />New Soldier
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new soldier 🪖</DialogTitle>
          <DialogDescription>
            ⚠️ Make sure you fill all the fields, and enter the relevant camp id soldier should be in.
          </DialogDescription>
        </DialogHeader>
        {isError ? (
          <span className="flex items-center justify-center text-red-500">
            {errors}
          </span>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* <ImageUpload
              value={formValues.image}
              onChange={(url) =>
                setFormValues((prev) => ({ ...prev, image: url }))
              }
            /> */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                Soldier Id
              </Label>
              <Input
                id="id"
                name="id"
                value={formValues.id}
                placeholder="Soldier001"
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="campId" className="text-right">
                Camp Id
              </Label>
              <Input
                id="campId"
                name="campId"
                value={formValues.campId}
                placeholder="Camp Delta"
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Soldier Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formValues.name}
                placeholder="Enter Soldier Name"
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">
                DOB
              </Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formValues.dob}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reported_date" className="text-right">
                Joining Date
              </Label>
              <Input
                id="reported_date"
                name="reported_date"
                type="date"
                value={formValues.reported_date}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input
                id="city"
                name="city"
                value={formValues.city}
                placeholder="Bengaluru, Karnataka"
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rank" className="text-right">
                Rank
              </Label>
              <Input
                id="rank"
                name="rank"
                value={formValues.rank}
                placeholder="Seargent"
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ammunitions" className="text-right">
                Ammunitions
              </Label>
              <Input
                id="ammunitions"
                name="ammunitions"
                type="textarea"
                value={formValues.ammunitions}
                placeholder="Pistols, Rifles, Gernades, Smgs"
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin mr-1" /> Checking validity
                </span>
              ) : (
                "Create this soldier"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}