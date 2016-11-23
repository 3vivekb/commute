import {connect} from 'react-redux'

import {deleteAgency, loadAgencies} from '../actions/agency'
import agencies from '../components/agencies'

function mapStateToProps (state) {
  return {
    agencies: Object.values(state.agency)
  }
}

function mapDispatchToProps (dispatch) {
  return {
    deleteAgency: (opts) => dispatch(deleteAgency(opts)),
    loadAgencies: () => dispatch(loadAgencies())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(agencies)
