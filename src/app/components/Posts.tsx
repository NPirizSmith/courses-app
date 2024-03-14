import AddFavButton from './AddFavButton';
import DeletePostButton from './DeletePostButton';
import EditPost from './EditPost';

export default function Posts({ id, title, content, authorName, url, technologies, isFavorite, userId }) {
    console.log(technologies)
    console.log(title)
    return (
        <div>
            <h2>{authorName}</h2>
            <h1>{title}</h1>
            <h4>{content}</h4>
            <h2>{url}</h2>
            <div>
                <h2>Tecnologías:</h2>
                <ul>
                    {technologies?.map((tech, index) => (
                        <li key={index}>{tech.name}</li>
                    ))}
                </ul>
            </div>
            <DeletePostButton postId={id} />
            <AddFavButton postId={id} isFavorite={isFavorite} userId={userId} />
        </div>
    );
}
