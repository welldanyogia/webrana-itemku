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

export const DeleteFormModal = ({ form,onSuccess }) => {
    const [formType, setFormType] = useState("");
    const [formName, setFormName] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post("/api/form/delete", {
                form_input_id: form.form_input_id,
                // name: formName,
                // type: formType,
                // brand_id: brand.brand_id
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
                {/*<ContextMenu>*/}
                {/*    <ContextMenuTrigger>Right click</ContextMenuTrigger>*/}
                {/*    <ContextMenuContent>*/}
                {/*        <ContextMenuItem>Open</ContextMenuItem>*/}
                {/*        <ContextMenuItem>Download</ContextMenuItem>*/}
                        <DialogTrigger asChild>
                            {/*<ContextMenuItem>*/}
                            <Button variant="destructive" className={'w-full justify-start'} onClick={() => setIsDialogOpen(true)}>
                                    Delete
                                </Button>
                            {/*</ContextMenuItem>*/}
                        </DialogTrigger>
                {/*    </ContextMenuContent>*/}
                {/*</ContextMenu>*/}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. Are you sure you want to permanently
                            delete this file from our servers?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="submit" variant='destructive' onClick={handleDelete}>
                            {isLoading ? <LoadingCustom title={"Deleting"} /> : "Confirm"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
