import {
    QuestionMarkCircledIcon,
    CircleIcon,
    StopwatchIcon,
    CheckCircledIcon,
    CrossCircledIcon,
    ExclamationTriangleIcon,
} from "@radix-ui/react-icons"

export const statuses = [
    {
        value: "pending",
        label: "Pending",
        icon: QuestionMarkCircledIcon,
    },
    {
        value: "process",
        label: "Process",
        icon: StopwatchIcon,
    },
    {
        value: "success",
        label: "Success",
        icon: CheckCircledIcon,
    },
    {
        value: "failed",
        label: "Failed",
        icon: CrossCircledIcon,
    },
]

export const statusPayments = [
    {
        value: "PAID",
        label: "Paid",
        icon: CheckCircledIcon,
    },
    {
        value: "FAILED",
        label: "Failed",
        icon: CrossCircledIcon,
    },
    {
        value: "EXPIRED",
        label: "Expired",
        icon: ExclamationTriangleIcon,
    },
    {
        value: "REFUND",
        label: "Refund",
        icon: ExclamationTriangleIcon,
    },
    {
        value: "UNPAID",
        label: "Unpaid",
        icon: QuestionMarkCircledIcon,
    },
]
