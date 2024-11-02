"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { AlertCircle, AlertTriangle, Ban, CheckCircle2, HelpCircle } from 'lucide-react'
import { toast, Toaster } from 'react-hot-toast'
import Link from 'next/link'
import { PROJECT_NAME } from '../../../../metadata'

const validErrors = [
  { type: 'Configuration', icon: AlertCircle, description: 'There is a configuration issue.' },
  { type: 'Permission', icon: Ban, description: 'You do not have permission to access this resource.' },
  { type: 'NotFound', icon: HelpCircle, description: 'The requested resource was not found.' },
  { type: 'ServerError', icon: AlertTriangle, description: 'An unexpected server error occurred.' },
  { type: 'Success', icon: CheckCircle2, description: 'Operation completed successfully.' },
]

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const [errorType, setErrorType] = useState<string | null>(null)

  useEffect(() => {
    const error = searchParams.get('error')
    setErrorType(error)
    if (error) {
      toast.error(`Error: ${error}`, {
        duration: 5000,
        position: 'top-right',
      })
    }
  }, [searchParams])

  const errorInfo = validErrors.find(e => e.type === errorType) || validErrors[0]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Toaster />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <errorInfo.icon className="w-10 h-10 text-red-500" />
              <h2 className="text-2xl font-semibold text-gray-900">
                {errorType || 'Unknown'} Error
              </h2>
            </div>
            <p className="text-gray-600 mb-6">{errorInfo.description}</p>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Valid Error Types:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {validErrors.map((error) => (
                <li key={error.type} className="text-gray-600">
                  <span className="font-semibold">{error.type}</span>: {error.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-lg">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} { PROJECT_NAME }. All rights reserved.
        </div>
      </footer>
    </div>
  )
}