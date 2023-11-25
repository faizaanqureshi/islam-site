import '../App.css';
import Navbar from '../components/Navbar';
import Prayertimes from '../components/Prayertimes';
import Randomverse from '../components/Randomverse';
import Islamchatbot from '../components/Islamchatbot';

function Home() {
  return (
    <div className='Home'>
      <Navbar />
      <Prayertimes />
      <Islamchatbot />
      <Randomverse />
    </div>
  );
}


export default Home;
