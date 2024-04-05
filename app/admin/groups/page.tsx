'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import $http from '@/api/interceptors'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { format } from 'date-fns'
import Link from 'next/link'

interface Group {
  id: number
  group_id: any
  group_name: string
  createdAt: string
  updatedAt: string
}

const Groups: React.FC = () => {
  const [groupName, setGroupName] = useState<string>('')
  const [groupID, setGroupID] = useState<string>('')
  const [teacherID, setTeacherID] = useState<string>('')
  const router = useRouter()
  const [groups, setGroups] = useState<any>([])
  const [teachers, setTeachers] = useState<any>([])
  const [courses, setCourses] = useState<any>([])

  const handleEdit = async (id: number, name: string, course_id: number, teacher_id: number) => {
    const editValue = prompt('Update group name', name)
    if (!editValue) return

    try {
      const { data } = await $http.put(`/group/${id}`, { group_name: editValue, course_id: course_id, teacher_id: teacher_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${Cookies.get('token')}` } })
      setGroups((prevGroups: any) => prevGroups.map((group: any) => (group.group_id === id ? data : group)))
    } catch (error) {
      console.error('Failed to update group:', error)
    }
  }

  const handleView = async (id: number) => {
    try {
      const { data } = await $http.get(`/group/${id}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` } })
      router.push(`/admin/groups/${data.group_id}`)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }

  const handleDelete = async (id: number) => {
    const check = confirm('Do you want to delete this group?')
    if (check) {
      try {
        const { data } = await $http.delete(`/group/${id}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${Cookies.get('token')}` } })
        console.log('Delete response:', data)
        setGroups((prevGroups: Group[]) => prevGroups.filter((group) => group.group_id !== id))
      } catch (error) {
        console.error('Failed to delete course:', error)
      }
    }
  }

  useEffect(() => {
    async function getGroups() {
      try {
        const response = await $http.get('/group/all')
        setGroups(response.data)
      } catch (error) {
        console.error('Failed to fetch groups:', error)
      }
    }

    getGroups()

    const getTeachers = async () => {
      try {
        const response = await $http.get('/teacher/all')
        setTeachers(response.data)
      } catch (error) {
        console.error('Failed to fetch teachers:', error)
      }
    }

    getTeachers()

    const getCourses = async () => {
      try {
        const response = await $http.get('/course/all')
        setCourses(response.data)
      } catch (error) {
        console.error('Failed to fetch courses:', error)
      }
    }

    getCourses()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { group_name, course_id, teacher_id }: any = event.target
      const { data } = await $http.post('/group/create', { group_name: group_name.value, course_id: course_id.value, teacher_id: teacher_id.value }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${Cookies.get('token')}` } })

      setGroups((prevGroups: any) => [...prevGroups, data])

      group_name.value = ''
      course_id.value = ''
      teacher_id.value = ''
    } catch (error) {
      console.error('Failed to add group:', error)
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 p-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-80">
        <form onSubmit={handleSubmit} className={'flex items-center justify-between'}>
          <input name="group_name" type="text" className={'bg-gray caret-amber-300 focus-visible:outline-red-600 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2'} placeholder={'group name'} />
          <select name={'course_id'}>
            <option selected={true} disabled={true}>
              courseni tanlang
            </option>
            {courses?.map((course: any) => <option value={course.course_id}>{course.course_name}</option>)}
          </select>

          <select name={'teacher_id'}>
            <option selected={true} disabled={true}>
              teacherni tanlang
            </option>
            {teachers?.map((teacher: any) => <option value={teacher.teacher_id}>{teacher.username}</option>)}
          </select>

          <button type={'submit'} className="mb-4 bg-indigo-400 hover:bg-indigo-800 text-black font-bold py-2 px-4 rounded">
            Add Group
          </button>
        </form>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Course Name
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {groups?.map((group: any) => (
              <tr key={group.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{group.group_id}</td>
                <td className="px-6 py-4">{group.group_name}</td>
                <td className="px-6 py-4">{group.createdAt}</td>
                <td className="px-6 py-4">{group.updatedAt}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => handleEdit(group.group_id, group.group_name, group.course_id, group.teacher_id)}>
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={() => handleView(group.group_id)}>
                      View
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={() => handleDelete(group.group_id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-blue-800 dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/admin" onClick={() => router.push('/admin')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Admin</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/groups" onClick={() => router.push('/admin/groups')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Groups</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/courses" onClick={() => router.push('/admin/courses')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Courses</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/students" onClick={() => router.push('/admin/students')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Students</span>
                </Link>
              </li>
              <li>
                <Link href="/admin/teachers" onClick={() => router.push('/admin/teachers')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Teachers</span>
                </Link>
              </li>
              <li>
                <Link href="/auth" onClick={() => router.push('/auth')} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Groups
