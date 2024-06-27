import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { LoadingCustom } from "@/app/dashboard/(products)/brand/[slug]/components/loading-custom";

export const EditFormModal = ({ form, onSuccess }) => {
    const [formType, setFormType] = useState(form.type);
    const [formName, setFormName] = useState(form.name);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("/api/form/update", {
                form_input_id: form.form_input_id,
                name: formName,
                type: formType,
                brand_id: form.brand_id // Assuming form contains the brand_id
            });

            if (response.status === 200) {
                console.log("Form created successfully", response.data.form);
                setIsDialogOpen(false); // Close the dialog
                setIsLoading(false);
                onSuccess();
            } else {
                console.error("Failed to create form", response.status, response.statusText);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error creating form", error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className={'w-full justify-start'} onClick={() => setIsDialogOpen(true)}>
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="capitalize">Edit {form.name} form input</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Form Type
                            </Label>
                            <Select onValueChange={setFormType} value={formType}>
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
                            {isLoading ? <LoadingCustom title={"Loading"} /> : "Save changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
