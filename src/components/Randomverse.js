import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';

function Randomverse() {
    const [verse, setVerse] = useState(null);

    useEffect(() => {
        let randomVerse = Math.floor(Math.random() * (6238 - 1) + 1);
        axios.get('https://api.alquran.cloud/v1/ayah/' + randomVerse + '/editions/quran-uthmani,en.pickthall')
            .then((response) => {
                let name = response.data.data[0].surah.englishName;
                let chapter = response.data.data[0].surah.number;
                let verse = response.data.data[0].numberInSurah;
                let arabic = response.data.data[0].text;
                let english = response.data.data[1].text;
                setVerse({ 'name': name, 'chapter': chapter, 'verse': verse, 'arabic': arabic, 'english': english });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div class='quranVerse'>
            <Paper sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between', width: { xs: '90%', md: '60%', lg: '60%' }, padding: { xs: '2%', md: '2%', lg: '1%' }, opacity: 0.8 }}>
                {verse !== null ? (
                    <>
                        <h1 className='arabicVerse'>{verse.arabic}</h1>
                        <h1 className='englishVerse'>{verse.english}</h1>
                        <div className='verseDetails'>
                            <h2 className='verseDetail'>{verse.name}</h2>
                            <h2 className='verseDetail2'>{verse.chapter}:</h2>
                            <h2 className='verseDetail'>{verse.verse}</h2>
                        </div>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </Paper>
        </div>
    );
}

export default Randomverse;