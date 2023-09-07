import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Avatar
} from '@mui/material';

function App () {
  const [characters, setCharacters] = useState([])
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  useEffect(() => {
    async function fetchCharacters () {
      try {
        const response = await fetch("https://gateway.marvel.com/v1/public/characters?apikey=a301a38890c476185add87bc696a0677", {
          "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9"
          },
          "body": null,
          "method": "GET"
        });
        const data = await response.json()

        setCharacters(data.data.results)
      } catch (error) {
        console.error("Error fetching characters:", error)
      }
    }

    fetchCharacters()
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characters.length > 0 && characters.map((character) => (
                <TableRow key={character.id} onClick={() => setSelectedCharacter(character)}>
                  <TableCell>
                    <Avatar src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
                  </TableCell>
                  <TableCell>
                    {character.name}
                  </TableCell>
                </TableRow>
              ))}
              {characters.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography variant="body1">No characters found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6}>
        {selectedCharacter && (
          <div>
            <Typography variant="h5">{selectedCharacter.name}</Typography>
            <img src={`${selectedCharacter.thumbnail.path}.${selectedCharacter.thumbnail.extension}`} alt={selectedCharacter.name} width="100%" />
            <Typography variant="body1">{selectedCharacter.description}</Typography>
            <Typography variant="body1">Comics: {selectedCharacter.comics.available}</Typography>
            <Typography variant="body1">Series: {selectedCharacter.series.available}</Typography>
            <Typography variant="body1">Stories: {selectedCharacter.stories.available}</Typography>
            <Typography variant="body1">Events: {selectedCharacter.events.available}</Typography>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default App
