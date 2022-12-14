import React, { useState } from 'react';
import {
  Button,
  Container,
  Stack,
  ListItem,
  CircularProgress,
  Input

} from '@mui/material';

import { useAppHook } from './useAppHook/useAppHook';
import { Statuses } from './useAppHook/types';
import { sendFetchInit } from './useAppHook/actions';
import './App.css';
import BreedSelector from '../BreedSelector/BreedSelector';
const { ERROR, IDLE, PENDING } = Statuses;

const App: React.FC = () => {
  const [state, dispatch] = useAppHook();

  const [searchbar, setSearchbar] = useState('');
  const filteredBreeds = state.breeds.filter(breed =>
    breed.displayName.includes(searchbar)
  );

  return (
    <Container className="App">
      <Stack className="header-row">
        <header className="App-header">
          <h1 className="text-primary">Dog Breed Search</h1>
        </header>
        <Input
          type="text"
          name="searchbar"
          id="searchbar"
          placeholder="Search by breed or sub-breed"
          value={searchbar}
          onChange={e => setSearchbar(e.target.value)}
        />
      </Stack>
      {state.fsmStatus === PENDING && (
        <Stack>
          <ListItem>
            <CircularProgress color="secondary" />
            <h2 className="loading-text">Loading Dog Breeds...</h2>
          </ListItem>
        </Stack>
      )}
      {state.fsmStatus === ERROR && (
        <Stack>
          <ListItem>
            <h2>Something went wrong while loading the dogs:</h2>
            <h3>{state.errorMessage}</h3>
            <Button
              color="warning"
              type="button"
              onClick={() => dispatch(sendFetchInit())}
            >
              Try Again?
            </Button>
          </ListItem>
        </Stack>
      )}
      {state.fsmStatus === IDLE && <BreedSelector breeds={filteredBreeds} />}
    </Container>
  );
};

export default App;
