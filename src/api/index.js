import MOCK_DATA from './data.json'

const getAPIResponse = (data) => {
  return  new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 1300);
  })
}

export const API = {
  Reimburse: {
    async get(payload){
      return getAPIResponse(MOCK_DATA["api/v1/reimburse"])
    }
  },
  User: {
    async get(payload){
      return getAPIResponse(MOCK_DATA["api/v1/users"])
    }
  }
}