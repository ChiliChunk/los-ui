import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import simpleComponent from '../components/simpleComponent'
import * as simpleAction from '../actions/simpleAction'


function mapStateToProps (state) {
  return {
    store: state.simpleReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    simpleAction: bindActionCreators(simpleAction, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(simpleComponent)