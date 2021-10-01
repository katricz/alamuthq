import { Container } from "@material-ui/core";
import Link from 'next/link'

function Decks() {
    return (
        <Container>
            <div>
                Welcome to AlamutHQ <br />
                <Link href='/'>
                    <a> HomePage </a>
                </Link>
            </div>
        </Container>
    )
}

export default Decks