import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {FaShoppingCart} from "react-icons/fa";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {LoadingCustom} from "@/app/dashboard/(products)/brand/[slug]/components/loading-custom";

export const OrderModal = ({product,onSuccess})=>{
    const [formValues, setFormValues] = useState({});
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    const handleFormInputChange = (id, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [id]: value,
        }));
    };
    const price = product.price
    const sellingPrice = product.selling_price
    const fee_itemku = product.brand.fee_itemku/100
    const fee = sellingPrice*fee_itemku
    const profit = sellingPrice-price-fee

    function formatRupiah(amount) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount)
    }
    const generateRefId = () => {
        return uuidv4();
    };

    const handleSubmit = async () => {
        const ref_id = generateRefId();
        setIsLoading(true)
        try {
            const response = await axios.post("/api/digiflazz/order", {
                buyer_sku_code: product.buyer_sku_code,
                customer_no: combineFormValues(),
                // ref_id: ref_id
            });

            console.log("buyer_sku_code:", product.buyer_sku_code)

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
        } catch (error : any) {
            onSuccess()
            setIsLoading(false)
            // console.error("Error creating form", error);
        }
    };
    const combineFormValues = () => {
        const combinedValues = Object.values(formValues).join('');
        console.log("Combined Form Values: ", combinedValues);
        return combinedValues
    };

    console.log("values : ",combineFormValues())
    return (
        <div className='w-full'>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
                        <FaShoppingCart />
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-full">
                    <DialogHeader>
                        <DialogTitle>{product.product_name.toUpperCase()} | {product.buyer_sku_code}</DialogTitle>
                        <DialogDescription>
                            {product.desc}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <div className='flex justify-between'>
                            <span>
                                Price
                            </span>
                                <span>{formatRupiah(product.price)}</span>
                            </div>
                            <div className='flex justify-between'>
                            <span>
                                Selling Price
                            </span>
                                <span>{formatRupiah(sellingPrice)}</span>
                            </div>
                            <div className='flex justify-between'>
                            <span>
                                Fee Itemku
                            </span>
                                <span>{formatRupiah(fee)}</span>
                            </div>
                            <div className='flex justify-between'>
                            <span>
                                Profit
                            </span>
                                <span>{formatRupiah(profit)}</span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            {product.brand.FormInputBrands.map((form) => (
                                <div key={form.form_input_id} className='flex flex-col space-y-2'>
                                    {/*<Label htmlFor={form.form_input_id}>{form.name}</Label>*/}
                                    {form.type === 'text' && (
                                        <div className='flex flex-row gap-4'>
                                            <Input
                                                id={form.form_input_id}
                                                type='text'
                                                placeholder={form.name}
                                                value={formValues[form.form_input_id] || ''}
                                                onChange={(e) => handleFormInputChange(form.form_input_id, e.target.value)}
                                            />
                                        </div>

                                    )}
                                    {form.type === 'number' && (
                                        <div className='flex flex-row gap-4'>
                                            <Input
                                                id={form.form_input_id}
                                                type='number'
                                                placeholder={form.name}
                                                value={formValues[form.form_input_id] || ''}
                                                onChange={(e) => handleFormInputChange(form.form_input_id, e.target.value)}
                                            />
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
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>
                            {
                                isLoading ? <LoadingCustom title={"Loading"}/> : "Order"
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}