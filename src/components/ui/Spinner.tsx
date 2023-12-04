import React from 'react'
import { Loader2 } from 'lucide-react'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center my-8">
    <Loader2 className="animate-spin h-10 w-10 text-slate-950" />
  </div>
  )
}

export default Spinner