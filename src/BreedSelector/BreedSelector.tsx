import React from 'react';
import {
  Button,
  Card,
  ImageListItem,
  ImageList,
  Grid,
  CircularProgress,
  Container
} from '@mui/material';
import './BreedSelector.css';
import ButtonGrid from '../ButtonGrid';
import { Breed } from '../App/useAppHook/getAllBreeds';
import { Statuses } from './useBreedSelectorHook/types';
import { sendBreedButtonClicked } from './useBreedSelectorHook/actions';
import { useBreedSelectorHook } from './useBreedSelectorHook/useBreedSelectorHook';

interface BreedSelectorProps {
  breeds: Breed[];
}

/**
 * Manages the user's selection of breed buttons and the corresponding images.
 */
const BreedSelector: React.FC<BreedSelectorProps> = props => {
  const [state, dispatch] = useBreedSelectorHook(props.breeds);
  const { fsmStatus, imageURLs, selectedBreed } = state;

  const breedDisplayNames: string[] = props.breeds.map(
    breedObj => breedObj.displayName
  );

  return (
    <Container>
      {props.breeds.length === 0 ? (
        <Grid>
          <h2>No Breed Matches Found.</h2>
        </Grid>
      ) : (
        <ButtonGrid
          elementList={breedDisplayNames}
          selectedElement={state.selectedBreed}
          totalElements={12}
          numColumns={4}
          perColumn={3}
          onElementClick={(displayName: string) => {
            dispatch(sendBreedButtonClicked(displayName));
          }}
        />
      )}
      {fsmStatus === Statuses.PENDING && (
        <Grid>
          <Card>
            <CircularProgress color="secondary" />
            <h2 className="loading-text">Loading...</h2>
          </Card>
        </Grid>
      )}
      {fsmStatus === Statuses.ERROR && (
        <Grid>
          <Card>
            <h2>Something went wrong while loading the dogs:</h2>
            <h3>{state.errorMessage}</h3>
            <Button
              color="warning"
              type="button"
              onClick={() =>
                dispatch(sendBreedButtonClicked(state.selectedBreed))
              }
            >
              Try Again?
            </Button>
          </Card>
        </Grid>
      )}
      {fsmStatus === Statuses.IDLE && selectedBreed !== '' && (
        <Grid>
          <Card>
            <h2>
              Done!{' '}
              <span role="img" aria-label="dog face">
                🐶
              </span>
            </h2>
          </Card>
        </Grid>
      )}
      {fsmStatus === Statuses.IDLE && (
        <ImageList sx={{ width: 1200, height: 1200 }} cols={3} rowHeight={400}>
          {imageURLs.slice(0, 51).map((imageURL, i) => (
            <ImageListItem key={i}>
              <img src={imageURL} srcSet={imageURL} alt="card" loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Container>
  );
};

export default BreedSelector;
