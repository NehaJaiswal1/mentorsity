
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PhotoList.css'; 

function PhotoList() {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        setPhotos(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredPhotos = photos.filter(photo =>
    photo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="photo-list">
      <h1>Photo List</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredPhotos.map(photo => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </li>
        ))}
        {filteredPhotos.length === 0 && <p>No matching photos found.</p>}
      </ul>
    </div>
  );
}

export default PhotoList;
