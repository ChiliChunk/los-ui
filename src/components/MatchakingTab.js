import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import axios from "axios";
import { SERVER_URL } from "../consts";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActions from '../actions/userActions'
import Fab from '@material-ui/core/Fab';
import RefreshIcon from '@material-ui/icons/Refresh';

class MatchakingTab extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            requests : []
        }
    }

    handleSubmit(e,index) {
        console.log(e,index)
        console.log(this.props.matchmakingIds)
        e.preventDefault();
        axios
          .get( 
            SERVER_URL +
              "/matchmaking/request?matchmakingId="+this.props.matchmakingIds[index].matchmakingId+"&token="+this.props.userReducer.userData.data.token
          )
          .then(res => {
            console.log(res)
            console.log(this.props)
        });
}

    defyButton(idJoueur) {
        let ret =
            <IconButton aria-label="Delete" >
                <SvgIcon>
                    <path d="M6.2,2.44L18.1,14.34L20.22,12.22L21.63,13.63L19.16,16.1L22.34,19.28C22.73,19.67 22.73,20.3 22.34,20.69L21.63,21.4C21.24,21.79 20.61,21.79 20.22,21.4L17,18.23L14.56,20.7L13.15,19.29L15.27,17.17L3.37,5.27V2.44H6.2M15.89,10L20.63,5.26V2.44H17.8L13.06,7.18L15.89,10M10.94,15L8.11,12.13L5.9,14.34L3.78,12.22L2.37,13.63L4.84,16.1L1.66,19.29C1.27,19.68 1.27,20.31 1.66,20.7L2.37,21.41C2.76,21.8 3.39,21.8 3.78,21.41L7,18.23L9.44,20.7L10.85,19.29L8.73,17.17L10.94,15Z" />
                </SvgIcon>
            </IconButton >
        return ret
    }

    allPlayers() {
        if (this.props.type === "availablePlayers"){
            let ret = [];
            console.log(this.props.players);
            (this.props.players || []).map((player, index) => {
                let defyButton = this.defyButton((player,index))
                ret.push(
                    <TableRow key={index}>
                        <TableCell>{player}</TableCell>
                        <TableCell onClick={(e) => this.handleSubmit(e,index)}>{defyButton} </TableCell>
                    </TableRow>
                    )
                })
                return ret
        }
        else{
            let ret = [];
            let cpt = 0
            console.log(this.props.players);
            (this.state.requests || []).map((player, index) => {
                cpt += 1
                let defyButton = this.defyButton((player,index))
                ret.push(
                    <TableRow key={cpt}>
                        <TableCell>{player.name}</TableCell>
                        <TableCell onClick={(e) => this.handleSubmit(e,index)}>Defier  {defyButton} </TableCell>
                    </TableRow>
                    )
                })
                return ret
        }
        }
    refresh(){
        axios
            .get( 
            SERVER_URL +
                "/matchmaking/participate?token="+this.props.userReducer.userData.data.token
            )
            .then(res => {
            console.log(res)
            this.setState({
                requests : res.data.data.request
            } , () => {console.log(this.state)})
            console.log(this.state)
        });
    }

    render() {
        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                        <TableCell>
                                {this.props.title}
                        </TableCell>
                        </TableHead>
                        <TableBody>
                            {this.allPlayers()}
                        </TableBody>
                    </Table>
                </Paper>
                {this.props.type === "challengeRequests" ?
                    <Fab color="primary" aria-label="Add" onClick={() => this.refresh()}>
                        <RefreshIcon />
                    </Fab> : null
                }
            </div>
            
        )
    }
}


function mapStateToProps (state) {
    return {
      userReducer: state.userReducer
    }
  }
  
  function mapDispatchToProps (dispatch) {
    return {
      userActions: bindActionCreators(userActions, dispatch),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(MatchakingTab)
