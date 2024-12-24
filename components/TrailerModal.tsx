'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { X } from 'lucide-react'

interface TrailerModalProps {
  isOpen: boolean
  onClose: () => void
  trailerUrl: string
}

export default function TrailerModal({ isOpen, onClose, trailerUrl }: TrailerModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-3xl rounded bg-gray-900">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 rounded-full bg-gray-800 p-1"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={trailerUrl}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

