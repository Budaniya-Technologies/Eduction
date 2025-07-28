'use client'
import React, { useState } from 'react'
import { HiMenu, HiX, HiChevronRight, HiChevronDown } from 'react-icons/hi'

const Dashboard = ({
  title,
  cards,
  sidebarItems,
  news,
  mainComponent,
  onSectionClick,
}) => {
  const [expanded, setExpanded] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleExpand = (label) =>
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }))

  return (
    <div className="flex flex-col py-16 md:flex-row min-h-screen bg-gray-100 antialiased text-gray-800">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
        <h1 className="text-2xl font-extrabold text-blue-700">
          {title || 'Dashboard'}
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-blue-700 rounded-md focus:outline-none"
        >
          {sidebarOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={` 
          fixed inset-y-0 left-0 bg-white w-64 pt-6 pb-4 overflow-y-auto shadow-lg
          md:relative md:translate-x-0 transition-transform duration-300 z-20
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:block md:w-72
        `}
      >
        <nav className="px-6 space-y-6">
          {sidebarItems.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-bold text-gray-700 uppercase mb-3">
                {section.section}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item, i) =>
                  typeof item === 'string' ? (
                    <li
                      key={i}
                      className="cursor-pointer text-gray-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md flex items-center"
                      onClick={() => {
                        onSectionClick(item)
                        setSidebarOpen(false)
                      }}
                    >
                      <span className="mr-3 text-blue-500">•</span>
                      {item}
                    </li>
                  ) : (
                    <li key={i}>
                      <div
                        className="cursor-pointer text-gray-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md flex items-center justify-between"
                        onClick={() => toggleExpand(item.label)}
                      >
                        <div className="flex items-center">
                          <span className="mr-3 text-blue-500">•</span>
                          {item.label}
                        </div>
                        {expanded[item.label] ? (
                          <HiChevronDown size={18} />
                        ) : (
                          <HiChevronRight size={18} />
                        )}
                      </div>
                      {expanded[item.label] && (
                        <ul className="ml-6 mt-2 space-y-1 border-l border-gray-200 pl-4">
                          {item.subItems.map((sub, subIdx) => (
                            <li
                              key={subIdx}
                              className="cursor-pointer text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md"
                              onClick={() => {
                                onSectionClick(sub)
                                setSidebarOpen(false)
                              }}
                            >
                              {sub}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`
                bg-white rounded-lg shadow-sm p-6 flex flex-col items-center
                transform hover:scale-105 transition-transform duration-200
                border-t-4 border-${card.color}-500
              `}
            >
              <p className={`text-4xl font-extrabold text-${card.color}-600 mb-2`}>
                {card.count}
              </p>
              <h3 className="text-lg font-medium text-gray-700 text-center">
                {card.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Line Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Student Engagement
            </h4>
            <iframe
              src="https://playground.anychart.com/api/core/_samples/anychart.core.Chart.animation_get/iframe"
              sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-modals allow-forms"
              frameBorder="0"
              className="w-full h-64 lg:h-80"
              allowTransparency
              allowFullScreen
            />
          </div>

          {/* Donut Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">
              Content Upload Distribution
            </h4>
            <iframe
              src="https://playground.anychart.com/chartopedia/samples/Donut_Chart/iframe"
              sandbox="allow-scripts allow-pointer-lock allow-same-origin allow-popups allow-modals allow-forms"
              frameBorder="0"
              className="w-full h-64 lg:h-80"
              allowTransparency
              allowFullScreen
            />
          </div>
        </div>

        {/* Detail + News */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 overflow-y-auto h-[400px]">
            {mainComponent}
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h4 className="text-xl font-semibold text-blue-700 mb-4">
              News & Announcements
            </h4>
            <ul className="space-y-3 text-gray-700">
              {news.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  {item.icon && <span className="mr-3 text-blue-500">{item.icon}</span>}
                  <p>{item.title}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
