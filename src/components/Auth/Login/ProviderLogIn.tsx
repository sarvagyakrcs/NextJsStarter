'use client'

import React, { useState } from 'react'
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { FaXTwitter } from 'react-icons/fa6'
import { signInProvider } from '@/actions/Auth/login'

type Provider = 'google' | 'github' | 'twitter' | 'linkedin'

type ProviderInfo = {
  name: Provider
  icon: React.ReactNode
  color: string
  hoverColor: string
}

const providers: ProviderInfo[] = [
  { name: 'google', icon: <FaGoogle size={20} className='hover:text-red-400' />, color: 'bg-white', hoverColor: 'hover:bg-white' },
  { name: 'github', icon: <FaGithub size={20} />, color: 'bg-gray-200', hoverColor: 'hover:bg-gray-400' },
  { name: 'twitter', icon: <FaXTwitter size={20} className='text-white' />, color: 'bg-black', hoverColor: 'hover:bg-gray-800' },
  { name: 'linkedin', icon: <FaLinkedin size={20} />, color: 'bg-blue-300', hoverColor: 'hover:bg-blue-500' },
]

export default function ProviderSignIn() {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null)
  const { toast } = useToast()

  const handleProviderSignIn = async (provider: Provider) => {
    setLoadingProvider(provider)

    try {
      const data = await signInProvider(provider)
      if (data?.error) {
        throw new Error(data.error)
      }
      toast({
        title: 'Success',
        description: `Signed in with ${provider} successfully!`,
        duration: 3000,
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err instanceof Error ? err.message : 'An unexpected error occurred',
        duration: 5000,
      })
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      {providers.map(({ name, icon, color, hoverColor }) => (
        <motion.div
          key={name}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            disabled={loadingProvider !== null}
            variant="outline"
            className={`relative h-12 w-full overflow-hidden ${color} ${hoverColor} transition-colors duration-300`}
            onClick={() => handleProviderSignIn(name)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {loadingProvider === name ? (
                <Loader2 className="animate-spin h-5 w-5 text-black" />
              ) : (
                <div className="flex items-center justify-center w-full text-gray-800 group-hover:text-white transition-colors duration-300">
                  {icon}
                  <span className="ml-2 font-semibold capitalize">{name}</span>
                </div>
              )}
            </div>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}