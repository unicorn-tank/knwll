import { Router } from 'next/dist/client/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';
import styled, { ThemeProvider } from 'styled-components';
import { globalViewPortMargin } from '../styles/globalStyles';

import Logo from './Logo';
import Cluster from '../layout/Cluster';

const DiagonalLinesBG = styled.div`
    background-image: linear-gradient(131deg, #ffffff 44.44%, #e6e6e6 44.44%, #e6e6e6 50%, #ffffff 50%, #ffffff 94.44%, #e6e6e6 94.44%, #e6e6e6 100%);
    background-size: 11.93px 13.72px;
`;

const NavBar = styled(DiagonalLinesBG)`
    margin: ${props => `-${props.edges}px`} ${props => `-${props.edges}px`} 0 ${props => `-${props.edges}px`};
    padding: ${props => `${props.edges}px`};

`

export default function Navbar() {
    const { user, username } = useContext(UserContext);

    const router = useRouter();

    const signOut = () => {
        auth.signOut();
        router.reload();
    }
    return (

            <NavBar edges={globalViewPortMargin}>
                <Cluster justifyContent='space-between' isBorder={false}>


                    <Logo />


                    <Cluster isBorder={false}>
                        {
                            username && (
                                <Cluster isBorder={false}>

                                    <Link href="/admin">
                                        <a>Post Question</a>
                                    </Link>


                                    <div onClick={signOut}>Sign Out</div>


                                    <Link href={`/${username}`}>
                                        <a>

                                            <img src={user?.photoURL || '/hacker.png'} height='50' width='50' />

                                        </a>

                                    </Link>

                                </Cluster>
                            )
                        }

                        {
                            !username && (

                                <Link href="/login">
                                    <a>Log in</a>
                                </Link>

                            )

                        }
                    </Cluster>

                </Cluster>
            </NavBar>
    )
}