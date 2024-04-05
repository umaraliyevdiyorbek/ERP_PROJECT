import { getAccessToken } from '@/helpers/auth.helpers'
import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const http = rateLimit(axios.create(), { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 })
http.getMaxRPS() // 2
http.get('https://crm.mquvonchbek.uz/api/docs#/') // will perform immediately
// http.get('https://example.com/api/v1/users.json?page=2') // will perform immediately
// http.get('https://example.com/api/v1/users.json?page=3')

const API_URL = 'https://crm.mquvonchbek.uz'

const $http = axios.create({ baseURL: API_URL })

http.setMaxRPS(3)
http.getMaxRPS() // 3
http.setRateLimitOptions({ maxRequests: 6, perMilliseconds: 150 })

$http.interceptors.request.use((config) => {
  let access_token = getAccessToken()
  if (access_token) {
    config.headers['Authorization'] = `Bearer ${access_token}`
  }

  return config
})

export default $http
