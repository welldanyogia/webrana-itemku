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

export const AddOptionsFormModal = ({ form,onSuccess }) => {
    const [optionValue, setOptionValue] = useState("");
    const [optionName, setOptionName] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post("/api/form/option/add", {
                value: optionValue,
                name: optionName,
                form_input_id: form.form_input_id
            });

            if (response.status === 200) {
                // console.log("Form created successfully", response.data.form);
                setIsDialogOpen(false); // Close the dialog
                setIsLoading(false)
                onSuccess()
            } else {
                onSuccess()
                setIsLoading(false)
                // console.error("Failed to create form", response.status, response.statusText);
            }
        } catch (error) {
            onSuccess()
            setIsLoading(false)
            // console.error("Error creating form", error);
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className={'w-full justify-start'} onClick={() => setIsDialogOpen(true)}>
                        Add Options
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="capitalize">Add {form.name.toLowerCase()} option</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="option_name" className="text-right">
                                Option Name
                            </Label>
                            <Input
                                id="option_name"
                                value={optionName}
                                onChange={(e) => setOptionName(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="option_value" className="text-right">
                                Option Name
                            </Label>
                            <Input
                                id="option_value"
                                value={optionValue}
                                onChange={(e) => setOptionValue(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>
                            {
                                isLoading ? <LoadingCustom title={"Adding"}/> : "Save changes"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
