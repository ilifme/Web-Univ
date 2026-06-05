import { useState, useEffect } from 'react'
import apiClient from '../services/api'
import Table from '../components/Table'

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchTeachers()
  }, [page, search])

  const fetchTeachers = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await apiClient.get('/teachers', {
        params: { page, limit: 10, search }
      })
      setTeachers(response.data.data.teachers)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch teachers')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (id) => {
    alert('Edit teacher ' + id + ' - Not yet implemented')
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await apiClient.delete(`/teachers/${id}`)
        setTeachers(teachers.filter(t => t.id !== id))
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete teacher')
      }
    }
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'nip', label: 'NIP' },
    { key: 'subject', label: 'Subject' },
  ]

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold mb-4'>Teachers Management</h1>
        <div className='flex gap-4'>
          <input
            type='text'
            placeholder='Search by name, email, or NIP...'
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className='flex-1 px-4 py-2 border rounded'
          />
          <button className='px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
            Add Teacher
          </button>
        </div>
      </div>

      {error && (
        <div className='mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
          {error}
        </div>
      )}

      {loading ? (
        <div className='text-center py-8'>Loading...</div>
      ) : (
        <div className='bg-white rounded shadow'>
          <Table columns={columns} data={teachers} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  )
}
