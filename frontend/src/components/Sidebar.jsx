import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Students', path: '/students', icon: '👨‍🎓' },
    { label: 'Teachers', path: '/teachers', icon: '👨‍🏫' },
    { label: 'Admins', path: '/admins', icon: '👔' },
    { label: 'Headmasters', path: '/headmasters', icon: '👨‍💼' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className='w-64 bg-gray-900 text-white p-6'>
      <h1 className='text-2xl font-bold mb-8'>Web-Univ</h1>
      
      <nav className='space-y-2'>
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded transition ${
              isActive(item.path)
                ? 'bg-blue-600 font-semibold'
                : 'hover:bg-gray-800'
            }`}
          >
            <span className='mr-2'>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
