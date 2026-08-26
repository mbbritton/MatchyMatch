import { useEffect, useState } from 'react'
import { Share2, Check } from 'lucide-react'

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const input = document.createElement('textarea')
    input.value = text
    input.style.position = 'fixed'
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    document.body.removeChild(input)
    return ok
  }
}

export default function ShareButton({ url }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  const handleShare = async () => {
    const ok = await copyToClipboard(url)
    if (ok) setCopied(true)
  }

  return (
    <button
      type="button"
      className="theme-menu__trigger"
      onClick={handleShare}
      aria-label="Copy link to this game"
      title={copied ? 'Copied!' : 'Copy link to this game'}
    >
      {copied ? <Check size={16} strokeWidth={2} /> : <Share2 size={16} strokeWidth={2} />}
    </button>
  )
}
