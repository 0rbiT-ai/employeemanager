import { useState, useEffect } from 'react'

function Timer({ checkinTime }) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const seconds = Math.floor((Date.now() - new Date(checkinTime)) / 1000)
      setElapsed(seconds)
    }, 1000)

    return () => clearInterval(interval)
  }, [checkinTime])

  const hours = Math.floor(elapsed / 3600)
  const minutes = Math.floor((elapsed % 3600) / 60)
  const seconds = elapsed % 60

  function pad(n) {
    return String(n).padStart(2, '0')
  }

  return (
    <div className="flex items-center justify-center w-full">
      <h2 className="text-4xl font-mono tracking-wider">{pad(hours)} : {pad(minutes)} : {pad(seconds)}</h2>
    </div>
  )
}

export default Timer