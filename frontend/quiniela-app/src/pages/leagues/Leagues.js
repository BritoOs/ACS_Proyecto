import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import useToken from '../../useToken';

async function createTeam(teamData){
    return fetch('http://localhost:4000/newteam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamData)
    }).then(data => data.json())
}

async function signInToTeam(teamData){
    return fetch('http://localhost:4000/signintoteam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamData)
    }).then(data => data.json())
}

function Leagues({userID}) {
    const [showNewLeague, setShowNewLeague] = useState(false);
    const handleCloseNewLeague = () => setShowNewLeague(false);
    const handleShowNewLeague = () => setShowNewLeague(true);

    const [showBets, setShowMatches] = useState(false);
    const handleCloseMatches = () => setShowMatches(false);
    const handleShowMatches = () => setShowMatches(true);

    const [showBet, setShowBet] = useState(false);
    const handleCloseBet = () => setShowBet(false);
    const handleShowBet = () => setShowBet(true);

    const [teamname, setLeagueName] = useState();
    const [for_betting, setBetMode] = useState(false);
    const [price, setPrice] = useState();

    const [teams, setTeams] = useState();
    const [matches, setMatches] = useState();

    const [user_id, setUserID] = useState();
    const [team_id, setTeamID] = useState();

    const [match_id, setMatchID] = useState();
    const [opponent1, setOpponent1] = useState();
    const [opponent2, setOpponent2] = useState();
    const [opponent1gols, setOpponent1gols] = useState();
    const [opponent2gols, setOpponent2gols] = useState();
    const [flag1, setFlag1] = useState();
    const [flag2, setFlag2] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await createTeam({
          teamname,
          for_betting,
          price
        });
    }

    const handleSubmitSignInToTeam = async e => {
        e.preventDefault();
        const response = signInToTeam({
          user_id,
          team_id
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:4000/teams')
            .then(data => data.json())
            .then(data => setTeams(data))
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const  getMatches = async e => {
        e.preventDefault();
        fetch('http://localhost:4000/matches')
        .then(data => data.json())
        .then(data => setMatches(data))
    }

    return (
        <div>
            <h2 className="text-center">Todas las Ligas del Mundo</h2>

            <Button variant="secondary" size="sm" onClick={handleShowNewLeague}>
                Crear nueva Liga
            </Button>

            <Modal show={showNewLeague} onHide={handleCloseNewLeague}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear una Liga</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="form-group mt-3">
                            <label>Nombre de liga</label>
                            <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="League Name"
                                required
                                onChange={e => setLeagueName(e.target.value)}
                            />
                        </div>

                        <div className="form-group mt-3">
                            <label>Se permiten las apuestas en esta liga? </label>
                            <br></br>
                            <input
                                type="checkbox"
                                onChange={(e) => setBetMode(e.target.checked) }
                            />
                        </div>

                        {
                            for_betting &&
                            <div className="form-group mt-3">
                                <label>Precio de ingreso a esta liga</label>
                                <input
                                    type="number"
                                    className="form-control mt-1"
                                    min="0.00"
                                    step="0.01"
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                        }

                        <div className="d-grid gap-2 mt-3">
                            <Button variant="secondary" onClick={handleCloseNewLeague}>Cerrar</Button>
                            <Button type="submit" variant="primary" onClick={handleCloseNewLeague}>Guardar</Button>
                        </div>
                    </div>
                </form>
                </Modal.Body>
            </Modal>

            <Modal /* size="lg" */ fullscreen={true} show={showBets} onHide={handleCloseMatches}>
                <Modal.Header closeButton>
                    <Modal.Title>Apuestas para esta Liga</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Partido</th>
                                <th class="text-center">Fecha y hora</th>
                                <th class="text-center">Estadio</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {matches?.map(match =>{
                                    return (
                                        <tr>
                                            <td class="text-center">{match.match_id}</td>
                                            <td class="text-center">
                                                <div class="row">
                                                    <div class="col-sm">
                                                        {match.opponent1}
                                                    </div>
                                                    <div class="col-sm">
                                                        <img width="50px" src={match.flag1}/>
                                                        {' '}
                                                        {' ' + match.opponent1gols + ' '}
                                                        {' - '}
                                                        {' ' + match.opponent2gols + ' '}
                                                        {' '}
                                                        <img width="50px" src={match.flag2}/>
                                                    </div>
                                                    <div class="col-sm">
                                                        {match.opponent2}
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="text-center">{match.matchdate + ' - ' + match.matchtime}</td>
                                            <td class="text-center">{match.stadium}</td>
                                            <td class="text-center">
                                                <Button 
                                                    variant="secondary" 
                                                    onClick={ (e) => {
                                                        setMatchID(match.match_id);
                                                        setOpponent1(match.opponent1);
                                                        setOpponent2(match.opponent2);
                                                        setFlag1(match.flag1);
                                                        setFlag2(match.flag2);
                                                        handleShowBet();
                                                    }}>
                                                    Apuesta
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <div className="d-grid gap-2 mt-3">
                            <Button variant="secondary" onClick={handleCloseMatches}>Cerrar</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showBet} onHide={handleCloseBet}>
                <Modal.Header closeButton>
                    <Modal.Title>Información de Apuesta</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div>

                        <div class="row">
                            <div class="d-flex col-sm justify-content-center">
                                <img src={flag1}  width="150px" />
                            </div>
                            <div class="d-flex col-sm justify-content-center">
                                <img src={flag2} width="150px" />
                            </div>
                        </div>

                        <div class="row">
                            <div class="text-center col-sm">
                                <label>{opponent1}</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    required
                                    onChange={e => setOpponent1gols(e.target.value)}
                                />
                            </div>

                            <div class="text-center col-sm">
                                <label>{opponent2}</label>
                                <br></br>
                                <input
                                    type="number"
                                    min="0"
                                    step="1"
                                    required
                                    onChange={(e) => setOpponent2gols(e.target.checked) }
                                />
                            </div>
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <Button variant="secondary" onClick={handleCloseBet}>Cerrar</Button>
                            <Button 
                                type="submit" 
                                variant="primary" 
                                onClick={(e) => {
                                    handleCloseBet();
                                }}>
                                Guardar
                            </Button>
                        </div>
                    </div>
                </form>
                </Modal.Body>
            </Modal>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th class="text-center">#</th>
                    <th class="text-center">Nombre de Liga</th>
                    <th class="text-center">Apuestas Permitidas</th>
                    <th class="text-center">Costo de Ingreso</th>
                    <th class="text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    {teams?.map(team =>{
                        return (
                            <tr>
                                <td class="text-center">{team.team_id}</td>
                                <td class="text-center">{team.teamname}</td>
                                <td class="text-center">{team.for_betting ? 'Sí': 'No'}</td>
                                <td class="text-center">{team.price}</td>
                                <td class="text-center">
                                    {
                                        team.user_id && 
                                        <Button 
                                            variant="success" 
                                            onClick={(e) => {
                                                setUserID(userID);
                                                setTeamID(team.team_id);
                                                getMatches(e);
                                                handleShowMatches();
                                            }}>
                                            Ver Apuestas
                                        </Button>
                                    }
                                    {
                                        !team.user_id && team.for_betting && 
                                        <Button 
                                            variant="primary" 
                                            onClick={(e) => {
                                                setUserID(userID);
                                                setTeamID(team.team_id);
                                                handleSubmitSignInToTeam(e);
                                            }}>
                                            Registrase
                                        </Button>
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default Leagues;