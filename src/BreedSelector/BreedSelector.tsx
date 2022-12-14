import React, { Suspense, useState } from 'react';
import {
  Button,
  ImageListItem,
  ImageList,
  Grid,
  CircularProgress,
  useMediaQuery,
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

const LIMIT_MOBILE = 5;
const LIMIT_WEB = 10;

const BreedSelector: React.FC<BreedSelectorProps> = props => {
  const [state, dispatch] = useBreedSelectorHook(props.breeds);
  const { fsmStatus, imageURLs, selectedBreed } = state;

  const isMobile = useMediaQuery('500');
  const inititalLimit = isMobile ? LIMIT_MOBILE : LIMIT_WEB;
  const [limit, setLimit] = useState(inititalLimit);

  const breedDisplayNames: string[] = props.breeds.map(
    breedObj => breedObj.displayName
  );

  const showMoreDocuments = () => {
    let count = imageURLs.length;
    if (limit < count) {
      setLimit(limit + 10);
    } else {
      setLimit(count++);
    }
  };

  return (
    <Container className="container">
      {props.breeds.length === 0 ? (
        <Suspense fallback={<h2>No Breed Matches Found.</h2>}>
          <h2>No Breed Matches Found.</h2>
        </Suspense>
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
          <Suspense
            fallback={<h2 className="loading-text">Loading...</h2>}>
          </Suspense>
        </Grid>
      )}
      {fsmStatus === Statuses.ERROR && (
        <Grid>
          <Suspense fallback={<h3>{state.errorMessage}</h3>}></Suspense>
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
        <Grid className="grid">
          <h2>
            Enjoy different images!{' '}
            <span role="img" aria-label="dog face">
              ????
            </span>
          </h2>
          <Button variant="outlined" onClick={showMoreDocuments}>
            {limit < imageURLs.length
              ? `${limit}  images out of ${imageURLs.length}`
              : `${imageURLs.length} images `}
          </Button>
        </Grid>
      )}
      {fsmStatus === Statuses.IDLE && (
        <ImageList className="img-grid" variant="masonry" cols={3}>
          {imageURLs.slice(0, limit).map((imageURL, i) => (
            <ImageListItem key={i} className="img-list">
              <img
                src={imageURL}
                srcSet={imageURL}
                alt="card-name"
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Container>
  );
};

export default BreedSelector;
