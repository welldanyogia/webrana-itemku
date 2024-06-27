import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {AddFormModal} from "@/components/add-form-modal";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import axios from "axios";
import {LoadingCustom} from "@/app/dashboard/(products)/brand/[slug]/components/loading-custom";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {EditFormModal} from "@/components/edit-form-modal";
import {DeleteFormModal} from "@/components/delete-form-modal";
import {AddOptionsFormModal} from "@/components/add-option-form-modal";
import {Brand} from "@/app/dashboard/(products)/brand/data/schema";

export interface UpdateBrandValues {
    mass_profit: number;
    mass_profit_status: boolean;
    fee_itemku: number;
}
export async function updateBrand({ brand, values }: { brand: Brand; values: UpdateBrandValues }): Promise<Brand | null> {
    try {
        const response = await axios.post(`/api/digiflazz/brand/update`, {
            brandId: brand.brand_id,
            mass_profit: values.mass_profit,
            mass_profit_status: values.mass_profit_status,
            fee_itemku: values.fee_itemku
        });
        console.log("response : ", response)
        if (response.status === 200) {
            return response.data.brand;
        } else {
            console.error("Failed to fetch brand data:", response.status, response.statusText);
            return null;
        }
    } catch (error : any) {
        console.error("Error fetching brand data:", error);
        return null;
    }
}
const handleDelete = async ({form,setIsLoading,onSuccess}) => {
    setIsLoading(true);
    try {
        const response = await axios.post("/api/form/delete", {
            form_input_id: form.form_input_id,
            // name: formName,
            // type: formType,
            // brand_id: form.brand_id // Assuming form contains the brand_id
        });

        if (response.status === 200) {
            console.log("Form created successfully", response.data.form);
            // setIsDialogOpen(false); // Close the dialog
            setIsLoading(false);
            onSuccess();
        } else {
            console.error("Failed to create form", response.status, response.statusText);
            setIsLoading(false);
        }
    } catch (error : any) {
        console.error("Error creating form", error);
        setIsLoading(false);
    }
};


export const BrandDetail = ({brand, values, isSwitchOn, handleInputChange, handleSwitchChange, onSuccess}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formValues, setFormValues] = useState({});

    const handleFormInputChange = (id, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };
    console.log(brand.FormInputBrands)
    const handleSave = async () => {
        setIsLoading(true)
        const updatedBrand = await updateBrand({brand, values});
        if (updatedBrand) {
            setIsLoading(false)
            console.log("Brand updated successfully:", updatedBrand);
        } else {
            setIsLoading(false)
            console.error("Failed to update brand");
        }
    };

    return (
        <>
            <Card className='drop-shadow-md shadow-blue-500 mt-6'>
                <CardHeader>
                    <div className='flex justify-between'>
                        <div>
                            <CardTitle>{brand.brand_name}</CardTitle>
                            <CardDescription>Manage your {brand.brand_name} products</CardDescription>
                        </div>
                        <AddFormModal brand={brand} onSuccess={onSuccess}/>
                    </div>
                </CardHeader>
                <CardContent>
                    {
                        isLoading ? (
                            <LoadingCustom title={"Loading"}/>
                        ) : (
                            <div className='grid grid-cols-2'>
                                <div className='flex flex-row'>
                                    <div className='flex flex-col space-y-2'>
                                        <div className='space-y-2'>
                                            <Label htmlFor="mass_profit">Mass Profit</Label>
                                            <Input
                                                id='mass_profit'
                                                type='number'
                                                placeholder='Mass Profit'
                                                value={values.mass_profit === null ? '' : values.mass_profit}
                                                disabled={!isSwitchOn}
                                                onChange={handleInputChange}
                                            />
                                            <div className='flex gap-2 items-center'>
                                                <Switch id='mass_profit_status' checked={isSwitchOn}
                                                        onCheckedChange={handleSwitchChange}/>
                                                <Label htmlFor="mass_profit_status">
                                                    {
                                                        isSwitchOn ? "Active" : "Inactive"
                                                    }
                                                </Label>
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="fee_itemku">Fee Itemku</Label>
                                            <Input
                                                id='fee_itemku'
                                                type='number'
                                                placeholder='Fee Itemku'
                                                value={values.fee_itemku === null ? '' : values.fee_itemku}
                                                // disabled={!isSwitchOn}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col space-y-2'>
                                    {brand.FormInputBrands.map((form) => (
                                        <div key={form.form_input_id} className='flex flex-col space-y-2'>
                                            <Label htmlFor={form.form_input_id}>{form.name}</Label>
                                            {form.type === 'text' && (
                                                <div className='flex flex-row gap-4'>
                                                <Input
                                                    id={form.form_input_id}
                                                    type='text'
                                                    value={formValues[form.form_input_id] || ''}
                                                    onChange={(e) => handleFormInputChange(form.form_input_id, e.target.value)}
                                                />
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <Button
                                                                variant="ghost"
                                                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                                                            >
                                                                <DotsHorizontalIcon className="h-4 w-4" />
                                                                <span className="sr-only">Open menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel className='capitalize'>{form.name}</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            {/*<DropdownMenuItem>*/}
                                                                <EditFormModal form={form} onSuccess={onSuccess}/>
                                                            {/*</DropdownMenuItem>*/}
                                                            {/*<DropdownMenuItem className='bg-destructive'>*/}
                                                                <DeleteFormModal form={form} onSuccess={onSuccess}/>
                                                            {/*</DropdownMenuItem>*/}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>

                                            )}
                                            {form.type === 'number' && (
                                                <div className='flex flex-row gap-4'>
                                                    <Input
                                                        id={form.form_input_id}
                                                        type='number'
                                                        value={formValues[form.form_input_id] || ''}
                                                        onChange={(e) => handleFormInputChange(form.form_input_id, e.target.value)}
                                                    />
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <Button
                                                                variant="ghost"
                                                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                                                            >
                                                                <DotsHorizontalIcon className="h-4 w-4"/>
                                                                <span className="sr-only">Open menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel className='capitalize'>{form.name}</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            {/*<DropdownMenuItem>*/}
                                                                <EditFormModal form={form} onSuccess={onSuccess}/>
                                                            {/*</DropdownMenuItem>*/}
                                                            {/*<DropdownMenuItem className='bg-destructive'>*/}
                                                                <DeleteFormModal form={form} onSuccess={onSuccess}/>
                                                            {/*</DropdownMenuItem>*/}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            )}
                                            {form.type === 'select' && (
                                                <div className='flex flex-row gap-4'>
                                                    <Select
                                                        onValueChange={(value) => handleFormInputChange(form.form_input_id, value)}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder={`Select an ${form.name}`}/>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectGroup>
                                                                <SelectLabel>Options</SelectLabel>
                                                                {form.OptionSelectInputs && form.OptionSelectInputs.map((option) => (
                                                                    <SelectItem key={option.id} value={option.value}>
                                                                        {option.name}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <Button
                                                                variant="ghost"
                                                                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                                                            >
                                                                <DotsHorizontalIcon className="h-4 w-4"/>
                                                                <span className="sr-only">Open menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuLabel className='capitalize'>{form.name}</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                                <EditFormModal form={form} onSuccess={onSuccess}/>
                                                            {/*<DropdownMenuItem>*/}
                                                            {/*    Add Options*/}
                                                            {/*</DropdownMenuItem>*/}
                                                                <AddOptionsFormModal form={form} onSuccess={onSuccess}/>
                                                            {/*<DropdownMenuItem className='bg-destructive'>*/}
                                                                <DeleteFormModal form={form} onSuccess={onSuccess}/>
                                                            {/*</DropdownMenuItem>*/}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </CardContent>
                <CardFooter className='flex justify-end'>
                    <Button
                        disabled={isLoading}
                        onClick={() => {
                            handleSave()
                        }}>
                        Save
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}