import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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

    const [showBets, setShowBets] = useState(false);
    const handleCloseBets = () => setShowBets(false);
    const handleShowBets = () => setShowBets(true);

    const [teamname, setLeagueName] = useState();
    const [for_betting, setBetMode] = useState(false);
    const [price, setPrice] = useState();

    const [teams, setTeams] = useState();
    const [matches, setMatches] = useState();

    const [user_id, setUserID] = useState();
    const [team_id, setTeamID] = useState();

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

            <Modal /* size="lg" */ fullscreen={true} show={showBets} onHide={handleCloseBets}>
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
                                </tr>
                            </thead>
                            <tbody>
                                {matches?.map(match =>{
                                    return (
                                        <tr>
                                            <td class="text-center">{match.match_id}</td>
                                            <td class="text-center">
                                                <div class="d-flex justify-content-between">
                                                    <div>
                                                        {'Left'}
                                                    </div>
                                                    <div>
                                                        {match.opponent1}
                                                        {' '}
                                                        <img width="50px" src={match.flag1}/>
                                                        {' ' + match.opponent1gols + ' - ' + match.opponent2gols + ' '}
                                                        <img width="50px" src={match.flag2}/>
                                                        {' '}
                                                        {match.opponent1}
                                                    </div>
                                                    <div>
                                                        {'Right'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="text-center">{match.matchdate + ' - ' + match.matchtime}</td>
                                            <td class="text-center">{match.stadium}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <div className="d-grid gap-2 mt-3">
                            <Button variant="secondary" onClick={handleCloseBets}>Cerrar</Button>
                        </div>
                    </div>
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
                                                getMatches(e);
                                                handleShowBets();
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