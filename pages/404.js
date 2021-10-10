import Link from 'next/link'

const NotFound = () => {
    return (
        <div className='not-found'>
            <h1>I can't belive your try this page!</h1>
            <h2>Better try other, this page doesn't exist </h2>
            <p>Go Back to the best Main Page Ever <Link href="/"><a>AlamutHQ</a></Link></p>
        </div>
    )
}

export default NotFound;