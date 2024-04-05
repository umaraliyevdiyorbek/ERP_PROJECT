'use client'
import { saveAccessToken } from '@/helpers/auth.helpers'
import { IGlobalAuthForm } from '@/types/auth.types'
import Cookies from 'js-cookie'
import $http from '@/api/interceptors'

const SignIn = async (payload: IGlobalAuthForm): Promise<number | undefined> => {
  try {
    const { data } = await $http.post('/admin/login', payload)
    Cookies.set('token', data.token)

    if (data.role === 'admin') {
      saveAccessToken(data?.token)
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export default SignIn
