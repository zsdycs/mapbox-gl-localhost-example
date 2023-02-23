import request from '@/utils/request'
// import { Base64 } from 'js-base64'

const formatData = (data) => {
  const requestData = new FormData()
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      const item = data[key]
      if (item) {
        // 空数据不传
        requestData.append(key, item)
      }
    }
  }
  return requestData
}

export const login = (data) => {
  return request({
    url: '/testing/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formatData(data)
  })
}

export const orderlist = (data) => {
  return request({
    url: '/testing/orderlist',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formatData(data)
  })
}

export const expressdata = (data) => {
  return request({
    url: '/testing/expressdata',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formatData(data)
  })
}

export const getarea = (data) => {
  return request({
    url: '/testing/get-area',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formatData(data)
  })
}

export const placeorder = (data) => {
  return request({
    url: '/testing/placeorder',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formatData(data)
  })
}

export const addressbooklist = (data) => {
  return request({
    url: 'testing/addressbooklist',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formatData(data)
  })
}
