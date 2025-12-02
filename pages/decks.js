import Container from '@mui/material/Container';
import Link from 'next/link'

function Decks() {
    return (
        <Container>
            <div>
                Welcome to AlamutHQ <br />
                <Link href='/'>HomePage</Link>
            </div>
        </Container>
    )
}

export default Decks