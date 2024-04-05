'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Student {
  firstname: string
  username: string
  password: string
  group_id: string
}

const StudentProfil = () => {
  const [student, setStudent] = useState<Student | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function getStudent() {
      try {
        const response = await fetch('https://crm.mquvonchbek.uz/student/${id}')
        const data: Student = await response.json()
        setStudent(data)
      } catch (error) {
        console.error('Failed to fetch student data:', error)
      }
    }
    getStudent()
  }, [])

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {student && (
          <div className="w-1/4 bg-white border border-gray-200 rounded-lg shadow p-4">
            <div className="flex flex-col items-center pb-10">
              <p className="text-gray-600 mb-2">Group ID: {student.group_id}</p>
              <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png" alt="Bonnie image" />
              <p className="mb-1 text-xl font-medium text-gray-900">Firstname : {student.firstname}</p>
              <p className="text-gray-600 mb-1">Username: {student.username}</p>
              <p className="text-gray-600">Password: {student.password}</p>
            </div>
          </div>
        )}
      </div>
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-blue-800 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/student" onClick={() => router.push('/student')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">My groups</span>
              </Link>
            </li>
            <li>
              <Link href="/student/singleStudent" onClick={() => router.push('/student/singleStudent')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">My profile</span>
              </Link>
            </li>
            <li>
              <Link href="/auth" onClick={() => router.push('/auth')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default StudentProfil
