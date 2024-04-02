import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Modal = ({ actionName, action, title, description = '', children }) => {
    return (
        <Dialog>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> {title} </DialogTitle>
                    <DialogDescription>
                        { description }
                    </DialogDescription>
                </DialogHeader>


                <DialogFooter>
                    { 
                        action && <DialogClose>
                            <Button className="capitalize" onClick={action}> {actionName} </Button> 
                        </DialogClose>
                    }

                    <DialogClose>
                        <Button className="text-black border bg-white hover:text-white"> Close </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
            <DialogTrigger> { children } </DialogTrigger>
        </Dialog>
    );
}

export default Modal;