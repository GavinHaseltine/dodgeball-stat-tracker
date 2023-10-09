import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal } from '@mui/material';
import { IconEdit } from '@tabler/icons-react';


export default function ManagePlayers() {

  const dispatch = useDispatch()
  const allPlayers = useSelector((store) => store.playersReducer)

  useEffect(() => {
    dispatch({ type: "FETCH_PLAYERS" });
  }, []);

  const handleEdit = () => {

  }
    // const handleDelete = (id) => {
    //   dispatch({ type: "DELETE_PLAYER", payload: id });
    //   dispatch({ type: 'FETCH_ALL_PLAYERS' })
    // }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Jersey Number</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Referee Status</TableCell>
              <TableCell>Captain Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allPlayers.map((player) => (
              <TableRow key={player.player_id}>
                <TableCell component="th" scope="row">
                  {player.lastname + ', ' + player.firstname}
                </TableCell>
                <TableCell component="th" scope="row">
                  {player.jersey_number}
                </TableCell>
                <TableCell component="th" scope="row">
                  {player.phone_number}
                </TableCell>
                <TableCell component="th" scope="row">
                  {(player.can_referee) ? '✅' : ''}
                </TableCell>
                <TableCell component="th" scope="row">
                  {(player.captain) ? '✅' : ''}
                </TableCell>
                <TableCell align="right">
                  <Button 
                    onClick={() => handleEdit(player.id)}
                    color="secondary">
                    <IconEdit size={24} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
    
}

