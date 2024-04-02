import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"
import { useContext, useEffect, useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import LEAVE_TYPES from "@/data/leaveTypes";
import BookALeaveGraphic from '@/assets/3911462.jpg';
import useRequests from "@/hooks/useRequests"
import { LoginContext } from "@/contexts/login.context"



const ApplyForLeave = () => {

    const form = useForm();
    const { submitRequest } = useRequests();
    const { loginState } = useContext(LoginContext);
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });

    const onSubmit = () => {
        if (date && date.from && date.to) {
            submitRequest({
                employee: loginState.loggedInUser,
                isApproved: false,
                isRejected: false,
                leaveDate: date?.from?.toLocaleDateString(),
                returnDate: date?.to?.toLocaleDateString(),
                reason: form.getValues('reasons')
            })
        }
    }

    return (
        <>
            <div className="container mx-auto grid xl:grid-cols-2 p-10 rounded-xl mt-10">
                <div className="col-span-1 flex items-center justify-center">
                    <img className="w-2/3" src={BookALeaveGraphic} alt="" />
                </div>

                <div className="col-span-1">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid lg:grid-cols-1 gap-5">
                                <div className="col-span-1">
                                    <FormField
                                        name="reasons"
                                        control={form.control}
                                        render={({field}) => <Textarea onChange={field.onChange} placeholder="Reason for leave" /> }
                                    />
                                </div>


                                <div className="col-span-1">
                                    <FormField 
                                        name="leaveType"
                                        control={form.control}
                                        render={({field}) => {
                                            return (
                                                <Select {...field} onValueChange={field.onChange}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder={'Select Leave Type'} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        { LEAVE_TYPES.map(leave => <SelectItem value={leave.type}> {leave.type} </SelectItem>) }
                                                    </SelectContent>
                                                </Select>
                                            );
                                        }}
                                    />

                                </div>

                                {/* <div className="col-span-1"></div> */}

                                <div className="col-span-1">

                                    <div className={cn("grid gap-2", '')}>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    id="date"
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[300px] justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    {date?.from ? (
                                                        date.to ? (
                                                            <>
                                                                {format(date.from, "LLL dd, y")} -{" "}
                                                                {format(date.to, "LLL dd, y")}
                                                            </>
                                                        ) : (
                                                            format(date.from, "LLL dd, y")
                                                        )
                                                    ) : (
                                                        <span>Pick leave duration</span>
                                                    )}
                                                    <CalendarIcon className="ms-auto mr-2 h-4 w-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <FormField 
                                                    name="dateRange"
                                                    control={form.control}
                                                    render={({field}) => {
                                                        const today = new Date();
                                                        return (
                                                            <Calendar
                                                                {...field}
                                                                initialFocus
                                                                fromDate={today}
                                                                min={2}
                                                                mode="range"
                                                                selected={date}
                                                                onSelect={setDate}
                                                                numberOfMonths={2}
                                                                defaultMonth={date?.from}
                                                            />
                                                        )
                                                    }
                                                    }
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-fit" type="submit"> Submit Request
                                <ArrowRight className="ms-3" /> 
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default ApplyForLeave;