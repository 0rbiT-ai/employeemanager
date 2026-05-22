function AttendanceTable({ records }) {
  function getTotalHours(checkinTime, checkoutTime) {
    if (!checkoutTime) return 'Still working...'
    const diff = Math.floor((new Date(checkoutTime) - new Date(checkinTime)) / 1000)
    const hours = Math.floor(diff / 3600)
    const minutes = Math.floor((diff % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  function formatTime(timestamp) {
    if (!timestamp) return '—'
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—'
    return new Date(dateStr).toLocaleDateString([], {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Date</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Total Hours</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {records.length === 0 ? (
          <tr>
            <td colSpan="6">No records found</td>
          </tr>
        ) : (
          records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{formatDate(record.date)}</td>
              <td>{formatTime(record.checkinTime)}</td>
              <td>{formatTime(record.checkoutTime)}</td>
              <td>{getTotalHours(record.checkinTime, record.checkoutTime)}</td>
              <td>{record.checkoutTime ? 'Done' : 'Active'}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default AttendanceTable