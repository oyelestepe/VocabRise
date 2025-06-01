import React, { useState, useRef, useEffect } from 'react';
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
import Navbar from '../components/Navbar';

function Dictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const workerRef = useRef();

  useEffect(() => {
    workerRef.current = new window.Worker(new URL('./dictionaryWorker.js', import.meta.url));
    workerRef.current.onmessage = (e) => {
      setSearchResults(e.data);
    };
    // Send the dataset once
    workerRef.current.postMessage({ type: 'init', data: oxford3000 });
    return () => {
      workerRef.current.terminate();
    };
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (workerRef.current) {
      workerRef.current.postMessage({ type: 'search', term });
    }
  };

  return (
    <>
      <Navbar />
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
    </>
  );
}

export default Dictionary;