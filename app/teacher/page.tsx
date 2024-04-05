'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Teachers {
  id: number
  course_id: string
  group_id: string
  teacher_id: string
}

const Teacher = () => {
  const router = useRouter()
  const [teachers, setTeachers] = useState<Teachers[]>([])
  const [groups, setGroups] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('url_yoki_endpoint')
        if (!response.ok) {
          throw new Error('Error while fetching data')
        }
        const data = await response.json()
        setTeachers(data)
        setGroups(data.groups)
      } catch (error) {
        console.error('Error while fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const addHomework = () => {
    const homework = prompt('Enter homework details:')
    if (homework) {
      console.log('Homework details:', homework)
    }
  }

  return (
    <div className="flex">
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-blue-800 transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/teacher" onClick={() => router.push('/teacher')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">My groups</span>
              </Link>
            </li>
            <li>
              <Link href="/teacher/singleTeacher" onClick={() => router.push('/teacher/singleTeacher')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">My profile</span>
              </Link>
            </li>
            <li>
              <Link href="/auth" onClick={() => router.push('/auth')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Sign out</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="max-w-screen-5/6 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 border-solid border-1 border-gray-300">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Course name: {teachers[0]?.course_id}</h1>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Group ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Group Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{group.group_id}</td>
                  <td className="px-6 py-4">{group.group_name}</td>
                  <td className="px-6 py-4">
                    <button className="focus:outline-none text-white bg-purple-700 hover:bg-indigo-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-indigo-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={addHomework}>
                      Add Homework
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Teacher
