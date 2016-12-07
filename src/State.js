import Freezer from 'freezer-js'
import resourcesActions from './actions/resources'

let State = new Freezer({
    app: {
        searchString: '',
        loading: false
    },
    rawResources: []
})

resourcesActions(State)

export default State