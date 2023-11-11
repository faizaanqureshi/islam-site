import Navbar from '../components/Navbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { List } from '@mui/material';


function Quran() {
    return (
        <div className='Quran'>
            <Navbar />
            <Quranselector />
        </div>
    );
}

function Quranselector() {
    const [languages, setLanguages] = useState(null);
    const [editions, setEditions] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedEdition, setSelectedEdition] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [text, setText] = useState([]);
    const chapters = [
        { label: '1 - Al-Fatiha (The Opening)', chapter: 1 },
        { label: '2 - Al-Baqarah (The Cow)', chapter: 2 },
        { label: '3 - Al-Imran (The Family of Imran)', chapter: 3 },
        { label: '4 - An-Nisa (The Women)', chapter: 4 },
        { label: '5 - Al-Ma\'idah (The Table Spread)', chapter: 5 },
        { label: '6 - Al-An\'am (The Cattle)', chapter: 6 },
        { label: '7 - Al-A\'raf (The Heights)', chapter: 7 },
        { label: '8 - Al-Anfal (The Spoils of War)', chapter: 8 },
        { label: '9 - At-Tawbah (Repentance)', chapter: 9 },
        { label: '10 - Yunus (Jonah)', chapter: 10 },
        { label: '11 - Hud', chapter: 11 },
        { label: '12 - Yusuf (Joseph)', chapter: 12 },
        { label: '13 - Ar-Ra\'d (The Thunder)', chapter: 13 },
        { label: '14 - Ibrahim (Abraham)', chapter: 14 },
        { label: '15 - Al-Hijr (The Rocky Tract)', chapter: 15 },
        { label: '16 - An-Nahl (The Bees)', chapter: 16 },
        { label: '17 - Al-Isra (The Night Journey)', chapter: 17 },
        { label: '18 - Al-Kahf (The Cave)', chapter: 18 },
        { label: '19 - Maryam (Mary)', chapter: 19 },
        { label: '20 - Ta-Ha', chapter: 20 },
        { label: '21 - Al-Anbiya (The Prophets)', chapter: 21 },
        { label: '22 - Al-Hajj (The Pilgrimage)', chapter: 22 },
        { label: '23 - Al-Mu\'minun (The Believers)', chapter: 23 },
        { label: '24 - An-Nur (The Light)', chapter: 24 },
        { label: '25 - Al-Furqan (The Criterion)', chapter: 25 },
        { label: '26 - Ash-Shu\'ara (The Poets)', chapter: 26 },
        { label: '27 - An-Naml (The Ants)', chapter: 27 },
        { label: '28 - Al-Qasas (The Stories)', chapter: 28 },
        { label: '29 - Al-Ankabut (The Spider)', chapter: 29 },
        { label: '30 - Ar-Rum (The Romans)', chapter: 30 },
        { label: '31 - Luqman', chapter: 31 },
        { label: '32 - As-Sajdah (The Prostration)', chapter: 32 },
        { label: '33 - Al-Ahzab (The Confederates)', chapter: 33 },
        { label: '34 - Saba (Sheba)', chapter: 34 },
        { label: '35 - Fatir (The Originator)', chapter: 35 },
        { label: '36 - Ya-Sin', chapter: 36 },
        { label: '37 - As-Saffat (Those Ranged in Ranks)', chapter: 37 },
        { label: '38 - Sad', chapter: 38 },
        { label: '39 - Az-Zumar (The Groups)', chapter: 39 },
        { label: '40 - Ghafir (The Forgiver)', chapter: 40 },
        { label: '41 - Fussilat (Explained in Detail)', chapter: 41 },
        { label: '42 - Ash-Shura (The Consultation)', chapter: 42 },
        { label: '43 - Az-Zukhruf (The Ornaments of Gold)', chapter: 43 },
        { label: '44 - Ad-Dukhan (The Smoke)', chapter: 44 },
        { label: '45 - Al-Jathiya (The Crouching)', chapter: 45 },
        { label: '46 - Al-Ahqaf (The Wind-Curved Sandhills)', chapter: 46 },
        { label: '47 - Muhammad', chapter: 47 },
        { label: '48 - Al-Fath (The Victory)', chapter: 48 },
        { label: '49 - Al-Hujurat (The Private Apartments)', chapter: 49 },
        { label: '50 - Qaf', chapter: 50 },
        { label: '51 - Adh-Dhariyat (The Winnowing Winds)', chapter: 51 },
        { label: '52 - At-Tur (The Mount)', chapter: 52 },
        { label: '53 - An-Najm (The Star)', chapter: 53 },
        { label: '54 - Al-Qamar (The Moon)', chapter: 54 },
        { label: '55 - Ar-Rahman (The Most Merciful)', chapter: 55 },
        { label: '56 - Al-Waqi\'ah (The Inevitable)', chapter: 56 },
        { label: '57 - Al-Hadid (The Iron)', chapter: 57 },
        { label: '58 - Al-Mujadilah (The Pleading Woman)', chapter: 58 },
        { label: '59 - Al-Hashr (The Exile)', chapter: 59 },
        { label: '60 - Al-Mumtahanah (The Tested Woman)', chapter: 60 },
        { label: '61 - As-Saff (The Ranks)', chapter: 61 },
        { label: '62 - Al-Jumu\'ah (Friday)', chapter: 62 },
        { label: '63 - Al-Munafiqun (The Hypocrites)', chapter: 63 },
        { label: '64 - At-Taghabun (The Mutual Loss and Gain)', chapter: 64 },
        { label: '65 - At-Talaq (The Divorce)', chapter: 65 },
        { label: '66 - At-Tahrim (The Prohibition)', chapter: 66 },
        { label: '67 - Al-Mulk (The Dominion)', chapter: 67 },
        { label: '68 - Al-Qalam (The Pen)', chapter: 68 },
        { label: '69 - Al-Haqqah (The Inevitable Reality)', chapter: 69 },
        { label: '70 - Al-Ma\'arij (The Ways of Ascent)', chapter: 70 },
        { label: '71 - Nuh (Noah)', chapter: 71 },
        { label: '72 - Al-Jinn (The Jinn)', chapter: 72 },
        { label: '73 - Al-Muzzammil (The Enshrouded One)', chapter: 73 },
        { label: '74 - Al-Muddaththir (The Cloaked One)', chapter: 74 },
        { label: '75 - Al-Qiyamah (The Resurrection)', chapter: 75 },
        { label: '76 - Al-Insan (The Human)', chapter: 76 },
        { label: '77 - Al-Mursalat (Those Sent Forth)', chapter: 77 },
        { label: '78 - An-Naba\' (The Great News)', chapter: 78 },
        { label: '79 - An-Nazi\'at (Those Who Pull Out)', chapter: 79 },
        { label: '80 - \'Abasa (He Frowned)', chapter: 80 },
        { label: '81 - At-Takwir (The Overthrowing)', chapter: 81 },
        { label: '82 - Al-Infitar (The Cleaving)', chapter: 82 },
        { label: '83 - Al-Mutaffifin (Those Who Deal in Fraud)', chapter: 83 },
        { label: '84 - Al-Inshiqaq (The Splitting Asunder)', chapter: 84 },
        { label: '85 - Al-Buruj (The Constellations)', chapter: 85 },
        { label: '86 - At-Tariq (The Nightcomer)', chapter: 86 },
        { label: '87 - Al-A\'la (The Most High)', chapter: 87 },
        { label: '88 - Al-Ghashiyah (The Overwhelming Event)', chapter: 88 },
        { label: '89 - Al-Fajr (The Dawn)', chapter: 89 },
        { label: '90 - Al-Balad (The City)', chapter: 90 },
        { label: '91 - Ash-Shams (The Sun)', chapter: 91 },
        { label: '92 - Al-Lail (The Night)', chapter: 92 },
        { label: '93 - Ad-Duha (The Morning Hours)', chapter: 93 },
        { label: '94 - Ash-Sharh (The Relief)', chapter: 94 },
        { label: '95 - At-Tin (The Fig)', chapter: 95 },
        { label: '96 - Al-\'Alaq (The Clot)', chapter: 96 },
        { label: '97 - Al-Qadr (The Night of Power)', chapter: 97 },
        { label: '98 - Al-Bayyinah (The Clear Proof)', chapter: 98 },
        { label: '99 - Az-Zalzalah (The Earthquake)', chapter: 99 },
        { label: '100 - Al-\'Adiyat (The Chargers)', chapter: 100 },
        { label: '101 - Al-Qari\'ah (The Calamity)', chapter: 101 },
        { label: '102 - At-Takathur (The Greed for More)', chapter: 102 },
        { label: '103 - Al-\'Asr (The Declining Day)', chapter: 103 },
        { label: '104 - Al-Humazah (The Traducer)', chapter: 104 },
        { label: '105 - Al-Fil (The Elephant)', chapter: 105 },
        { label: '106 - Quraysh', chapter: 106 },
        { label: '107 - Al-Ma\'un (The Small Kindnesses)', chapter: 107 },
        { label: '108 - Al-Kawthar (The Abundance)', chapter: 108 },
        { label: '109 - Al-Kafirun (The Disbelievers)', chapter: 109 },
        { label: '110 - An-Nasr (The Help)', chapter: 110 },
        { label: '111 - Al-Masad (The Plaited Rope)', chapter: 111 },
        { label: '112 - Al-Ikhlas (Purity of Faith)', chapter: 112 },
        { label: '113 - Al-Falaq (The Dawn)', chapter: 113 },
        { label: '114 - An-Nas (Mankind)', chapter: 114 }
    ]

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/languages/')
            .then((response) => {
                console.log(response.data)
                setLanguages(response.data.languages.sort());
            })
            .catch(
                console.log('No languages found')
            )
    }, [])

    useEffect(() => {
        setSelectedEdition(null);
    }, [selectedLanguage]);

    useEffect(() => {
        if (selectedLanguage && selectedEdition && selectedChapter) {
            let editionName;
            Object.values(editions).forEach(edition => {
                if (edition.author === selectedEdition) {
                    editionName = edition.name;
                }
            });

            axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/' + editionName + '/' + selectedChapter.chapter + '.json')
                .then((response) => {
                    let verses = response.data.chapter.map(item => ({
                        verse: item.verse,
                        text: item.text
                    }));

                    console.log(verses);
                    setText(verses);
                })
                .catch(
                    console.log("Couldn't get text")
                );
        }
    }, [selectedLanguage, selectedEdition, selectedChapter, editions]);

    const handleLanguageChange = (event, newValue) => {
        console.log(newValue);
        setSelectedLanguage(newValue);
        axios.get('http://127.0.0.1:5000/api/editionsbylanguage/?language=' + newValue)
            .then((response) => {
                setEditions(response.data.editions.sort());
            })
            .catch(
                console.log('No editions found')
            )
    }

    function getEditions() {
        if (editions === null) {
            return null;
        } else {
            let authors = [];

            Object.values(editions).forEach(edition => {
                authors.push(edition.author);
            });

            return authors;
        }
    }

    return (
        <div className='Quranselector'>
            <Autocomplete
                onChange={handleLanguageChange}
                disablePortal
                options={languages}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Language" />}
            />
            <Autocomplete
                value={selectedEdition}
                onChange={(event, newValue) => {
                    setSelectedEdition(newValue);
                }}
                disablePortal
                options={getEditions()}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Edition" />}
                disabled={selectedLanguage === null}
            />
            <Autocomplete
                onChange={(event, newValue) => {
                    setSelectedChapter(newValue);
                }}
                disablePortal
                options={chapters}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Chapter" />}
            />
            {(selectedLanguage && selectedEdition && selectedChapter) ? (
                text.map((line) => (
                    <>
                        <p className='dropdown-navbar'>{line.verse}</p>
                        <p className='dropdown-navbar'>{line.text}</p>
                    </>
                ))
            ) : (
                <></>
            )}
        </div>
    );
}

export default Quran;