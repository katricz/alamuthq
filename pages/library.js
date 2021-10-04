

export const getStaticProps = async () => {
    const res = await fetch('https://static.krcg.org/data/vtes.json');
    const krcg = await res.json();

    return {
        props: { library: krcg }
    }
}

function Library({ library }) {
    return (

        <div>
            <h1>All Libray Cards</h1>
            {library.map(libraryCard => (
                <div key={libraryCard.id}>
                    <a>
                        <h6> {libraryCard._name}</h6>
                    </a>
                </div>
            ))}
        </div>
    )
}



export default Library

