import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';

function Hadeeth() {
    return (
        <div className='Hadeeth'>
            <Navbar />
            <Hadeethselector />
        </div>
    );
}

function Hadeethselector() {
    const [languages, setLanguages] = useState([]);
    const [books, setBooks] = useState([]);
    const [sections, setSections] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [text, setText] = useState([]);
    const [fontSize, setFontSize] = useState(110);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/hadeeth/languages/')
            .then((response) => {
                console.log(response.data)
                setLanguages(response.data.languages.sort());
            })
            .catch(
                console.log('No languages found')
            )
    }, [])

    useEffect(() => {
        setSelectedBook(null);
    }, [selectedLanguage]);

    useEffect(() => {
        let sectionList = [];

        if (!selectedBook) {
            setSections([]);
            setSelectedSection(null);
            return;
        }

        axios
            .get('http://127.0.0.1:5000/api/hadeeth/sections/?book=' + selectedBook)
            .then((response) => {
                let sections = response.data.sections;
                sectionList = sections.map((section) => `${section.section_number} - ${section.section_name}`);
                setSections(sections);
                setSelectedSection(null);
            })
            .catch((error) => {
                console.error('Error fetching sections:', error);
                setSections([]);
                setSelectedSection(null);
            });
    }, [selectedBook]);

    useEffect(() => {
        axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-bukhari/sections/1.json')
            .then((response) => {
                let hadeeths = response.data.hadiths.map(narration => ({
                    number: narration.hadithnumber,
                    text: narration.text
                }));

                setText(hadeeths);
            })
            .catch(
                console.log("Couldn't get text")
            );
    }, []);

    useEffect(() => {
        if (selectedLanguage && selectedBook && selectedSection) {
            let bookName;
            Object.values(books).forEach(book => {
                if (book.book === selectedBook) {
                    bookName = book.name;
                }
            });

            axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/' + bookName + '/sections/' + selectedSection.number + '.json')
                .then((response) => {
                    let hadeeths = response.data.hadiths.map(narration => ({
                        number: narration.hadithnumber,
                        text: narration.text
                    }));

                    setText(hadeeths)
                })
        }
    }, [selectedLanguage, selectedBook, selectedSection, sections]);

    const handleLanguageChange = (event, newValue) => {
        console.log(newValue);
        setSelectedLanguage(newValue);
        axios.get('http://127.0.0.1:5000/api/hadeeth/bookbylanguage/?language=' + newValue)
            .then((response) => {
                setBooks(response.data.books.sort());
            })
            .catch(
                console.log('No editions found')
            )
    }

    function getBooks() {
        if (!books) {
            return null;
        }

        let name = Object.values(books).map((book) => book.book);
        return name.sort();
    }

    const increaseFontSize = () => {
        setFontSize((prevSize) => prevSize + 10);
    };

    const decreaseFontSize = () => {
        setFontSize((prevSize) => Math.max(50, prevSize - 10)); // Decrease font size by 2, but ensure it doesn't go below 8
    };

    return (
        <div className='quranSelector'>
            <Paper sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between', width: { xs: '90%', md: '60%', lg: '60%' }, padding: { xs: '2%', md: '2%', lg: '1%' }, opacity: 0.8 }}>
                <div className='editionSelector'>
                    <Autocomplete
                        defaultValue={selectedLanguage}
                        onChange={handleLanguageChange}
                        disablePortal
                        options={languages}
                        sx={{ width: { xs: '95%', sm: '25%' } }}
                        renderInput={(params) => <TextField {...params} label="Language" />}
                    />
                    <Autocomplete
                        value={selectedBook}
                        onChange={(event, newValue) => {
                            setSelectedBook(newValue);
                        }}
                        disablePortal
                        options={getBooks()}
                        sx={{ width: { xs: '95%', sm: '25%' }, marginTop: { xs: '3%', sm: '0px' } }}
                        renderInput={(params) => <TextField {...params} label="Book" />}
                        disabled={selectedLanguage === null}
                    />
                    <Autocomplete
                        value={selectedSection}
                        onChange={(event, newValue) => {
                            setSelectedSection(newValue);
                        }}
                        disablePortal
                        options={sections}
                        sx={{ width: { xs: '95%', sm: '25%' }, marginTop: { xs: '3%', sm: '0px' } }}
                        renderInput={(params) => <TextField {...params} label="Section" />}
                        disabled={selectedBook === null}
                    />
                    <ButtonGroup sx={{ marginTop: { xs: '3%', sm: '0px' } }} variant="outlined" aria-label="text size">
                        <Button onClick={decreaseFontSize}>-</Button>
                        <Button onClick={increaseFontSize}>+</Button>
                    </ButtonGroup>
                </div>
                <div className='quranText'>
                    {
                        text.map((line) => (
                            <>
                                <div className='verse'>
                                    <p className='verseNumber' style={{
                                        marginLeft: '2.5%',
                                        marginRight: '5%'
                                    }}>{line.number}</p>
                                    <p className='verseText' style={{
                                        marginRight: '5%', fontSize: `${fontSize}%`, fontWeight: 400,
                                        fontFamily: 'Roboto', textAlign: 'right'
                                    }}>{line.text}</p>
                                </div >
                                <Divider variant="inset" sx={{ borderBottomWidth: 2 }} />
                            </>
                        ))
                    }
                </div>
            </Paper>
        </div>
    );
}

export default Hadeeth;