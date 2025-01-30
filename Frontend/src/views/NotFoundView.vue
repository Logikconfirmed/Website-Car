<template>
    <div class="not-found">
      <div class="content">
        <h1>404</h1>
        <h2>Oops! Seite nicht gefunden</h2>
        <p>Die Seite, die du suchst, existiert möglicherweise nicht oder wurde verschoben.</p>
        <router-link to="/" class="home-button">Zurück zur Startseite</router-link>
      </div>
    </div>
  </template>
  
  <style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    background: linear-gradient(to right, #898d92, #3a3e3d);
    color: white;
    font-family: 'Arial', sans-serif;
  }
  
  .content {
    background: rgba(255, 255, 255, 0.1);
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
  }
  
  h1 {
    font-size: 6rem;
    margin: 0;
    font-weight: bold;
  }
  
  h2 {
    font-size: 2rem;
    margin: 10px 0;
  }
  
  p {
    font-size: 1.2rem;
    margin: 20px 0;
  }
  
  .home-button {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ffd700;
    color: #333;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .home-button:hover {
    background-color: #f5c400;
  }
  </style>
  