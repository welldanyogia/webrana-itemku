import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import axios from "axios";
import {LoadingCustom} from "@/app/dashboard/(products)/brand/[slug]/components/loading-custom";

export const AddFormModal = ({ brand,onSuccess }) => {
    const [formType, setFormType] = useState("");
    const [formName, setFormName] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post("/api/form/add", {
                name: formName,
                type: formType,
                brand_id: brand.brand_id
            });

            if (response.status === 200) {
                console.log("Form created successfully", response.data.form);
                setIsDialogOpen(false); // Close the dialog
                setIsLoading(false)
                onSuccess()
            } else {
                onSuccess()
                setIsLoading(false)
                console.error("Failed to create form", response.status, response.statusText);
            }
        } catch (error) {
            onSuccess()
            setIsLoading(false)
            console.error("Error creating form", error);
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setIsDialogOpen(true)}>Add Form</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="capitalize">Add {brand.brand_name.toLowerCase()} form input</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Form Type
                            </Label>
                            <Select onValueChange={setFormType}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a form" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Forms</SelectLabel>
                                        <SelectItem value="number">Number</SelectItem>
                                        <SelectItem value="text">Text</SelectItem>
                                        <SelectItem value="select">Select</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Form Name
                            </Label>
                            <Input
                                id="name"
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>
                            {
                                isLoading ? <LoadingCustom title={"Loading"}/> : "Save changes"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
