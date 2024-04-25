import axios from 'axios';
import React, { useEffect, useState } from 'react';
import loadingMorty from '../assets/loadingMorty.gif';

const Character = ({location}) => {

    const [residentInfo, setResidentInfo] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        axios.get(location)
        .then((res) => {
            setIsLoading(false);
            setResidentInfo(res.data)
        });
    }, [])

    console.log(residentInfo);

    return (
        <>
        { isLoading ? (
            <div className='loading2'>
                <div className='card card1'>
                    <img src={loadingMorty} alt="gifLoading" />
                    <div className="contentCardLoading">
                        <div className="barLoading"></div>
                        <div className="barLoading2"></div>
                        <div className="barLoading"></div>
                    </div>
                </div> 
                <div className='card card1'>
                    <img src={loadingMorty} alt="gifLoading" />
                    <div className="contentCardLoading">
                        <div className="barLoading"></div>
                        <div className="barLoading2"></div>
                        <div className="barLoading"></div>
                    </div>
                </div> 
                <div className='card card1'>
                    <img src={loadingMorty} alt="gifLoading" />
                    <div className="contentCardLoading">
                        <div className="barLoading"></div>
                        <div className="barLoading2"></div>
                        <div className="barLoading"></div>
                    </div>
                </div> 
                <div className='card card1'>
                    <img src={loadingMorty} alt="gifLoading" />
                    <div className="contentCardLoading">
                        <div className="barLoading"></div>
                        <div className="barLoading2"></div>
                        <div className="barLoading"></div>
                    </div>
                </div> 
            </div>
            
        ) : (
        <div className='card'>
            <div className='info-img'>
                <img src={residentInfo.image} alt={`Character Photo: ${residentInfo.name}`} />
            </div>
            <div className='info'>
                <div className="container-status">
                    {residentInfo.status === "Alive" ? (
                        <div className='row'> <div className='status' style={{background:"green", boxShadow:"0 0 10px green"}}></div> {residentInfo.status} - {residentInfo.species}</div>
                    ) : residentInfo.status === "Dead" ? (
                        <div className='row'> <div className='status' style={{background:"red", boxShadow:"0 0 10px red"}}></div> {residentInfo.status} - {residentInfo.species}</div>
                    ) : (
                        <div className='row'> <div className='status' style={{background:"gray", boxShadow:"0 0 10px gray"}}></div> {residentInfo.status} - {residentInfo.species}</div>
                    )}
                </div>
                <p><b>Name:</b> <span>{residentInfo.name}</span></p>
                <p><b>Origin: </b> <span>{residentInfo.origin?.name}</span></p>
                <p><b>Episode: </b> <span>{residentInfo.episode?.length}</span></p>
            </div>
        </div>
        )}
        </>
    );
};

export default Character;