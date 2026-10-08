import React,{Suspense} from 'react';import{createRoot}from'react-dom/client';import{BrowserRouter}from'react-router-dom';import'./index.css';import App from'./App';
createRoot(document.getElementById('root')).render(<React.StrictMode><BrowserRouter><Suspense fallback={<div className="min-h-screen bg-black"/>}><App/></Suspense></BrowserRouter></React.StrictMode>);
