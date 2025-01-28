import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "app/lib/utils"
import { Button } from "app/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "app/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "app/components/ui/popover"
import { Spinner } from "app/components/ui/spinner"
import { ICountry } from "app/types/country"
import { IDepartment } from "app/types/department"
import { ICity } from "app/types/city"
import { useState } from "react"

interface ComboboxProps {
  options: ICountry[] | IDepartment[] | ICity[]
  value: string
  onSelect: (value: string) => void
  placeholder: string
  label: string
  disabled?: boolean
  isLoading?: boolean
}

export function FormCombobox({
  options,
  value,
  onSelect,
  placeholder,
  label,
  disabled = false,
  isLoading = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <Spinner className="mr-2 h-4 w-4" />
          ) : value ? (
            options.find((option) => option.id === Number(value))?.name
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => {
                    onSelect(option.id.toString())
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.id.toString() ? "opacity-100" : "opacity-0")} />
                  {option.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

