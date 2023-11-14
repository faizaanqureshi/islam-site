import Navbar from '../components/Navbar';
import { Paper } from '@mui/material';
import Chip from '@mui/material/Chip';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

function About() {
    return (
        <div className='About'>
            <Navbar />
            <Aboutcontent />
        </div>
    );
}

function Aboutcontent() {
    return (
        <div className='quranSelector'>
            <Paper sx={{ display: 'flex', flexFlow: 'column', justifyContent: 'space-between', width: { xs: '90%', md: '75%' }, padding: { xs: '2%', md: '2%', lg: '1%' }, opacity: 0.8 }}>
                <div className='about'>
                    <p className='aboutText'><b>Welcome to The Blessed Path</b> – a sacred haven where spirituality meets innovation, and I am thrilled to guide you on this unique journey. At theblessedpath.faith, we've meticulously crafted a space that seamlessly blends prayer, wisdom, and community for seekers from all walks of life.</p>
                    <p className='aboutText'><b>🌟 Every Sacred Moment</b>: Prayer Times for You: Join me in immersing ourselves in the tranquility of daily prayer. Whether it's the break of dawn or the quiet of dusk, together, we can ensure that no sacred moment of connection is missed.</p>
                    <p className='aboutText'><b>📖 Divine Wisdom in Every Language</b>: Delve into the profound teachings of the Quran and Hadith, presented in a multitude of languages and scripts. The Blessed Path transcends linguistic barriers, making the wisdom of our faith accessible to a global audience.</p>
                    <p className='aboutText'><b>🚀 Crafted with Heart and Technology</b>: I've developed this platform with a combination of React, MUI, and Flask, fusing modern technology with timeless spirituality.</p>
                    <p className='aboutText'><b>☁️ Reliable and Seamless Experience</b>: Hosting on the powerful synergy of AWS Lambda and Vercel, I've ensured that your experience on The Blessed Path is seamless and reliable. Embark on this journey without disruptions, embracing the divine at every step.</p>
                    <p className='aboutText'><b>🎨 Aesthetic Brilliance by Me, Faizaan Qureshi</b>: I am Faizaan Qureshi, a software engineer and Computer Science student at the University of Waterloo, weaving a unique blend of technical prowess and artistic sensibility into The Blessed Path's design.</p>
                    <p className='aboutText'><b>🌐 Connect with Me</b>: If The Blessed Path resonates with your spirit, consider joining our community on social media. Follow my journey, and let's stay connected for updates, reflections, and shared moments of inspiration.</p>
                    <Chip sx={{fontWeight:1000}} icon={<LinkedInIcon />} label="LinkedIn" component="a" href="https://www.linkedin.com/in/faizaan-qureshi/" clickable />
                    <Chip sx={{fontWeight:1000, marginLeft:'2%'}} icon={<GitHubIcon />} label="GitHub" component="a" href="https://github.com/faizaanqureshi" clickable />
                    <Chip sx={{fontWeight:1000, marginLeft:'2%'}} icon={<InstagramIcon />} label="Instagram" component="a" href="https://www.instagram.com/faizaanqureshi_/" clickable />
                </div>
            </Paper>
        </div>
    );
}

export default About;