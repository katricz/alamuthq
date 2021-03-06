import Link from 'next/link'
import Image from 'next/image'

// Icones do awesomefont
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);




export default function Home() {
  return (


    <div className="container px-4 py-5" id="featured-3" >

      <h2 className="pb-2 border-bottom">
        <Image src="/img/AlamutHQ_Logo.png" alt="AlamutHQ Logo" width={192} height={150}
        />  Welcome to Alamut Headquarters
      </h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div className="feature col">
          <div className="feature-icon bg-secondary bg-gradient">
            <svg className="bi" width="1em" height="1em"></svg>
          </div>
          <h2>  <FontAwesomeIcon icon='journal-whills' />  Decks</h2>
          <p>Bleed, Vote, Wall, Rush, Combat, What will be?</p>
          <Link href="/decks">
            <a className="icon-link">
              Go to my Decks
              <svg className="bi" width="1em" height="1em"></svg>
            </a>
          </Link>
        </div>
        <div className="feature col">
          <div className="feature-icon bg-secondary bg-gradient">
            <svg className="bi" width="1em" height="1em"></svg>
          </div>
          <h2> <FontAwesomeIcon icon='user-ninja' />  Crypt</h2>
          <p>All vampires are here, the best, the worst and all other between. Almost forgot, Imbuied are here too.</p>
          <Link href="/crypt" >
            <a className="icon-link">
              I want to see the evil one
              <svg className="bi" width="1em" height="1em"></svg>
            </a>
          </Link>
        </div>
        <div className="feature col">
          <div className="feature-icon bg-secondary bg-gradient">
            <svg className="bi" width="1em" height="1em"></svg>
          </div>
          <h2><FontAwesomeIcon icon='jedi' />  Library</h2>
          <p>Phenomenal Cosmic Powers at your hand</p>
          <Link href="/library">
            <a className="icon-link">
              Search for it
              <svg className="bi" width="1em" height="1em"></svg>
            </a>
          </Link>
        </div>
        <div className="feature col">
          <div className="feature-icon bg-secondary bg-gradient">
            <svg className="bi" width="1em" height="1em"></svg>
          </div>
          <h2><FontAwesomeIcon icon='warehouse' />  Inventory</h2>
          <p>All my cards, my precious, its all mine, MINE! And what ever I need</p>
          <Link href="/inventory">
            <a className="icon-link">
              Catalog it!
              <svg className="bi" width="1em" height="1em"></svg>
            </a>
          </Link>
        </div>
        <div className="feature col">
          <div className="feature-icon bg-secondary bg-gradient">
            <svg className="bi" width="1em" height="1em"></svg>
          </div>
          <h2><FontAwesomeIcon icon='question' />  About</h2>
          <p>I know, I need to make this Page...... </p>
          <Link href="/about">
            <a className="icon-link">
              Power overwhelming
              <svg className="bi" width="1em" height="1em"></svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
