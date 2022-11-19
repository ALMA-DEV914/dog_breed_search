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

  
  function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  

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
          perColumn={4}
          onElementClick={(displayName: string) => {
            dispatch(sendBreedButtonClicked(displayName));
          }}
        />
      )}
      {fsmStatus === Statuses.PENDING && (
        <Grid>
          <CircularProgress color="secondary" />
          <h2 className="loading-text">Loading...</h2>
        </Grid>
      )}
      {fsmStatus === Statuses.ERROR && (
        <Grid>
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
        </Grid>
      )}
      {fsmStatus === Statuses.IDLE && selectedBreed !== '' && (
        <Grid className='grid'>
          <h2>
            Enjoy different images!{' '}
            <span role="img" aria-label="dog face">
              🐶
            </span>
          </h2>
        </Grid>
      )}
      {fsmStatus === Statuses.IDLE && (
        <ImageList
          sx={{ width: 1200, height: 600 }}
          variant="quilted"
          cols={3}
          rowHeight={400}
          className="img-grid"
        >
          {imageURLs.slice(0, 51).map((imageURL, i) => (
            <ImageListItem key={i} className="img-list">
              <img src={imageURL}  srcSet={imageURL} alt="card-name" loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Container>
  );
};

export default BreedSelector;
