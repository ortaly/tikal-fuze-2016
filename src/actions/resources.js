const headers = new Headers({
  'Content-Type': 'application/json'
})

export default function(State) {
  State.on('loadResources', () => {
    State.get().app.set({loading: true})
    fetch('/resources.json', {
      method: 'GET',
    headers})
      .then(res => res.json())
      .then(json => State.get().set('rawResources', json))
      .catch(err => alert('Request Error:' + err))
      .then(State.get().app.set({loading: false}))
  })
}
