import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GameComponent from '../components/Game'
import * as gameActions from '../actions/gameActions'


function mapStateToProps (state) {
  return {
    store: state.gameReducer
  }
}

function mapDispatchToProps (dispatch) {
  return {
    gameActions: bindActionCreators(gameActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent)