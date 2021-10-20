import { Router } from 'next/dist/client/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

export default function Navbar() {
    const { user, username } = useContext(UserContext);

    const router = useRouter();

    const signOut = () => {
        auth.signOut();
        router.reload();
    }

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href="/">
                        <div className="brand-strap"><button className="btn-logo">KNWLL</button><span>Know all, know well.</span></div>
                    </Link>
                </li>
                {
                    username && (
                        <>
       
                            <li className="push-left">
                                <Link href="/admin">
                                    <button className="btn-blue">Post Question</button>
                                </Link>
                            </li>
                            <li>
                           
                                    <button onClick={signOut}>Sign Out</button>
                          
                            </li>
                            <li>
                                <Link href={`/${username}`}>
                                    <img src={user?.photoURL || '/hacker.png'} />
                                </Link>
                            </li>
                        </>
                    )
                }

                {
                    !username && (
                        <li>
                            <Link href="/enter">
                                <button className="btn-blue">Log in</button>
                            </Link>
                        </li>
                    )

                }
            </ul>
        </nav>
    )
}