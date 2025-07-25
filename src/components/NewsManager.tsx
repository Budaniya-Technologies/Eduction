'use client'

import { useState } from 'react'

type NewsItem = {
  id: number
  title: string
  category: string
  date: string
  coverUrl: string
  published: boolean
}

export default function NewsManager() {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: 'Exam Date Announced',
      category: 'Campus',
      date: '2025-07-20',
      coverUrl: '/sample1.jpg',
      published: true,
    },
    {
      id: 2,
      title: 'New Library Opens',
      category: 'Infrastructure',
      date: '2025-07-18',
      coverUrl: '/sample2.jpg',
      published: false,
    },
  ])

  const togglePublish = (id: number) => {
    setNews(news.map(n => n.id === id ? { ...n, published: !n.published } : n))
  }

  const deleteNews = (id: number) => {
    if (confirm('Are you sure you want to delete this news?')) {
      setNews(news.filter(n => n.id !== id))
    }
  }

  const editNews = (id: number) => {
    alert(`Navigate to edit page for news ID: ${id}`)
    // You can navigate to /news/edit/${id} or use a modal
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Manage News</h1>

      {news.length === 0 ? (
        <p className="text-gray-500">No news posted yet.</p>
      ) : (
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-3">Cover</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {news.map(item => (
              <tr key={item.id} className="border-t text-sm hover:bg-gray-50">
                <td className="p-3">
                  <img src={item.coverUrl} alt="cover" className="w-16 h-10 object-cover rounded-md" />
                </td>
                <td className="p-3">{item.title}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {item.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  <button
                    onClick={() => editNews(item.id)}
                    className="px-3 py-1 text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => togglePublish(item.id)}
                    className={`px-3 py-1 text-sm font-medium rounded ${
                      item.published
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-green-700 hover:bg-green-50'
                    }`}
                  >
                    {item.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => deleteNews(item.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
