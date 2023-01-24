import { NavLink } from 'react-router-dom';

interface PropsPagination {
    postsPerPage: number;
    totalPosts: number;
    paginate: any
}

export const Pagination = ({ postsPerPage, totalPosts, paginate }: PropsPagination) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'row',
            }}>
                {pageNumbers.map(number => (
                    <li
                        key={number}
                        style={{
                            display: 'flex',
                            margin: '10px',
                            padding: '5px',
                            border: 'none',
                            borderRadius: '100%',
                            width: '20px',
                            height: '20px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor:'#29292f',
                            
                        }}>
                        <NavLink
                            onClick={() => paginate(number)}
                            to={'/'}
                            /* style={
                                ({isActive})=>{return {backgroundColor: isActive ? 'blue' : 'green'}}
                            } */
                            style={{textDecoration:'none', color: 'white'}}
                        >
                            <strong>{number}</strong>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};


