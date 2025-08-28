import React from 'react';
import './PodcastUploadPage.css';

const PodcastUploadPage: React.FC = () => {
  return (
    <div className="podcast-upload-page">
      <div className="upload-form-container">
        <h2>Cadastrar Podcast</h2>
        <form>
          <div className="upload-form-group">
            <label htmlFor="podcast-title">Título:</label>
            <input id="podcast-title" type="text" className="upload-form-input" />
          </div>
          <div className="upload-form-group">
            <label htmlFor="podcast-description">Descrição:</label>
            <textarea id="podcast-description" className="upload-form-textarea"></textarea>
          </div>
          <div className="upload-form-group">
            <label htmlFor="podcast-cover">Inserir Capa</label>
            <input id="podcast-cover" type="file" className="upload-form-input" />
          </div>
          <div className="upload-form-group">
            <label htmlFor="podcast-audio">Inserir Audio</label>
            <input id="podcast-audio" type="file" className="upload-form-input" />
          </div>
        </form>
      </div>
      <div className="preview-container">
        <h3>Titulo</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco
          laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <img
          src="https://i.imgur.com/6bT1Rj8.png" // Placeholder image of the mic with sunglasses
          alt="Podcast Preview"
          className="preview-image"
        />
      </div>
    </div>
  );
};

export default PodcastUploadPage;
