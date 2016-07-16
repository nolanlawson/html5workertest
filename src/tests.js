var tests = [
  {
    name: 'IndexedDB',
    func: () => typeof indexedDB !== 'undefined'
  },
  {
    name: 'WebSQL',
    func: () => typeof openDatabase !== 'undefined'
  },
  {
    name: 'LocalStorage',
    func: () => typeof localStorage !== 'undefined'
  },
  {
    name: 'SessionStorage',
    func: () => typeof sessionStorage !== 'undefined'
  }
]

export default tests