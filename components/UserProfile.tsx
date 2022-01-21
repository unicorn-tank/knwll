import { UserContext } from "../lib/context";
import Cluster from '../layout/Cluster';

export default function UserProfile({ user }) {
    return (
        <Cluster justifyContent='flex-start' isBorder={false}>
            <img src={user?.photoURL} className="card-img-center" />
            <p>
                <i>@{user.username}</i>
            </p>
            <h1>{user.displayName}</h1>

        </Cluster>
    )
}