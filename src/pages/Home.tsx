import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { CustomCard } from '../components/Card';
import { Pagination } from '../components/Pagination';
import { getUsers } from '../controllers/githubUsers';
import { useCustomSelector, useCustomDispatch } from '../hooks/redux';

export const Home = () => {
    const { users } = useCustomSelector((state) => state.users);
    const dispatch = useCustomDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        dispatch(getUsers({ since: 0, per_page: 100 }));
    }, [])

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10px',
                flexDirection: 'column'
            }}
        >
            <div style={{
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '10px',
            }}>
                {
                    currentUsers.map((user, index) => (
                        <Link key={index} to={`/single-user/${user.login}`} style={{textDecoration:'none'}}>
                            <CustomCard
                                imgAvatar={user.avatar_url}
                                login={(user.login).toLocaleUpperCase()}
                                id={user.id}
                                followers_url={user.followers_url?.length}
                            />
                        </Link>
                    ))
                }
            </div>
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={users.length}
                paginate={paginate}
            />
        </div>
    )
}
