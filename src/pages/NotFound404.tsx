import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound404 = () => {

    const nav = useNavigate();

    const goBack = () => {
        nav('/login')
    }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
        <h2 className="text-4xl xl:text-9xl font-black mb-10">
            404
        </h2>

        <Button className="px-5" onClick={goBack}> <ArrowLeftIcon className="me-3" /> Back </Button>
    </div>
  )
}

export default NotFound404;