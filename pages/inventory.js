import { Container } from "@material-ui/core";
import Link from 'next/link'

function Inventory(props) {
    return (
        <Container>
            <div>
                Welcome to AlamutHQ <br />
                {console.log(props)}
                <Link href='/'>
                    <a> HomePage </a>
                </Link>
            </div>
        </Container>
    )
}

export default Inventory
