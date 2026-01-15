import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save, X, HelpCircle, Globe, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

function CloseIcon({ className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn("relative shrink-0 size-4 cursor-pointer hover:opacity-70 transition-opacity", className)}
      aria-label="Close modal"
    >
      <X className="w-4 h-4" />
    </button>
  )
}

export default function ZampleModal({ onClose, className }) {
  return (
    <div 
      className={cn(
        "bg-surface-1 flex flex-col items-start overflow-clip relative rounded-lg w-full max-w-[674px] mx-auto",
        className
      )}
      style={{
        boxShadow: '0px 28px 45px 0px rgba(0,0,0,0.05), 0px 0px 85px 0px rgba(0,0,0,0.07), 0px 4px 14px 0px rgba(0,0,0,0.04)'
      }}
    >
      {/* Modal Container */}
      <div className="bg-surface-1 flex flex-col gap-6 items-start overflow-clip p-8 relative shrink-0 w-full">
        {/* Header */}
        <div className="flex items-start justify-between relative shrink-0 w-full">
          <div className="flex flex-[1_0_0] flex-col gap-2 items-start min-h-px min-w-px relative shrink-0 text-content-primary whitespace-pre-wrap">
            <h1 className="font-semibold text-[40px] leading-[48px] relative shrink-0 w-full">
              Zample
            </h1>
            <p className="font-normal text-sm leading-4 relative shrink-0 w-full">
              Example modal design
            </p>
          </div>
          <CloseIcon className="relative shrink-0 size-6" onClick={onClose} />
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-6 items-start relative shrink-0 w-full">
          {/* Full Name Field */}
          <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
            <div className="flex gap-1 items-center relative shrink-0">
              <Label className="font-normal text-base leading-5 relative shrink-0 text-content-primary">
                Full Name
              </Label>
              <HelpCircle className="w-4 h-4 text-content-muted" />
              <span className="absolute font-normal text-sm leading-4 left-[-9px] text-error top-[2px]">
                *
              </span>
            </div>
            <Input 
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-surface-1 border-default px-3 py-2 rounded-md text-base leading-5 placeholder:text-content-muted"
            />
          </div>

          {/* Country Field */}
          <div className="flex flex-col gap-2 items-start relative shrink-0 w-full">
            <Label className="font-normal text-base leading-5 relative shrink-0 text-content-primary">
              Country
            </Label>
            <div className="bg-surface-1 border border-default flex gap-2 items-center px-3 py-2 relative rounded-md shrink-0 w-full">
              <span className="flex-[1_0_0] font-normal text-base leading-5 min-h-px min-w-px relative shrink-0 text-content-primary whitespace-pre-wrap">
                United States
              </span>
              <Globe className="w-4 h-4 text-content-muted" />
            </div>
          </div>

          {/* Email Field with Button */}
          <div className="flex gap-6 items-end relative shrink-0 w-full">
            <div className="flex flex-[1_0_0] flex-col gap-2 items-start min-h-px min-w-px relative shrink-0">
              <Label className="font-normal text-base leading-5 relative shrink-0 text-content-primary">
                Email
              </Label>
              <div className="bg-surface-1 border border-default flex gap-2 items-center px-3 py-2 relative rounded-md shrink-0 w-full">
                <Mail className="w-4 h-4 text-content-muted" />
                <Input 
                  type="email"
                  placeholder="Enter valid email address"
                  className="flex-[1_0_0] border-0 bg-transparent p-0 h-auto text-base leading-5 placeholder:text-content-muted focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
            </div>
            <Button variant="outline" disabled className="opacity-50">
              Check Address
            </Button>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div 
        className="bg-surface-1 border-t border-default flex flex-col items-center justify-end overflow-clip px-8 py-4 relative shrink-0 w-full"
        style={{
          boxShadow: '0px -1px 16px 0px rgba(0,0,0,0.06)'
        }}
      >
        <div className="flex gap-2 items-center justify-end relative shrink-0 w-full">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default">
            <Save className="h-4 w-4" aria-hidden="true" />
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

