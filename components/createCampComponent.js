import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRakshakContext } from "@/contexts/RakshakContext"
import { Loader, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateCamp() {
  const {createCamp} = useRakshakContext()
  const router = useRouter()
  const [formValues, setFormValues] = useState({ id: "", name: "", location: "", date: "" })
  const [errors, setErrors] = useState("")
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e) => {
    try {
      setLoading(true)
    e.preventDefault()
    console.log("Form submitted with values:", formValues)
    const {id, name, location, date} = formValues
    if(id === "" || name === "" || location === "" || date === "")
    {
      setIsError(true)
      setErrors("All fields are required.")
      return ;
    }
    await new Promise((resolve)=>setTimeout(resolve, 1000))
    createCamp(id, name, location, date)
    router.refresh()
    setFormValues({ id: "", name: "", location: "", date: "" })
    } catch (error) {
      setIsError(true)
      setErrors(error)
    }
    finally{
    setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'} className="m-2 text-md font-bold">
          <Plus />New 
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Creating New Camp 🏕️</DialogTitle>
          <DialogDescription>
           ⚠️ Make sure you fill all the fields. None of them should be empty.
          </DialogDescription>
        </DialogHeader>
        {isError ? <span className="flex items-center justify-center text-red-500">{errors}</span> : "" }
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                Camp Id
              </Label>
              <Input
                id="id"
                name="id"
                value={formValues.id}
                placeholder="Camp001"
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Camp Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formValues.name}
                placeholder="Camp Delta"
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formValues.location}
                placeholder="Bengaluru, Karnataka"
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Creation Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formValues.date}
                className="col-span-3"
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {
                loading ? (<span className="flex items-center justify-center"><Loader className="animate-spin mr-1" /> Checking validity</span>) : "Create this camp"
              }
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
