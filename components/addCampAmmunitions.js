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
import { Loader, PlusSquare } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

const AddCampAmmunitions = () => {
  const { addCampAmmunitions } = useRakshakContext();
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    campId: "",
    guns: "0",
    smgs: "0",
    launchers: "0",
    grenades: "0",
    assaults: "0",
    snipers: "0",
    bombs: "0",
    melee: "0",
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const { campId } = formValues;
      if (!campId) {
        setIsError(true);
        setErrors("CampId is required");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addCampAmmunitions(
        campId,
        formValues.guns,
        formValues.smgs,
        formValues.launchers,
        formValues.grenades,
        formValues.assaults,
        formValues.snipers,
        formValues.bombs,
        formValues.melee
      );
      router.refresh();
      setFormValues({
        campId: "",
        guns: "0",
        smgs: "0",
        launchers: "0",
        grenades: "0",
        assaults: "0",
        snipers: "0",
        bombs: "0",
        melee: "0",
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
    <div>
      <Dialog className="relative z-50">
        <DialogTrigger asChild>
          <Button className="m-2" size={"sm"}>
            <PlusSquare size={35} /> Ammunitions
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] shadow-[4px_4px_10px_rgba(0,0,0,0.15)]">
          <DialogHeader>
            <DialogTitle>Add ammunitions 💣</DialogTitle>
            <DialogDescription>
              ⚠️ Make sure you fill all the fields, and enter the relevant camp id.
            </DialogDescription>
          </DialogHeader>
          {isError && (
            <span className="flex items-center justify-center text-red-500">
              {errors}
            </span>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="campId" className="text-right">
                  Camp Id
                </Label>
                <Input
                  id="campId"
                  name="campId"
                  value={formValues.campId}
                  placeholder="Camp001"
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="guns" className="text-right">
                  Guns
                </Label>
                <Input
                  id="guns"
                  name="guns"
                  value={formValues.guns}
                  placeholder="0"
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="smgs" className="text-right">
                  Small Machine Guns
                </Label>
                <Input
                  id="smgs"
                  name="smgs"
                  placeholder="0"
                  value={formValues.smgs}
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="launchers" className="text-right">
                  Launchers
                </Label>
                <Input
                  id="launchers"
                  name="launchers"
                  placeholder="0"
                  value={formValues.launchers}
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grenades" className="text-right">
                  Grenades
                </Label>
                <Input
                  id="grenades"
                  name="grenades"
                  value={formValues.grenades}
                  placeholder="0"
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assaults" className="text-right">
                  Assault Rifles
                </Label>
                <Input
                  id="assaults"
                  name="assaults"
                  value={formValues.assaults}
                  placeholder="0"
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="snipers" className="text-right">
                  Sniper Rifles
                </Label>
                <Input
                  id="snipers"
                  name="snipers"
                  value={formValues.snipers}
                  placeholder="0"
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bombs" className="text-right">
                  Bombs
                </Label>
                <Input
                  id="bombs"
                  name="bombs"
                  value={formValues.bombs}
                  placeholder="0"
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="melee" className="text-right">
                  Melee
                </Label>
                <Input
                  id="melee"
                  name="melee"
                  value={formValues.melee}
                  placeholder="0"
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
    </div>
  );
};

export default AddCampAmmunitions;
