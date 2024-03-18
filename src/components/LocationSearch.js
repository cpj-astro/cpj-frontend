import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const LocationSearch = ({onLocationSelect}) => {
  const [address, setAddress] = useState('');

  const handleChange = newAddress => {
    setAddress(newAddress);
  };

  const handleSelect = selectedAddress => {
    geocodeByAddress(selectedAddress)
      .then(results => getLatLng(results[0], setAddress(selectedAddress)))
      .then(latLng => onLocationSelect({...latLng, location: selectedAddress}))
      .catch(error => console.error('Error', error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className='cp__relative'>
          <input
            {...getInputProps({
              placeholder: 'Search Places',
            })}
            className='form-control'
          />
            {suggestions.length > 0 && (
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {!loading &&
                  suggestions.map((suggestion, index) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // Check if the suggestion is the last one
                    const isLastSuggestion = index === suggestions.length - 1;
                    // Conditionally apply border style
                    const style = suggestion.active
                      ? {
                          color: '#00FFFF',
                          cursor: 'pointer',
                          borderBottom: isLastSuggestion ? 'none' : '1px solid',
                        }
                      : {
                          color: '#FFFFFF',
                          cursor: 'pointer',
                          borderBottom: isLastSuggestion ? 'none' : '1px solid',
                        };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
              </div>
            )}

        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearch;
