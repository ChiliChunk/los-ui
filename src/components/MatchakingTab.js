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
import { crossedSword } from '../style/constSvg';

class MatchakingTab extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            requests: []
        }
        this.interval = setInterval(
            () => this.refresh(), 3000
        )
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    requestAPlayer(e, index) {
        e.preventDefault();
        axios
            .get(
                SERVER_URL +
                "/matchmaking/request?matchmakingId=" + this.props.matchmakingIds[index].matchmakingId + "&token=" + this.props.userReducer.userData.data.token
            );
    }

    defyButton(idJoueur) {
        let ret =
            <IconButton aria-label="Delete" >
                <SvgIcon>
                    <path d={crossedSword} />
                </SvgIcon>
            </IconButton >
        return ret
    }

    acceptRequest(index) { // /!\ ATTENTION : check if we accept the request of the good playe
        axios
            .get(
                SERVER_URL +
                "/matchmaking/acceptRequest?matchmakingId=" + this.state.requests[index].matchmakingId + "&token=" + this.props.userReducer.userData.data.token
            ).then(res => {
                this.props.storeMatchData(res.data.data, false)
            });
    }

    allPlayers() {
        if (this.props.type === "availablePlayers") {
            let ret = [];
            (this.props.players || []).map((player, index) => {
                let defyButton = this.defyButton((player, index))
                ret.push(
                    <TableRow key={index}>
                        <TableCell>{player}</TableCell>
                        <TableCell onClick={(e) => this.requestAPlayer(e, index)}>{defyButton} </TableCell>
                    </TableRow>
                )
            })
            return ret
        }
        else {
            let ret = [];
            let cpt = 0
            (this.state.requests || []).map((player, index) => {
                cpt += 1
                let defyButton = this.defyButton((player, index))
                ret.push(
                    <TableRow key={cpt}>
                        <TableCell>{player.name}</TableCell>
                        <TableCell onClick={() => this.acceptRequest(index)}>{defyButton} </TableCell>
                    </TableRow>
                )
            })
            return ret
        }
    }
    refresh() {
        axios
            .get(
                SERVER_URL +
                "/matchmaking/participate?token=" + this.props.userReducer.userData.data.token
            )
            .then(res => {
                this.setState({
                    requests: res.data.data.request
                })
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
                {/* {this.props.type === "challengeRequests" ?
                    <Fab color="primary" aria-label="Add" onClick={() => this.refresh()}>
                        <RefreshIcon />
                    </Fab> : null
                } */}
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
        userReducer: state.userReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MatchakingTab)
