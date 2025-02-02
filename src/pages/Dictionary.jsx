import React, { useState } from 'react';
import oxford3000 from '../Flip_Card_App/oxford3000.json';
import {
  TextField,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Container,
  Chip,
} from '@mui/material';

function Dictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setSearchResults([]);
      return;
    }

    const results = Object.entries(oxford3000)
      .flatMap(([level, words]) =>
        words.map((word) => ({ ...word, level }))
      )
      .filter(
        (word) =>
          word.En.toLowerCase().includes(term) || word.Tr.toLowerCase().includes(term)
      );

    setSearchResults(results);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Kelime Arama
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Kelimeyi veya anlamını yazın..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      {searchResults.length > 0 ? (
        <Paper elevation={3} sx={{ maxHeight: '400px', overflow: 'auto' }}>
          <List>
            {searchResults.map((word, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={word.En}
                  secondary={word.Tr}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                  secondaryTypographyProps={{ color: 'text.secondary' }}
                />
                <Chip
                  label={word.level}
                  color="primary"
                  size="small"
                  sx={{ ml: 2 }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        searchTerm && (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Sonuç bulunamadı.
          </Typography>
        )
      )}
    </Container>
  );
}

export default Dictionary;