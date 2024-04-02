import { useContext } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LoginContext } from "@/contexts/login.context"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import EMPLOYEES from "@/data/employees"
import { toast } from "sonner"
import { CircleAlert } from "lucide-react"
import { ADMINS } from "@/data/admins"


const Login = () => {

    const nav = useNavigate();

    const { loginState, setLoginState } = useContext(LoginContext);

    const form = useForm({
        defaultValues: {
            username: 'employee_john',
            password: 'password'
        },
    });

    const login = () => {
        let index;
        let accType;

        if (form.getValues('username').includes('employee')) {
            index = EMPLOYEES.findIndex(u => {
                return (
                    u.username === form.getValues('username') && 
                    u.password === form.getValues('password') 
                );
            })
            if (index >= 0) accType = 'employee';
        } else {
            index = ADMINS.findIndex(u => {
                return (
                    u.username === form.getValues('username') &&
                    u.password === form.getValues('password')
                );
            })
            if (index >= 0) accType = 'admin';
        }

        if (index >= 0) {    
            setLoginState({
                loggedInUser: accType === 'employee' ? EMPLOYEES[index] : ADMINS[index],
                role: accType === 'employee' ? 'employee' : 'admin' 
            })
            nav('/');
        } else {
            toast("Error: Wrong credentials", {
                duration: 3000,
                icon: <CircleAlert />
            })
        }
    }

    return (
        <div className="grid md:grid-cols-2 h-svh">
            <div className="hidden md:block bg-black/10"></div>

            <div className="flex items-center justify-center">
                <div className="max-w-sm w-full p-10">

                    <h1 className="text-2xl my-5 font-bold text-center"> PESWA </h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(login)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="username" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="password" type="password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full"> Login </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}


export default Login;