'use client'
import $http from '@/api/interceptors'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

const SingleStudent = () => {
  const [student, setStudent] = useState<any>()
  const params = useParams()

  useEffect(() => {
    const getStudent = async () => {
      try {
        const response = await $http.get(`/student/${params.studentDetail}`)
        setStudent({
          ...response.data,
          createdAt: new Date(response.data.createdAt),
          updatedAt: new Date(response.data.updatedAt)
        })
      } catch (error) {
        toast.error('Failed to fetch group:')
      }
    }

    getStudent()
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="position-absolute top-50 start-50 translate-middle ml-62 m-40 bg-indigo-400 block  max-w-sm p-6 border text-center border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Student Id: {student?.student_id}</h5>
        <hr />
        <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Student Name: {student?.student_name}</h5>
        <hr />
        <p className="font-normal mb-3 text-gray-700 dark:text-gray-400">Student create at: {student ? format(student?.createdAt, 'dd-MM-yyyy') : ''}</p>
        <hr />
        <p className="font-normal mb-3 text-gray-700 dark:text-gray-400">Student update at: {student ? format(student?.updatedAt, 'dd-MM-yyyy') : ''}</p>
      </div>
    </div>
  )
}

export default SingleStudent
