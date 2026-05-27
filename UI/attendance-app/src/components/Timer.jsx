import { useState, useEffect } from 'react'

function Timer({ checkinTime, initialMs  }) {
  

  const calculateelapsed = () => {
    const livems= Date.now() -new Date(checkinTime).getTime()
    return Math.floor((initialMs +livems)/1000)
  }
  const [elapsed, setElapsed] = useState(calculateelapsed())

    useEffect(() => {

    const interval = setInterval(() => {
      setElapsed(calculateelapsed())
    }, 250)

    return () => clearInterval(interval)

  }, [checkinTime, initialMs])

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