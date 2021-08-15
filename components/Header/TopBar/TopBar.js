import { Container, Grid, Image, Input } from 'semantic-ui-react';
import Link from 'next/link';

const TopBar = () => {
    return (
        <div className="top-bar">
            <Container>
                <Grid className="top-bar">
                    <Grid.Column width={8} className="top-bar__left">
                        <Logo/>
                    </Grid.Column>
                    <Grid.Column width={8} className="top-bar__right">
                        <Search/>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}

export default TopBar

const Logo = () => (<Link href="/"><a><Image src="/logo.png" alt="Logo"/></a></Link>)


const Search = () => {
    return (
        <Input id="search-item" icon={{name:"search"}}/>
    )
}
