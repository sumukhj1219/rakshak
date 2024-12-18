"use client";
import { useRakshakContext } from "@/contexts/RakshakContext";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

const SetReciptentComponent = () => {
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const { setRecipient } = useRakshakContext();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null); 
            await setRecipient(address); 
            console.log("Ownership transfer successful");
        } catch (error) {
            setError("Failed to transfer ownership. Check console for details.");
            console.error("Error while transferring ownership:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Enter Reciptent Address</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <Input
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                placeholder="Enter the new owner wallet address."
                            />
                            {error && <p className="text-red-500 mt-2">{error}</p>}
                            <Button type="submit" className="w-full mt-5" disabled={loading}>
                                {!loading ? (
                                    <span>Change</span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <Loader className="animate-spin mr-2" />
                                        Checking validity
                                    </span>
                                )}
                            </Button>
                        </form>
                        <DialogDescription>
                            ⚠️ Make sure you set the appropriate address.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SetReciptentComponent;
