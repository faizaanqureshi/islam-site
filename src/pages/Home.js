import '../App.css';
import Navbar from '../components/Navbar';
import Prayertimes from '../components/Prayertimes';
import Randomverse from'../components/Randomverse';

function Home() {
  return (
    <div className='Home'>
      <Navbar />
      <Prayertimes />
      <Randomverse />
    </div>
  );
}


export default Home;
