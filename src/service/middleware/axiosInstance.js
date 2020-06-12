import axios from 'axios'
import __C from '@/primitives/_constants_'

export default function instance(url) {
  return axios.create({
    baseURL: `${__C.URL.HOST_URL}/${url ? url : null}`
  })
}
