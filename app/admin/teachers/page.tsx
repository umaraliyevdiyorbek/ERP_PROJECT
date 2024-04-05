'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import $http from '@/api/interceptors'
import Link from 'next/link'

interface Teachers {
  id: number
  lastname: string
  firstname: string
  username: string
  password: string
  group_id: string
}

const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teachers[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [teacherFirstName, setTeacherFirstName] = useState<string>('')
  const [teacherLastName, setTeacherLastName] = useState<string>('')
  const [teacherUserName, setTeacherUserName] = useState<string>('')
  const [teacherPassword, setTeacherPassword] = useState<string>('')
  // const [teacherPhoto, setTeacherPhoto] = useState<string>('');
  const router = useRouter()

  useEffect(() => {
    async function getTeachers() {
      try {
        const response = await $http.get('/teacher/all')
        setTeachers(response.data)
      } catch (error) {
        console.error('Failed to fetch teachers:', error)
      }
    }

    getTeachers()
  }, [setTeachers])

  const handleDelete = async (id: number) => {
    const check = confirm('Do you want to delete this teacher?')
    if (check) {
      try {
        const { data } = await $http.delete(`/teacher/${id}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${Cookies.get('token')}` } })
        console.log('Delete response:', data)
        setTeachers((prevTeachers) => prevTeachers.filter((teacher) => teacher.id !== id))
      } catch (error) {
        console.error('Failed to delete teacher:', error)
      }
    }
  }

  const handleEdit = async (id: number) => {
    const editValue = prompt('Update teacher name')
    if (!editValue) return
    try {
      const { data } = await $http.put(`/teacher/${id}`, { teacher_name: editValue }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${Cookies.get('token')}` } })
      setTeachers((prevTeachers) => prevTeachers.map((teacher) => (teacher.id === id ? { ...teacher, teacher_name: data.teacher_name } : teacher)))
    } catch (error) {
      console.error('Failed to update teacher:', error)
    }
  }

  const handleView = async (id: number) => {
    try {
      const { data } = await $http.get(`/teacher/${id}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` } })
      router.push(`/admin/teachers/${data.teacher_id}`)
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    }
  }
  const handleCancel = () => setIsModalOpen(false)

  const createTeacher = async () => {
    setIsModalOpen(true)
  }

  const handleCreateTeacher = async () => {
    try {
      const { data } = await $http.post('/teacher/create', { teacher_name: teacherFirstName, teacher_lastname: teacherLastName, teacher_username: teacherUserName, teacher_password: teacherPassword }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${Cookies.get('token')}` } })
      setTeachers((prevTeachers) => [...prevTeachers, data])
      setIsModalOpen(false)
    } catch (error) {
      console.error('Failed to create teacher:', error)
    }
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="pt-8 ml-80 relative overflow-x-auto shadow-md sm:rounded-lg">
        <button className="mb-4 px-4 py-2 bg-indigo-400 hover:bg-indigo-700 text-black rounded-lg" onClick={createTeacher}>
          Add Teacher
        </button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers?.map((teacher) => (
              <tr key={teacher.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{teacher.firstname}</td>
                <td className="px-6 py-4">{teacher.lastname}</td>
                <td className="px-6 py-4">{teacher.username}</td>
                <td className="px-6 py-4">{teacher.password}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => handleEdit(teacher.id)}>
                      Edit
                    </button>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg" onClick={() => handleView(teacher.id)}>
                      View
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={() => handleDelete(teacher.id)}>
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
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex justify-center items-center">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="relative bg-white p-8 rounded-lg max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add teacher</h3>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
            <form id="submit" onSubmit={handleCreateTeacher}>
              <input onChange={(e) => setTeacherFirstName(e.target.value)} type="text" placeholder="Enter  teacher firstname" name="teacher" className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4" />
              <input onChange={(e) => setTeacherLastName(e.target.value)} type="text" placeholder="Enter  teacher lastname" name="teacher" className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4" />
              <input onChange={(e) => setTeacherUserName(e.target.value)} type="text" placeholder="Enter  teacher username" name="teacher" className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4" />
              <input onChange={(e) => setTeacherPassword(e.target.value)} type="password" placeholder="Enter  teacher password" name="teacher" className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4" />
              {/* <input onChange={(e) => setTeacherPhoto(e.target.files[0] | null)}  type="file" name="teacher" className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4" /> */}
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add teacher</button>
                <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Teachers
