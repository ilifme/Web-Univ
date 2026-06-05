export default function Table({ columns, data, onEdit, onDelete }) {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead className='bg-gray-200'>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className='px-6 py-3 text-left text-sm font-semibold'>
                {col.label}
              </th>
            ))}
            <th className='px-6 py-3 text-left text-sm font-semibold'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className='px-6 py-4 text-center text-gray-500'>
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className='border-b hover:bg-gray-50'>
                {columns.map((col) => (
                  <td key={col.key} className='px-6 py-4 text-sm'>
                    {row[col.key]}
                  </td>
                ))}
                <td className='px-6 py-4 text-sm space-x-2'>
                  <button
                    onClick={() => onEdit(row.id)}
                    className='text-blue-600 hover:text-blue-800'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(row.id)}
                    className='text-red-600 hover:text-red-800'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
