import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import apiClient from '../services/api'

export default function DashboardPage() {
  const { user } = useContext(AuthContext)
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    admins: 0,
    headmasters: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [studentsRes, teachersRes, adminsRes, headmastersRes] = await Promise.all([
        apiClient.get('/students?limit=1'),
        apiClient.get('/teachers?limit=1'),
        apiClient.get('/admins?limit=1'),
        apiClient.get('/headmasters?limit=1'),
      ])

      setStats({
        students: studentsRes.data.data.pagination.total,
        teachers: teachersRes.data.data.pagination.total,
        admins: adminsRes.data.data.pagination.total,
        headmasters: headmastersRes.data.data.pagination.total,
      })
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className='text-center py-8'>Loading...</div>
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>Dashboard</h1>
      <p className='text-gray-600 mb-8'>Welcome back, {user?.name || 'Admin'}!</p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <StatCard icon='👨‍🎓' title='Students' value={stats.students} color='blue' />
        <StatCard icon='👨‍🏫' title='Teachers' value={stats.teachers} color='green' />
        <StatCard icon='👔' title='Admins' value={stats.admins} color='yellow' />
        <StatCard icon='👨‍💼' title='Headmasters' value={stats.headmasters} color='purple' />
      </div>

      <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <QuickStatsBox title='System Status' items={[
          { label: 'Database', status: 'Connected', color: 'green' },
          { label: 'API', status: 'Running', color: 'green' },
          { label: 'Auth', status: 'Active', color: 'green' },
        ]} />
        
        <QuickStatsBox title='Quick Actions' items={[
          { label: 'Add Student', icon: '➕' },
          { label: 'Add Teacher', icon: '➕' },
          { label: 'Add Admin', icon: '➕' },
          { label: 'Generate Report', icon: '📊' },
        ]} />
      </div>
    </div>
  )
}

function StatCard({ icon, title, value, color }) {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    yellow: 'bg-yellow-50 border-yellow-200',
    purple: 'bg-purple-50 border-purple-200',
  }

  const textClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    purple: 'text-purple-600',
  }

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color]} shadow-sm`}>
      <div className='text-3xl mb-2'>{icon}</div>
      <h3 className='text-gray-700 font-semibold'>{title}</h3>
      <p className={`text-3xl font-bold ${textClasses[color]} mt-2`}>{value}</p>
    </div>
  )
}

function QuickStatsBox({ title, items }) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm border'>
      <h3 className='text-lg font-semibold mb-4'>{title}</h3>
      <div className='space-y-3'>
        {items.map((item, idx) => (
          <div key={idx} className='flex justify-between items-center pb-3 border-b last:border-b-0'>
            <span className='text-gray-700'>{item.label}</span>
            {item.status && (
              <span className={`px-3 py-1 rounded text-sm font-medium text-white bg-${item.color}-500`}>
                {item.status}
              </span>
            )}
            {item.icon && (
              <span className='text-xl'>{item.icon}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
