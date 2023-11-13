import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';

function Prayertimes() {
    const [city, setCity] = useState(null);
    const [province, setProvince] = useState(null);
    const [country, setCountry] = useState(null);
    const [fajr, setFajr] = useState(null);
    const [dhuhr, setDhuhr] = useState(null);
    const [asr, setAsr] = useState(null);
    const [maghrib, setMaghrib] = useState(null);
    const [isha, setIsha] = useState(null);
    const [nextFajr, setNextFajr] = useState(null);
    const [nextPrayer, setNextPrayer] = useState(null);
    const today = new Date();
    let tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const tomorrowDay = tomorrow.getDate();
    const tomorrowMonth = tomorrow.getMonth() + 1;
    const tomorrowYear = tomorrow.getFullYear();
    let time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const [currentTime, setCurrentTime] = useState(time);
    const [hijriDate, setHijriDate] = useState(null);
    const [hijriMonth, setHijriMonth] = useState(null);
    const [hijriYear, setHijriYear] = useState(null);
    const [gregorianDate, setGregorianDate] = useState(null);
    const [gregorianMonth, setGregorianMonth] = useState(null);
    const [gregorianYear, setGregorianYear] = useState(null);
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const [prayerIndex, setPrayerIndex] = useState(0);


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log('Geolocation not supported');
        }
    }, []);

    useEffect(() => {
        const nextPrayer = determineNextPrayer();
        const nextPrayerValue = nextPrayer.nextPrayerValue;
        const nextPrayerIndex = nextPrayer.nextPrayerIndex;
        setNextPrayer(nextPrayerValue);
        setPrayerIndex(nextPrayerIndex);
    }, [currentTime]);

    useEffect(() => {
        const difference = timeUntilNextPrayer(nextPrayer);
        setTimeDifference(difference);
    }, [currentTime]);

    const [timeDifference, setTimeDifference] = useState(timeUntilNextPrayer().difference);

    function determineNextPrayer() {
        let nextPrayerValue;
        let nextPrayerIndex;
        if (currentTime > isha && nextFajr) {
            nextPrayerValue = nextFajr;
            nextPrayerIndex = 0;
        } else if (currentTime > maghrib && isha) {
            nextPrayerValue = isha;
            nextPrayerIndex = 4;
        } else if (currentTime > asr && maghrib) {
            nextPrayerValue = maghrib;
            nextPrayerIndex = 3;
        } else if (currentTime > dhuhr && asr) {
            nextPrayerValue = asr;
            nextPrayerIndex = 2;
        } else if (currentTime > fajr && dhuhr) {
            nextPrayerValue = dhuhr;
            nextPrayerIndex = 1;
        } else if (fajr) {
            nextPrayerValue = fajr;
            nextPrayerIndex = 0;
        }
        return { nextPrayerValue, nextPrayerIndex };
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        axios.get('https://nominatim.openstreetmap.org/reverse', {
            params: {
                'lat': latitude,
                'lon': longitude,
            }
        }).then((response) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(response.data, 'text/xml');
            const country = xmlDoc.querySelector('country').textContent;
            const province = xmlDoc.querySelector('state').textContent;
            const city = xmlDoc.querySelector('city');
            const town = xmlDoc.querySelector('town');
            if (city) {
                setCity(city.textContent);
            } else {
                setCity(town.textContent);
            }
            setCountry(country);
            setProvince(province);
        }).catch(() => {
            setCity(latitude);
            setProvince(longitude);
        })

        axios.get('http://api.aladhan.com/v1/timings/' + `${day}-${month}-${year}`, {
            params: {
                'latitude': latitude,
                'longitude': longitude,
            }
        }).then((response) => {
            setFajr(response.data.data.timings.Fajr);
            setDhuhr(response.data.data.timings.Dhuhr);
            setAsr(response.data.data.timings.Asr);
            setMaghrib(response.data.data.timings.Maghrib);
            setIsha(response.data.data.timings.Isha);
            setHijriDate(response.data.data.date.hijri.day);
            setHijriMonth(response.data.data.date.hijri.month.en);
            setHijriYear(response.data.data.date.hijri.year);
            setGregorianDate(response.data.data.date.gregorian.day);
            setGregorianMonth(response.data.data.date.gregorian.month.en);
            setGregorianYear(response.data.data.date.gregorian.year);
        })

        axios.get('http://api.aladhan.com/v1/timings/' + `${tomorrowDay}-${tomorrowMonth}-${tomorrowYear}`, {
            params: {
                'latitude': latitude,
                'longitude': longitude,
            }
        }).then((response) => {
            setNextFajr(response.data.data.timings.Fajr);
        })
    }

    function updateTime() {
        let time = new Date().toLocaleTimeString('en-US', { hour12: false });
        if (time === '12:00:01 AM') {
            window.location.reload();
        } else {
            setCurrentTime(time);
        }
    }

    function timeUntilNextPrayer(nextPrayer) {
        if (!nextPrayer) {
            return '00:00:00'
        }

        let difference;

        if (nextPrayer == nextFajr) {
            difference = calculateDifference(nextFajr, tomorrow);
        } else if (nextPrayer == isha) {
            difference = calculateDifference(isha, today);
        } else if (nextPrayer == maghrib) {
            difference = calculateDifference(maghrib, today);
        } else if (nextPrayer == asr) {
            difference = calculateDifference(asr, today);
        } else if (nextPrayer == dhuhr) {
            difference = calculateDifference(dhuhr, today);
        } else if (nextPrayer == fajr) {
            difference = calculateDifference(fajr, today);
        }

        return difference;
    }

    function calculateDifference(next, day) {
        if (next) {
            let currentTime = new Date();
            let nextPrayer = new Date(day);
            let nextPrayerTime = next.split(":");
            nextPrayer.setHours(nextPrayerTime[0]);
            nextPrayer.setMinutes(nextPrayerTime[1]);
            nextPrayer.setSeconds(0);
            let difference = new Date(nextPrayer - currentTime).toISOString().slice(11, 19);
            return difference;
        }
    }

    function convertToAmPm(prayer) {
        let newTime
        let time = prayer.split(':');
        let hour = time[0];
        let minutes = time[1];
        if (hour > "12") {
            newTime = `${hour - 12}:${minutes} PM`
        } else if (hour == "00") {
            newTime = `${hour + 12}:${minutes} AM`
        } else if (hour == "12") {
            newTime = `${hour}:${minutes} PM`
        } else {
            newTime = `${hour[1]}:${minutes} AM`
        }
        return newTime;
    }

    function prayer(index) {
        let prayer;
        if (index === 0) {
            prayer = convertToAmPm(fajr);
        } else if (index === 1) {
            prayer = convertToAmPm(dhuhr);
        } else if (index === 2) {
            prayer = convertToAmPm(asr);
        } else if (index === 3) {
            prayer = convertToAmPm(maghrib);
        } else if (index === 4) {
            prayer = convertToAmPm(isha);
        }

        return (
            <>
                <h2 className='prayerName'>{prayers[index]}</h2>
                <h2 className='prayerTime'>{
                    prayer
                }</h2>
            </>
        );
    }

    function error() {
        console.log('Unable to retrieve your location');
    }

    setInterval(updateTime, 1000);

    return (
        <div class='prayerTimes'>
            <Paper sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between', width: { xs: '90%', md: '60%', lg: '60%' }, padding: { xs: '2%', md: '2%', lg: '1%' }, opacity: 0.8 }}>
                <h1 className='prayerTimesTitle'>Prayer Times in {city}, {province}</h1>
                <div className='dates'>
                    <h2 className='date'>{gregorianDate} {gregorianMonth}, {gregorianYear}</h2>
                    <h2 className='date'>{hijriDate} {hijriMonth}, {hijriYear}</h2>
                </div>
                <div className='timings'>
                    <Card className='time'>
                        {prayer((prayerIndex) % 5)}
                        <h2 className='prayerTime2'>{timeDifference}</h2>
                    </Card>
                    <Card className='time'>
                        {prayer((prayerIndex + 1) % 5)}
                    </Card>
                    <Card className='time'>
                        {prayer((prayerIndex + 2) % 5)}
                    </Card>
                    <Card className='time'>
                        {prayer((prayerIndex + 3) % 5)}
                    </Card>
                    <Card className='time'>
                        {prayer((prayerIndex + 4) % 5)}
                    </Card>
                </div>
            </Paper>
        </div>
    )
}

export default Prayertimes;